<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Procedure;
use App\Models\Document;
use App\Models\Project;
use App\Services\Users\ContractService;
use Carbon\Carbon;
use App\Enums\ProcedureStatusEnum;
use App\Exceptions\DocumentException;
use App\Services\YouSignClient;
use App\Mail\SendContractDocumentMail;

/**
 * Class YouSignWebhookController
 * @package App\Http\Controllers
 */
class YouSignWebhookController extends Controller
{
    const USER_CONTRACT_DOCUMENTS_FOLDER = 'documents/users';

    /**
     * @var YouSignClient
     */
    protected $youSignClient;

    /**
     * YouSignWebhookController constructor.
     * @param YouSignClient $youSignClient
     */
    public function __construct(YouSignClient $youSignClient)
    {
        $this->youSignClient = $youSignClient;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function handle(Request $request)
    {
        $response = $request->input('procedure');

        if ($response) {
            $params = [
                'procedure_id' => '/procedures/' . $response['id'],
                'name' => $response['name'],
                'description' => $response['description'],
                'created_date' => Carbon::parse($response['createdAt']),
                'updated_date' => Carbon::parse($response['updatedAt']),
                'finished_date' => ($response['finishedAt'] ?? Carbon::now()),
                'expires_date' => $response['expiresAt'],
                'status' => $response['status'],
                'creator' => $response['creator'],
                'creator_firstname' => ($response['creatorFirstName'] ?? null),
                'creator_lastname' => ($response['creatorLastName'] ?? null),
                'workspace' => $response['workspace'],
                'template' => $response['template'],
                'ordered' => $response['ordered'],
                'parent' => $response['parent'],
                'metadata' => $response['metadata'],
                'config' => $response['config'],
                'members' => $response['members'],
                'subscribers' => ($response['subscribers'] ?? []),
                'related_files_enable' => $response['relatedFilesEnable'],
                'archive' => ($response['archive'] ?? null),
                'archive_metadata' => ($response['archiveMetadata'] ?? []),
                'fields' => ($response['fields'] ?? []),
                'permissions' => ($response['permissions'] ?? []),
                'company' => $response['company'],
                'files' => $response['files']
            ];

            // sauvegarder la procédure dans une table procédure
            $procedure = Procedure::updateOrCreate($params);
        } else {
            return response()->json([
                'message' => 'error'
            ], 400);
        }
    }
}
