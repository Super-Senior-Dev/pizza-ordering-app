<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Pizza;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders= $request->user()->orders()->with('orderItems.pizza')->latest()->paginate(10);

        return OrderResource::collection($orders);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        
        $validated=$request->validated();
        $user=$request->user();

        $pizzaIds=collect($request->items)->pluck('pizza_id');

        $pizzas = Pizza::whereIn('id',$pizzaIds)->get();

        //calculating pizzas

        $totalPrice= 0;

        foreach ($request->items as $item){
            $pizza= $pizzas->firstWhere('id',$item["pizza_id"]);
            $totalPrice +=$pizza->price * $item['quantity'];
        }

        $order=null;
        DB::transaction(function () use (&$order,$validated,$user, $pizzas,$totalPrice,$request) {
            $order = Order::create([
                'user_id'=>$user->id,
                'phone'=>$validated['phone'],
                'address'=>$validated['address'],
                "total_price"=>$totalPrice,
                'status'=>'pending'
            ]);
    
            foreach ($request->items as $item){
                $pizza = $pizzas->firstWhere('id',$item['pizza_id']);
    
                $order->orderItems()->create([
                    'pizza_id'=>$pizza->id,
                    'quantity'=>$item['quantity'],
                    "price"=>$pizza->price,            
                ]);
            }
        });

        // dd("I reached the response");


        return response()->json([
            'message'=>'Order created successfully',
            'order'=>new OrderResource($order->load('orderItems.pizza')), 
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,Order $order)
    {
        Gate::authorize('view',$order);

        $order->load([
            'user',
            'orderItems.pizza'
        ]);

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
    //     $validated= $request->validate([
    //         "status"=>"required|in:pending,preparing,delivered,canceled"
    //     ]);

    //     $order->update([
    //         'status'=>$validated['status']
    //     ]);

    //     return response()->json([
    //         'message'=>"Order status updated successfully.",
    //         'order'=>$order->load('orderItems.pizza')
    //     ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Order $order)
    {
        // if($order->user_id !== $request->user()->id){
        //     return response()->json([
        //         'message'=>"Unauthorized"
        //     ],403);
        // }

        // $order->update([
        //     'status'=>"canceled"
        // ]);

        // return response()->json([
        //     'message'=> "Order canceled successfully",
        //     "order"=>$order
        // ]);
    }

    public function cancel(Order $order){
        Gate::authorize('cancel',$order);

        $order->update([
            'status'=>"canceled"
        ]);

        return response()->json([
            'message'=>"Order canceled successfully",
            'order'=>new OrderResource($order->load('orderItems.pizza')),
        ]);
    }
}
