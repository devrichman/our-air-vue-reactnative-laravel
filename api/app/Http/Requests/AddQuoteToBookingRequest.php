<?php

namespace App\Http\Requests;

use App\Models\Quote;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class AddQuoteToBookingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rule_data = [
            'amount'    => ['numeric', 'min:0'],
            'currency'  => ['in:EUR,USD,CHF'],
            'status'    => ['in:draft,sent,refused,accepted'],
            'assets'    => ['file'],
        ];

        if ($this->get('status') && $this->get('status') !== 'draft') {
            array_push($rule_data['amount'], 'required');
            array_push($rule_data['currency'], 'required');
            array_push($rule_data['status'], 'required');
            array_push($rule_data['assets'], 'required');

            $quote = Quote::find($this->quote->id);

            //check we have at least one segment for the quote
            if ($quote->segments()->count() < 1) {
                throw new UnprocessableEntityHttpException(
                    'Veuillez ajouter un segment ou enregistrer en tant que brouillon.'
                );
            }

            //check we have at least one aircraft for the quote
            if ($quote->aircrafts()->count() < 1) {
                throw new UnprocessableEntityHttpException(
                    'Veuillez ajouter un avion ou enregistrer en tant que brouillon.'
                );
            }
        }

        return $rule_data;
    }
}
