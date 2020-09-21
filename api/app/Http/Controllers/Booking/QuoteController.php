<?php

namespace App\Http\Controllers\Booking;

use App\Enum\BookingStatus;
use App\Enum\QuoteStatus;
use App\Http\Requests\QuoteAddOptionRequest;
use App\Http\Requests\QuoteAddSegmentRequest;
use App\Http\Requests\AddQuoteToBookingRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Aircraft;
use App\Models\Booking;
use App\Models\Quote;
use App\Models\Quote\Option as QuoteOption;
use App\Models\Segment;
use App\Models\Asset;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;
use Stripe\Checkout\Session;
use Stripe\Stripe;

/**
 * Class Quote
 * @package App\Http\Controllers\Booking
 */
class QuoteController extends Controller
{
    /**
     * @param Booking $booking
     * @param Request $request
     * @return QuoteResource
     */
    public function add(Booking $booking, Request $request)
    {
        $quote = new Quote([
            'amount'        => $request->get('amount') ?: 0,
            'currency'      => $request->get('currency') ?: 'EUR',
            'status'        => $request->get('status') ?: QuoteStatus::draft(),
        ]);
        $booking->quotes()->save($quote);
        $booking->touch();

        return new QuoteResource($quote);
    }

    /**
     * @param Booking $booking
     * @param Quote $quote
     * @param AddQuoteToBookingRequest $request
     * @return QuoteResource
     * @todo refactor with only a save method instead of add and update
     */
    public function update(Booking $booking, Quote $quote, AddQuoteToBookingRequest $request)
    {
        $quote->fill([
            'amount'        => $request->get('amount') ?: 0,
            'currency'      => $request->get('currency') ?: 'EUR',
            'status'        => $request->get('status') ?: QuoteStatus::sent(),
        ]);
        $quote->save();

        // Update booking state if Quote is sent
        $booking->setStatus(BookingStatus::quoted());

        $file_assets = $request->assets ?? null;
        if ($file_assets) {
            if (count($quote->assets)) {
                $quote->assets()->detach();
                $this->removeAssetFile($quote->assets[0]->id);
            }
            $quote->save();
            $path = $file_assets->store(Asset::QUOTE_CONTRACT_FOLDER);
            $filename = $file_assets->getClientOriginalName();
            $quote->assets()->save(new Asset([
                'path'      => $path,
                'filename'  => $filename,
            ]));
            $quote->save();
        }
        $booking->touch();
        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @return JsonResponse
     * @throws Exception
     */
    public function remove(Quote $quote)
    {
        $quote->delete();

        return response()->json([], 204);
    }

    /**
     * @param Quote $quote
     * @param QuoteAddSegmentRequest $request
     * @return QuoteResource
     */
    public function addSegment(Quote $quote, QuoteAddSegmentRequest $request)
    {
        $quote->segments()->save(Segment::create([
            'from'  => $request->get('from'),
            'to'    => $request->get('to'),
            'date'  => $request->get('date'),
        ]));

        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @param Segment $segment
     * @param QuoteAddSegmentRequest $request
     * @return QuoteResource
     * @todo check if $segment exists in $quote->segments
     */
    public function updateSegment(Quote $quote, Segment $segment, QuoteAddSegmentRequest $request)
    {
        $segment->fill([
            'from'  => $request->get('from'),
            'to'    => $request->get('to'),
            'date'  => $request->get('date'),
        ]);
        $segment->save();
        $quote->touch();

        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @param Segment $segment
     * @return JsonResponse
     * @throws Exception
     * @todo check if $segment exists in $quote->segments
     */
    public function removeSegment(Quote $quote, Segment $segment)
    {
        $quote->segments()->detach($segment->getKey());
        $segment->delete();

        return response()->json([], 204);
    }

    /**
     * @param Quote $quote
     * @param QuoteAddOptionRequest $request
     * @return QuoteResource
     */
    public function addOption(Quote $quote, QuoteAddOptionRequest $request)
    {
        $quote->options()->create([
            'name'          => $request->get('name'),
            'description'   => $request->get('description'),
        ]);

        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @param QuoteOption $option
     * @param QuoteAddOptionRequest $request
     * @return QuoteResource
     * @todo check if $option exists in $quote->segments
     */
    public function updateOption(Quote $quote, QuoteOption $option, QuoteAddOptionRequest $request)
    {
        $option->fill([
            'name'          => $request->get('name'),
            'description'   => $request->get('description'),
        ]);
        $option->save();
        $quote->touch();

        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @param QuoteOption $option
     * @return JsonResponse
     * @throws Exception
     * @todo check if $segment exists in $quote->segments
     */
    public function removeOption(Quote $quote, QuoteOption $option)
    {
        $option->delete();

        return response()->json([], 204);
    }

    /**
     * @param Quote $quote
     * @param Aircraft $aircraft
     * @return QuoteResource
     */
    public function addAircraft(Quote $quote, Aircraft $aircraft)
    {
        $quote->aircrafts()->attach($aircraft->getKey());

        return new QuoteResource($quote);
    }

    /**
     * @param Quote $quote
     * @param Aircraft $aircraft
     * @return QuoteResource
     */
    public function removeAircraft(Quote $quote, Aircraft $aircraft)
    {
        $quote->aircrafts()->detach($aircraft->getKey());

        return new QuoteResource($quote);
    }

    /**
     * @return array
     */
    public function getStatuses()
    {
        return QuoteStatus::toArray();
    }

    /**
     * @param int $item
     */
    public function removeAssetFile($item)
    {
        $asset = Asset::findOrFail($item);
        if (Storage::disk()->exists($asset['path'])) {
            Storage::disk()->delete($asset['path']);
        }
        $asset->delete();
    }

    public function accept(Quote $quote)
    {
        return DB::transaction(function ($query) use ($quote) {
            // Get connected user
            $user = \Auth::user();
            // Accept the quote
            $quote->status = QuoteStatus::accepted();
            $quote->save();

            // YouSign Client
            $client = new Client([
                'base_uri'  => Config('services.yousign.api')
            ]);

            // Upload file into yousign
            $file = $quote->assets[0];
            $raw = array(
                'name' => $file->filename,
                'content' => base64_encode($file->getContent()),
            );

            $response = $client->request('POST', '/files', [
                'headers'   => [
                    'Authorization'         => 'Bearer ' . Config('services.yousign.api_key'),
                    'Content-Type'          => 'application/json',
                ],
                'body'      => \GuzzleHttp\json_encode($raw)
            ]);
            $data = \GuzzleHttp\json_decode($response->getBody()->getContents());

            // Create the procedure
            $raw = [
                'name'          => 'Acceptation devis Club Airways',
                'description'   => 'Dossier '.$quote->booking_id,
                'members'       => [
                    [
                        'firstname'     => $user->firstname,
                        'lastname'      => $user->lastname,
                        'email'         => $user->email,
                        'phone'         => $user->phone,
                        'fileObjects'   => [
                            [
                                'file'      => $data->id,
                                'page'      => 1,
                                'mention'   => 'lu et approuvé',
                            ]
                        ]
                    ]
                ],
                'config'    => [
                    'webhook'   => [
                        'procedure.finished'   => [
                            [
                                'url'       => env('APP_URL') . '/webhook/you-sign-webhook',
                                'method'    => 'GET',
                                'headers'   => [
                                    'Content-Type'  => 'application/json',
                                    'Accept'        => 'application/json',
                                ]
                            ]
                        ]
                    ]
                ]
            ];

            $response = $client->request('POST', '/procedures', [
                'headers'   => [
                    'Authorization'         => 'Bearer ' . Config('services.yousign.api_key'),
                    'Content-Type'          => 'application/json',
                ],
                'body'      => \GuzzleHttp\json_encode($raw)
            ]);
            $data = \GuzzleHttp\json_decode($response->getBody()->getContents());

            $data->iframe_link = Config('services.yousign.app') . '/procedure/sign?members=' .
                $data->members[0]->id.'&signatureUi=' . Config('services.yousign.signature_ui');

            return response()->json($data);
        });
    }


    public function payment(Quote $quote, Request $request)
    {
        Stripe::setApiKey('sk_test_v7JgPURuuodeEHrTlnaE63p800XmZFKpAh');

        $session = Session::create([
            'customer_email' => Auth::user()->email,
            'payment_method_types'  => ['card'],
            'client_reference_id'   => Auth::id().'_'.$quote->id.'_' .time(),
            'line_items'    => [[
                'name'          => 'Club Airways',
                'description'   => 'Quote for Club Airways',
//                'images'        => ['$product->assets[0]->getFullPathAttribute()'],
                'amount'        => intval($quote->amount * 100),
                'currency'      => $quote->currency,
                'quantity'      => 1,
            ]],
            'success_url'   => env('APP_URL').'/payment-accepted',
            'cancel_url'    => env('APP_URL').'/payment-canceled'
        ]);

        return response()->json($session->id);
    }
}
