<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone'=>'required|string|max:20',
            'address'=>'required|string|max:255',
            'items'=>'required|array|min:1',
            'items.*.pizza_id'=>'required|integer|exists:pizzas,id',
            'items.*.quantity'=>'required|integer|min:1'
        ];
    }
}
