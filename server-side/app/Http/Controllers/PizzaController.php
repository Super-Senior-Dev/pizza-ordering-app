<?php

namespace App\Http\Controllers;

use App\Models\Pizza;

use App\Http\Resources\PizzaResourse;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pizzas=Pizza::latest()->paginate(10);

        return PizzaResourse::collection($pizzas);
    }
    /**
     * Display the specified resource.
     */
    public function show(Pizza $pizza)
    {
        return new PizzaResourse($pizza);
    }
}
