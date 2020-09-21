<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetBookingsRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Segment;
use App\Models\Option;
use App\Models\Flight\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

/**
 * Class BookingController
 * @package App\Http\Controllers
 */
class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param GetBookingsRequest $request
     * @return AnonymousResourceCollection
     */
    public function index(GetBookingsRequest $request)
    {
        $bookings = Booking::join('users', 'users.id', '=', 'bookings.user_id')
            ->when($request->user() instanceof User, function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->when($request->get('user_id'), function ($query, $userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy($request->get('orderProp', 'created_at'), $request->get('order', 'asc'))
            ->select('bookings.*')
            ->paginate($request->get('perPage'));

        return BookingResource::collection($bookings);
    }

    /**
     * Show the form for creating a new resource.
     * @param Request $request
     * @return BookingResource
     * @throws \Throwable
     */
    public function save(Request $request)
    {
        $booking = Booking::create([
            'service_id'    => 1, // @todo really hard coded !
            'user_id'       => Auth::id(),
        ]);
        foreach ($request->get('segments') as $segment) {
            $new_segment = Segment::create([
                'from'     => $segment['from']['id'],
                'to'       => $segment['to']['id'],
                'date'     => date('Y-m-d H:i:s', (int) strtotime($segment['date'])),
            ]);
            $booking->segments()->save($new_segment);
        }
        foreach ($request->get('options') as $option) {
            $new_option = Option::find($option['id']);
            $booking->options()->save($new_option);
        }
        foreach ($request->get('categories') as $category) {
            $new_category = Category::find($category['id']);
            $booking->flightCategories()->save($new_category);
        }
        return new BookingResource($booking);
    }

    /**
     * Display the specified resource.
     *
     * @param Booking $booking
     * @return BookingResource
     */
    public function get(Booking $booking, Request $request)
    {
        if ($request->user() instanceof User && $booking->user_id !== Auth::id()) {
            throw new UnauthorizedHttpException('Session');
        }

        return new BookingResource($booking);
    }

    /**
     * Delete the specified resource.
     *
     * @param Booking $booking
     * @throws \Exception
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();
    }
}
