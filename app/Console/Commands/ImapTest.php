<?php  
  
namespace App\Console\Commands;  
  
use Illuminate\Console\Command;  
use Webklex\IMAP\Facades\Client;  
use App\Models\EmailAccount;
use Exception;

class ImapTest extends Command  
{  
    /**  
     * The name and signature of the console command.
     *
	 * @var string  
     */
     protected $signature = 'imap:test';  
  
    /**  
     * The console command description.
     *
	 * @var string  
     */
     protected $description = 'Command description';  
  
    /**  
     * Execute the console command.
     *
	 * @return int  
     */
     public function handle() {
        $emailAccount = EmailAccount::where('user_id', 1)->first();
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

            $folders = $client->getFolders();  

            foreach($folders as $folder){  
                $this->info("Accessing folder: ".$folder->path);  
      
                $messages = $folder->messages()->all()->limit(3, 0)->get();  
      
                $this->info("Number of messages: ".$messages->count());  
                
                /** @var \Webklex\PHPIMAP\Message $message */  
                foreach ($messages as $message) {  
                    $this->info("\tMessage: ".$message->message_id);  
                }  
            }
        }catch (Exception $e){
            $this->info($e->getMessage());
        }
            
		return 0;  
    }
}