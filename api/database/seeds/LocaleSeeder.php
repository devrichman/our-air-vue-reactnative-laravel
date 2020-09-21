<?php

use App\Models\Booking;
use App\Models\Locale;
use App\Models\Option;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Seeders that refresh and insert new data
 *
 * Class StaticSeeder
 */
class LocaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Locale::firstOrCreate([
            'iso' => 'fr',
            'language_label' => 'Français',
            'flag' => 'fr',
        ]);
        Locale::firstOrCreate([
            'iso' => 'en',
            'language_label' => 'Anglais',
            'flag' => 'gb',
        ]);

        $lines = [
            'services' => [
                'flight' => [
                    'fr' => 'jet privé',
                    'en' => 'flight',
                ],
                'car' => [
                    'fr' => 'chauffeur',
                    'en' => 'car',
                ],
                'helicopter' => [
                    'fr' => 'hélicoptère',
                    'en' => 'helicopter',
                ],
                'yacht' => [
                    'fr' => 'yacht',
                    'en' => 'yacht',
                ],
                'flight_description' => [
                    'fr' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis tempor massa, vitae bibendum lorem tincidunt et.',
                    'en' => '',
                ],
                'accommodation_description' => [
                    'fr' => 'Integer congue, lacus eget aliquet hendrerit, nunc mi tincidunt purus, nec finibus diam odio porttitor nisi',
                    'en' => '',
                ],
                'car_description' => [
                    'fr' => 'Vestibulum eu maximus mauris. Mauris ultricies sagittis lectus sit amet semper.',
                    'en' => '',
                ],
                'other_description' => [
                    'fr' => 'Maecenas laoreet nulla eu gravida accumsan. Aliquam mattis eros augue, et pharetra ante pretium in. Donec fringilla massa eu lacus sollicitudin cursus. Quisque eu leo sapien. Sed efficitur semper ante. Etiam efficitur finibus turpis, sed elementum tellus cursus in.',
                    'en' => '',
                ],
                'not_implemented' => [
                    'fr' => "Ce service n'est pas encore disponible. Revenez plus tard pour le découvrir !",
                    'en' => 'This service is not available yet. Come back later to use it!',
                ],
            ],
            'user' => [
                'email' => [
                    'fr' => 'Mail',
                    'en' => 'Email',
                ],
                'password' => [
                    'fr' => 'Mot de passe',
                    'en' => 'Password',
                ],
                'email_placeholder' => [
                    'fr' => 'Veuillez entrer votre mail',
                    'en' => 'Enter Email',
                ],
                'password_placeholder' => [
                    'fr' => 'Veuillez entrer votre mot de passe',
                    'en' => 'Enter Passeword',
                ],
                'password_confirmation' => [
                    'fr' => 'Confirmer le mot de passe',
                    'en' => 'Confirm Password',
                ],
                'password_confirmation_placeholder' => [
                    'fr' => 'Veuillez confirmer le mot de passe',
                    'en' => 'Confirm Password',
                ],
                'lastname' => [
                    'fr' => 'Nom',
                    'en' => 'Last Name',
                ],
                'lastname_placeholder' => [
                    'fr' => 'Veuillez confirmer votre nom',
                    'en' => 'Enter last name',
                ],
                'firstname' => [
                    'fr' => 'Prénom',
                    'en' => 'First name',
                ],
                'firstname_placeholder' => [
                    'fr' => 'Veuillez confirmer votre prénom',
                    'en' => 'Enter first name',
                ],
                'gender' => [
                    'fr' => 'Sexe',
                    'en' => 'Sex',
                ],
                'gender_placeholder' => [
                    'fr' => 'Veuillez confirmer votre sexe',
                    'en' => 'Enter sex',
                ],
                'gender_m' => [
                    'fr' => 'Homme',
                    'en' => 'Male',
                ],
                'gender_f' => [
                    'fr' => 'Femme',
                    'en' => 'Female',
                ],
                'phone' => [
                    'fr' => 'Téléphone',
                    'en' => 'Phone Number',
                ],
                'phone_placeholder' => [
                    'fr' => 'Veuillez entrer votre numéro de téléphone',
                    'en' => 'Enter phone number',
                ],
                'forgot_password_email' => [
                    'fr' => 'Mail du compte utilisé',
                    'en' => 'Forgot Password',
                ],
                'send_email_success' => [
                    'fr' => 'Mail envoyé. Veuillez vérifier votre boîte mail pour modifier votre mot de passe',
                    'en' => 'Email sent. Please verify your email',
                ],
                'new_password' => [
                    'fr' => 'Nouveau mot de passe',
                    'en' => 'New Password',
                ],
                'new_password_confirmation' => [
                    'fr' => 'Confirmer le nouveau mot de passe',
                    'en' => 'New Password Confirmation',
                ],
                'informations' => [
                    'fr' => 'Mon Compte',
                    'en' => 'My Account',
                ],
                'update_password' => [
                    'fr' => 'Mettre à jour mon mot de passe',
                    'en' => 'Update my password',
                ],
                'not_update_password' => [
                    'fr' => 'Ne pas mettre à jour mon mot de passe',
                    'en' => 'Do not update my password',
                ],

            ],
            'booking' => [
                'options' => [
                    'fr' => "Options",
                    'en' => 'Options',
                ],
                'jet_title' => [
                    'fr' => 'Mon Vol',
                    'en' => 'My Flight',
                ],
                'jet_description' => [
                    'fr' => 'Lorem ipsum dolor sit amet qui tempore quas natus ',
                    'en' => 'Jet Description',
                ],
                'jet_oneWay' => [
                    'fr' => 'Ajouter Vol Retour',
                    'en' => 'One way',
                ],
                'jet_roundTrip' => [
                    'fr' => 'Ajouter Vol Retour',
                    'en' => 'Round Trip',
                ],
                'destination_title' => [
                    'fr' => 'Aller',
                    'en' => 'First Leg',
                ],
                'from' => [
                    'fr' => 'De',
                    'en' => 'From',
                ],
                'to' => [
                    'fr' => 'A',
                    'en' => 'To',
                ],
                'departure' => [
                    'fr' => 'Départ',
                    'en' => 'Departure',
                ],
                'arrival' => [
                    'fr' => 'Arrivée',
                    'en' => 'Arrival',
                ],
                'date_title' => [
                    'fr' => 'Date d\'arrivée souhaitée',
                    'en' => 'Date Title',
                ],
                'arrivalDate' => [
                    'fr' => 'Date de départ',
                    'en' => 'Arrival Date',
                ],
                'arrivalHour' => [
                    'fr' => 'Heure souhaitée',
                    'en' => 'Arrival Hour',
                ],
                'chooseDate' => [
                    'fr' => 'Choisir une date',
                    'en' => 'Choose Date',
                ],
                'chooseTime' => [
                    'fr' => 'Choisir une heure',
                    'en' => 'Choose Time',
                ],
                'number_traveler' => [
                    'fr' => 'Nombre de voyageurs',
                    'en' => 'Traveler Number',
                ],
                'seatsNumber' => [
                    'fr' => 'places',
                    'en' => 'Seat Number',
                ],
                'speedUnit' => [
                    'fr' => 'km/h',
                    'en' => 'Speed Unit',
                ],
                'startingPrice' => [
                    'fr' => 'A partir de : ',
                    'en' => 'Starting Price',
                ],
                'confirmation' => [
                    'fr' => 'Reservation reussie',
                    'en' => 'Confirmation',
                 ],
                'status_pending' => [
                    'fr' => 'En attente de traitement',
                    'en' => 'Pending',
                ],
                'status_quoted' => [
                    'fr' => 'Cotation envoyée',
                    'en' => 'Quoted',
                ],
                'status_paid' => [
                    'fr' => 'Payé',
                    'en' => 'Paid',
                ],
                'details' => [
                    'fr' => 'Détails',
                    'en' => 'Details',
                ],
                'quote' => [
                    'fr' => 'Proposition',
                    'en' => 'Quote',
                ],
                'quotes' => [
                    'fr' => 'Propositions',
                    'en' => 'Quotes',
                ],
                'request' => [
                    'fr' => 'Ma Demande',
                    'en' => 'My Request',
                ],
                'summary' => [
                    'fr' => 'Résumé',
                    'en' => 'Summary',
                ],
                'aircraft' => [
                    'fr' => 'Appareil',
                    'en' => 'Aircraft',
                ],
                'aircrafts' => [
                    'fr' => 'Appareils',
                    'en' => 'Aircrafts',
                ],
                'airports' => [
                    'fr' => 'Aéroports',
                    'en' => 'Airports',
                ],
                'find_airport' => [
                    'fr' => 'Chercher un aéroport...',
                    'en' => 'Find an airport...',
                ],
                'categories' => [
                    'fr' => 'Catégories',
                    'en' => 'Categories',
                ],
                'booking_list' => [
                    'fr' => 'Liste de réservation',
                    'en' => 'Booking list',
                ],
                'no_bookings' => [
                    'fr' => 'Aucune réservation',
                    'en' => 'No bookings'
                ],
                'your_flight' => [
                    'fr' => 'Votre vol',
                    'en' => 'Your flight',
                ],
                'your_flight_length' => [
                    'fr' => 'Trajet de xxx km',
                    'en' => 'About xxx km',
                ],
                'your_flight_time' => [
                    'fr' => 'Environ xxx h de vol',
                    'en' => 'About xxx h flight',
                ],
                'your_flight_price' => [
                    'fr' => 'À partir de xxx EUR',
                    'en' => 'From xxx EUR',
                ],
                'confirmation_text' => [
                    'fr'    => 'Votre ambassadeur Club Airways recherche votre avion. Donnez lui quelques minutes !',
                    'en'    => 'Your demand is checked by our services !',
                ],
                'show_contract' => [
                    'fr' => 'Voir le Contrat',
                    'en' => 'Show Contract',
                ],
                'accept' => [
                    'fr' => 'Accepter',
                    'en' => 'Accept',
                ],
                'chat' => [
                    'fr' => 'Chat',
                    'en' => 'Chat',
                ],
            ],
            'action' => [
                'back' => [
                    'fr' => 'Retour',
                    'en' => 'Back',
                ],
                'login' => [
                    'fr' => 'Se connecter',
                    'en' => 'Login',
                ],
                'register' => [
                    'fr' => 'S\'enregister',
                    'en' => 'Register',
                ],
                'forgot' => [
                    'fr' => 'Mot de passe oublié ?',
                    'en' => 'forgot',
                ],
                'already' => [
                    'fr' => 'Déjà enregistré ?',
                    'en' => 'already',
                ],
                'send_email' => [
                    'fr' => 'Envoyez-moi un mail',
                    'en' => 'Send Email',
                ],
                'change_password' => [
                    'fr' => 'Changer de mot de passe',
                    'en' => 'Change Password',
                ],
                'next' => [
                    'fr' => 'Etape Suivante',
                    'en' => 'Next Step',
                ],
                'previous' => [
                    'fr' => 'Précédent',
                    'en' => 'Previous',
                ],
                'save' => [
                    'fr' => 'Enregistrer',
                    'en' => 'Save',
                ],
                'confirm' => [
                    'fr' => 'Confirmer',
                    'en' => 'Confirm',
                ],
                'update_account' => [
                    'fr' => 'Mettre à jour',
                    'en' => 'Update',
                ],
            ],
            'drawer' => [
                'login' => [
                    'fr' => 'Se connecter',
                    'en' => 'Login',
                ],
                'account' => [
                    'fr' => 'Mon compte',
                    'en' => 'My account',
                ],
                'request' => [
                    'fr' => 'Mes demandes',
                    'en' => 'My request',
                ],
                'callus' => [
                    'fr' => 'Nous appeler',
                    'en' => 'Call us',
                ],
                'emailus' => [
                    'fr' => 'Nous envoyer un email',
                    'en' => 'Send us an email',
                ],
                'language' => [
                    'fr' => 'Changer de langue',
                    'en' => 'Change language',
                ],
                'cgu_cgv' => [
                    'fr' => 'CGU / CGV',
                    'en' => 'CGU / CGV',
                ],
                'language' => [
                    'fr' => 'Changer de langue',
                    'en' => 'Change language',
                ],
                'logout' => [
                    'fr' => 'Déconnexion',
                    'en' => 'Logout',
                ],
            ],
            'tab' => [
                'home' => [
                    'fr' => 'Accueil',
                    'en' => 'Home',
                ],
                'ambassador' => [
                    'fr' => 'Ambassadrices',
                    'en' => 'Ambassador',
                ],
                'orders' => [
                    'fr' => 'Commandes',
                    'en' => 'Orders',
                ],
                'menu' => [
                    'fr' => 'Menu',
                    'en' => 'Menu',
                ],
            ],
            'ambassador' => [
                'title' => [
                    'fr' => 'Vos Ambassadrices',
                    'en' => 'Your Ambassadors',
                ],
                'action_title' => [
                    'fr' => 'A votre écoute',
                    'en' => 'At your listening',
                ],
                'phone' => [
                    'fr' => 'Par téléphone',
                    'en' => 'By Telephone',
                ],
                'email' => [
                    'fr' => 'Par Email',
                    'en' => 'By Email',
                ],
                'one' => [
                    'fr' => 'Nawel Laroui',
                    'en' => 'Nawel Laroui',
                ],
                'two' => [
                    'fr' => 'Virginy Ferragut',
                    'en' => 'Virginy Ferragut',
                ],
                'three' => [
                    'fr' => 'Jane Doe',
                    'en' => 'Jane Doe',
                ],
            ],
            'chat' => [
                'placeholder' => [
                    'fr' => 'Votre message',
                    'en' => 'Your message',
                ]
            ]
        ];

        foreach ($lines as $groupName => $group) {
            foreach ($group as $key => $line) {
                \App\Models\LanguageLine::firstOrCreate([
                    'group' => $groupName,
                    'key' => $key,
                    'text' => $line,
                ]);
            }
        }
    }
}
