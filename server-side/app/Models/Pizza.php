<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    /** @use HasFactory<\Database\Factories\PizzaFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'ingredients',
        'desc',
        'price',
        'image'
    ];
    public function orderItems(){
        return $this->hasMany(OrderItem::class);
    }
}
