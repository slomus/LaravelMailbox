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
            'email' => 'XXX', //twój email
            'password' => encrypt('XXX'), //twoje hasło
            'imap_host' => 'XXX', //twoj serwer
            'imap_port' => 993, //może być inny
            'encryption' => 'ssl',
        ]);
    }
}
