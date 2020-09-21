<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Http\Requests\NewMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Booking;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
   /**
   * @param Booking $booking
   */
    public function getMessages(Booking $booking)
    {
        $user = Auth::user();
        $messages = $booking->messages()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(10)
            ->get();
        return MessageResource::collection($messages);
    }

    /**
     * @param Booking $booking
     * @param NewMessageRequest $request
     * @return MessageResource
     */
    public function newMessage(
        Booking $booking,
        NewMessageRequest $request
    ) {
        $user = Auth::user();

        $message = Message::create([
            'booking_id'        => $booking->id,
            'author_id'         => $user->id,
            'content'           => strip_tags($request->get('content')),
            'is_admin'          => isset($user->name),
        ]);
        event(new NewMessage($message));
        return new MessageResource($message);
    }
}
