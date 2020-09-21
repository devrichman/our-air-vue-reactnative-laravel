<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveLocaleLinesRequest;
use App\Http\Resources\LanguageLineResource;
use App\Http\Resources\LocaleResource;
use App\Models\LanguageLine;
use App\Models\Locale;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class LocaleController
 * @package App\Http\Controllers
 */
class LocaleController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function getAll()
    {
        return LocaleResource::collection(Locale::all());
    }

    /**
     * @param Locale $locale
     * @return AnonymousResourceCollection
     */
    public function getLinesByLocale($locale)
    {
        $l = Locale::find($locale);
        if ($l === null) {
            $l = Locale::where('iso', $locale)->first();
        }

        if ($l === null) {
            throw new UnprocessableEntityHttpException();
        }

        return LanguageLineResource::collection(LanguageLine::getTranslations($l->iso));
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getLines()
    {
        return LanguageLineResource::collection(LanguageLine::all());
    }

    /**
     * @param SaveLocaleLinesRequest $request
     * @return AnonymousResourceCollection
     */
    public function saveLines(SaveLocaleLinesRequest $request)
    {
        DB::transaction(function () use ($request) {
            foreach ($request->get('lines') as $line) {
                LanguageLine::findOrFail($line['id'])->update(
                    ['text' => $line['text']]
                );
            };
        });

        return LanguageLineResource::collection(LanguageLine::all());
    }
}
