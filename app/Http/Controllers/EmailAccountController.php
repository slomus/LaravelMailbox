<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailCreateRequest;
use Illuminate\Http\Request;
use App\Models\EmailAccount;
use Webklex\IMAP\Facades\Client;
use Exception;

class EmailAccountController extends Controller
{
    public function store(EmailCreateRequest $emailCreateRequest)
    {
        $validated = $emailCreateRequest->validated();

        $emailAccount = EmailAccount::create([
            'user_id' => auth()->id(),
            'email' => $validated['email'],
            'password' => encrypt($validated['password']),
            'imap_host' => $validated['imap_host'],
            'imap_port' => $validated['imap_port'],
            'encryption' => $validated['encryption'] ?? 'ssl',
        ]);

        return response()->json($emailAccount, 201);
    }

    // public function getAllFolders()
    // {
    //     $emailAccounts = EmailAccount::where('user_id', auth()->id())->get();

    //     $allFolders = [];
    //     foreach ($emailAccounts as $emailAccount) {
    //         try {
    //             $client = new Client([
    //                 'host' => $emailAccount->imap_host,
    //                 'port' => $emailAccount->imap_port,
    //                 'encryption' => $emailAccount->encryption,
    //                 'validate_cert' => true,
    //                 'username' => $emailAccount->email,
    //                 'password' => decrypt($emailAccount->password),
    //                 'protocol' => 'imap',
    //             ]);

    //             $client->connect();
    //             $folders = $client->getFolders();

    //             $allFolders[$emailAccount->email] = $folders->map(function ($folder) {
    //                 return [
    //                     'name' => $folder->name,
    //                     'path' => $folder->path,
    //                     'messages' => $folder->messages()->all()->count(),
    //                 ];
    //             });
    //         } catch (Exception $e) {
    //             $allFolders[$emailAccount->email] = ['error' => $e->getMessage()];
    //         }
    //     }

    //     return response()->json($allFolders);
    // }

}
