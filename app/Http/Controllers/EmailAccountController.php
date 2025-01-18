<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailCreateRequest;
use Illuminate\Http\Request;
use App\Models\EmailAccount;
use Webklex\IMAP\Facades\Client;
use Exception;
use Inertia\Inertia;
use Inertia\Response;

class EmailAccountController extends Controller
{

    public function edit(Request $request): Response
    {
        $emailAccounts = EmailAccount::where('user_id', $request->user()->id)->get();
        return Inertia::render('XXX', [
            'emailAccounts' => $emailAccounts,
            'status' => session('status'),
        ]);
    }
    public function store(EmailCreateRequest $emailCreateRequest)
    {
        $validated = $emailCreateRequest->validated();

        $emailAccount = EmailAccount::create([
            'user_id' => $emailCreateRequest->user()->id,
            'email' => $validated['email'],
            'password' => encrypt($validated['password']),
            'imap_host' => $validated['imap_host'],
            'imap_port' => $validated['imap_port'],
            'encryption' => $validated['encryption'] ?? 'ssl',
        ]);

        return response()->json($emailAccount, 201);
    }

    public function getAllFolders(Request $request)
    {
        $emailAccounts = EmailAccount::where('user_id', $request->user()->id)->get();
        $allFolders = [];

        foreach($emailAccounts as $emailAccount){
            try{
                $client = Client::make([
                    'host' => $emailAccount->imap_host,
                    'port' => $emailAccount->imap_port,
                    'encryption' => $emailAccount->encryption,
                    'validate_cert' => true,
                    'username' => $emailAccount->email,
                    'password' => decrypt($emailAccount->password),
                    'protocol' => 'imap',
                ]);

                $client->connect();
                $folders = $client->getFolders($hierarchical = true);

                foreach($folders as $folder){
                    $messages = $folder->messages()->all()->limit(1, 0)->get();
                    $allFolders[$emailAccount->email][$folder->name] = [
                        'name' => $folder->name,
                        'path' => $folder->path,
                        'messages' => $messages->map(function($message) {
                            return [
                                'uid' => $message->getUid(),
                                'subject' => $message->getSubject(),
                                'header' => $message->getHeader(),
                                'from' => $message->getFrom()[0]->mail,
                                'body' => $message->getHTMLBody(),
                            ];
                        }),
                    ];
                }
            }catch (Exception $e){
                $allFolders[$emailAccount->email] = ['error' => $e->getMessage()];
            }

        }

        return Inertia::render('Home', [
            'allFolders' => $allFolders,
            'status' => session('status'),
        ]);
    }
}
