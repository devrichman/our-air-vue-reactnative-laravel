<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Generate a HTTP 406 error if client do not accept required headers
 *
 * Class AcceptHeader
 * @package App\Http\Middleware
 */
class AcceptHeader
{
    protected $requiredHeaders = ['application/json'];
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->path() === 'signing/success') {
            return $next($request);
        }

        if (!$request->hasHeader('Accept')) {
            abort(406, 'Not Acceptable - You must provide an Accept header');
        }

        if (!is_string($request->header('Accept'))) {
            abort(406, 'Not Acceptable - Accept header must be a string');
        }

        /**
         * @var string
         */
        $acceptHeader = $request->header('Accept');
        if (array_diff($this->requiredHeaders, explode(',', $acceptHeader))) {
            abort(406, 'Not Acceptable - You must accept '.implode(' and ', $this->requiredHeaders));
        }

        return $next($request);
    }
}
