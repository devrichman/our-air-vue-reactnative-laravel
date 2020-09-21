<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as NotificationResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPassword extends NotificationResetPassword
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action(
                'Notification Action',
                url(
                    'clubairways://drawer/tab/reset/password/' . $this->token
                    . '/' . $notifiable->getEmailForPasswordReset()
                )
            )
            ->line('token = ' . $this->token)
            ->line('email = ' . $notifiable->getEmailForPasswordReset())
            ->line('If you did not request a password reset, no further action is required.')
            ->line('Thank you for using our application!');
    }
}
