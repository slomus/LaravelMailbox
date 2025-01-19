<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'email' => ['required', 'email', Rule::unique('email_accounts')->ignore($this->route('id'))],
            'password' => 'nullable',
            'imap_host' => 'required',
            'imap_port' => 'required',
            'encryption' => 'required',
        ];
    }
}
