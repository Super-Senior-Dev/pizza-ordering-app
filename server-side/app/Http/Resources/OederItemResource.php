<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OederItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'pizza'=> new PizzaResourse($this->whenLoaded('pizza')),
            'quantity'=>$this->quantity,
            'price'=>$this->price,
            'subtotal'=>$this->price * $this->quantity,
        ];
    }
}
