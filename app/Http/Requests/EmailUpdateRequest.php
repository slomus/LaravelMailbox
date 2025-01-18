<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user_id = auth()->id();
        return [
            'email' => "required|email|unique:email_accounts,email,{$user_id},id",
            'password' => 'required',
            'imap_host' => 'required',
            'imap_port' => 'required',
            'encryption' => 'nullable|string',
        ];
    }
}
