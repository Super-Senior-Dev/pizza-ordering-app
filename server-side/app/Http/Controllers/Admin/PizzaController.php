<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePizzaRequest;
use App\Http\Requests\UpdatePizzaRequest;
use App\Http\Resources\PizzaResourse;
use App\Models\Pizza;
use Illuminate\Http\Request;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query= Pizza::query();

        

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function($query) use ($search){
                $query->where('name','like',"%{$search}%")->orWhere('ingredients','like',"%{$search}%")->orWhere('description','like',"%{$search}%");
            });
        }

        
        $pizzas = $query->latest()->paginate(10)->withQueryString();

        return PizzaResourse::collection($pizzas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePizzaRequest $request)
    {
        $data= $request->validated();

        if($request->hasFile('image')){
            $data['image']=$request->file('image')->store('pizzas','public');
        }

        $pizza=Pizza::create($data);

        return response()->json([
            'message'=>"Pizza successfully created.",
            'pizza'=>new PizzaResourse($pizza),
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pizza $pizza)
    {
        return new PizzaResourse($pizza);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePizzaRequest $request, Pizza $pizza)
    {
        $pizza->update($request->validated());

        return response()->json([
            'message'=>'Pizza updated successfully.',
            'pizza'=>new PizzaResourse($pizza)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pizza $pizza)
    {
        $pizza->delete();

        return response()->json([
            'message'=>'Pizza deleted successfully.'
        ]);
    }
}
