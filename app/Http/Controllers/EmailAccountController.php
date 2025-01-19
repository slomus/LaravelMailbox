<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailCreateRequest;
use App\Http\Requests\EmailUpdateRequest;
use Illuminate\Http\Request;
use App\Models\EmailAccount;
use Webklex\IMAP\Facades\Client;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EmailAccountController extends Controller
{

    public function edit(Request $request): Response
    {
        $emailAccounts = EmailAccount::where('user_id', $request->user()->id)->get();
        return Inertia::render('EmailAccountsView', [
            'emailAccounts' => $emailAccounts,
            'status' => session('status'),
        ]);
    }
    public function store(EmailCreateRequest $emailCreateRequest)
    {
        $validated = $emailCreateRequest->validated();

        $emailAccount = EmailAccount::create([
            'user_id' => $emailCreateRequest->user()->id, //Jak by nie działało to zamienić na auth()->id()
            'email' => $validated['email'],
            'password' => encrypt($validated['password']),
            'imap_host' => $validated['imap_host'],
            'imap_port' => $validated['imap_port'],
            'encryption' => $validated['encryption'] ?? 'ssl',
        ]);

        return Redirect::route('profiles.email');
    }

   public function update(EmailUpdateRequest $emailUpdateRequest)
   {
    $validated = $emailUpdateRequest->validated();

    if (empty($validated['password'])) {
        unset($validated['password']);
    }

    $emailAccount = EmailAccount::where('user_id', $emailUpdateRequest->user()->id)
        ->where('id', $emailUpdateRequest->route('id'))
        ->firstOrFail();

    $emailAccount->update($validated);
    return Redirect::route('profiles.email');
   }

    public function destroy($id)
    {
        $emailAccount = EmailAccount::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $emailAccount->delete();

        return Redirect::route('profiles.email');
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
                    $messages = $folder->messages()->setFetchOrder('desc')->all()->limit(5, 0)->get();
                    $allFolders[$emailAccount->email][$folder->name] = [
                        'name' => $folder->name,
                        'path' => $folder->path,
                        'messages' => $messages->map(function ($message) {
                            return [
                                'uid' => $message->getUid(),
                                'subject' => (string) $message->getSubject() ?? 'Bez tematu', // Konwertujemy na tekst
                                'header' => $message->getHeader(),
                                'from' => (string) $message->getFrom()[0]->mail ?? 'Brak nadawcy', // Konwertujemy na tekst
                                'body' => (string) $message->getHTMLBody() ?? 'Brak treści', // Konwertujemy na tekst
                            ];
                        })->toArray(), // Zamień kolekcję na tablicę
                    ];
                    
                    
                }
            } catch (Exception $e) {
                $allFolders[$emailAccount->email] = ['error' => $e->getMessage()];
            }
        }
    
        // Logowanie struktury danych
        Log::info('All Folders Data: ', $allFolders);
    
        return Inertia::render('Home', [
            'allFolders' => $allFolders,
            'status' => session('status'),
        ]);
    }
    
}
