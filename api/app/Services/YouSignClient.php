<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Collection;
use Psr\Http\Message\RequestInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class YouSignClient
 *
 * How to use :
 * - Inject  YouSignClient with DI
 *
 * @package App\Services
 */
class YouSignClient
{
    /**
     * @var Client
     */
    private $client;

    /**
     * @var MockHandler
     */
    private $mock;

    /**
     * @var string|null
     */
    private $serviceToken;

    /**
     * @return  YouSignClient
     */
    private function initClient() : self
    {
        // Stack with mock or default
        $handler = HandlerStack::create($this->mock);

        // Add a retry middleware to manage expired token
        $handler->push(Middleware::retry(function (
            $retries,
            RequestInterface $request,
            Response $response = null,
            RequestException $exception = null
        ) {
            if ($response === null) {
                return false;
            }

            if ($retries >= 1) { // Try only one more time
                return false;
            }

            if ($response->getStatusCode() === 401) { // Generate a new token if unauthorized
                return true;
            }

            return false;
        }));

        // Add Authorization header
        $handler->push(Middleware::mapRequest(function (RequestInterface $request) {
            if ($token = $this->getToken()) {
                $request = $request->withHeader('Authorization', 'Bearer '.$token);
            }
            return $request;
        }));

        $this->client = new Client([
            'base_uri'  => config('services.yousign.url'),
            'headers'   => [
                'Content-Type'          => 'application/json',
                'Accept'                => 'application/json'
            ],
            'handler' => $handler,
            'timeout' => 30,
        ]);

        return $this;
    }

    /**
     * @param Request $request
     * @param array $options
     * @return string|Collection
     */
    public function send(Request $request, array $options = [])
    {
        try {
            $response = $this
                ->service()
                ->send($request, $options)
                ->getBody()
                ->getContents();
        } catch (ClientException $exception) {
            $response = $exception->getResponse();
            if (is_null($response)) {
                throw new UnprocessableEntityHttpException('Error without message');
            }

            $response = \GuzzleHttp\json_decode($response->getBody()->getContents());
            throw new UnprocessableEntityHttpException(($response->message ?? null));
        }

        if ($this->isJSON($response)) {
            $data = \GuzzleHttp\json_decode((string)$response ?: '{}');

            if (is_array($data)) {
                return collect($data);
            }

            return collect(empty((array) $data) ? [] : [$data]);
        }
        return $response;
    }

    /**
     * Use this to make call without any customer context
     * @return Client
     * @throws \Exception
     */
    public function service() : Client
    {
        if (null === $this->client) {
            $this->initClient();
        }

        $this->setServiceToken();

        return $this->client;
    }

    /**
     * YouSignClient token
     *
     * @throws \Exception
     */
    private function setServiceToken() : void
    {
        $this->serviceToken = config('services.yousign.api_key');
    }

    /**
     * @param MockHandler $mockHandler
     * @return YouSignClient
     */
    public function mock(MockHandler $mockHandler) : self
    {
        $this->mock = $mockHandler;
        return $this;
    }

    /**
     * @param mixed $mock
     * @return YouSignClient
     */
    public function appendMock($mock) : self
    {
        $this->mock->append($mock);
        return $this;
    }

    /**
     * @return string|null
     */
    private function getToken()
    {
        if (!$this->serviceToken) {
            return null;
        }

        return $this->serviceToken;
    }

    /**
     * @return bool
     */
    protected function isJSON($string)
    {
        return is_string($string) && is_array(json_decode($string, true)) ? true : false;
    }
}
