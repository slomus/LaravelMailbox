<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmailAccount;

class EmailTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmailAccount::create([
            'user_id' => 1,
            'email' => 'michal.grzonkowski21@gmail.com', //twój email
            'password' => encrypt('qiosiarrykcauvyb'), //twoje hasło
            'imap_host' => 'imap.gmail.com', //twoj serwer
            'imap_port' => 993, //może być inny
            'encryption' => 'ssl',
        ]);
    }
}
