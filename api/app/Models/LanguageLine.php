<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;

/**
 * Class LanguageLine
 * @package App\Models
 */
class LanguageLine extends \Spatie\TranslationLoader\LanguageLine
{
    /**
     * @param string $locale
     * @param string $group
     * @return array
     */
    public static function getTranslations(string $locale, string $group = null)
    {
        return static::query()
            ->when($group, function ($query, $group) {
                return $query->where('group', $group);
            })
            ->get()
            ->each(function ($value, $key) use ($locale) {
                $value->translation = $value->getTranslation($locale);
            }) ?? [];
    }
}
