<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request){
        $query=Order::with(['user','OrderItems.pizza'])->latest();

        // status
        if($request->filled('status')&& $request->status !=='all'){
            $query->where('status',$request->status);
        }
        // search
        if($request->filled('search')){
            $search=$request->search;

            $query->where(function ($q) use ($search){
                $q->where('id',$search)->orWhere('phone','like',"%{$search}%")->orWhereHas('user',function ($userQuery) use ($search) {
                    $userQuery->where('name','like',"%{$search}%")->orWhere('email','like',"%{$search}");
                });
            });
        }


        $orders=$query->paginate(10);
        return OrderResource::collection($orders);
    }

    public function show(Order $order){
        $order->load([
            'user',
            'orderItems.pizza'
        ]);

        return new OrderResource($order);
    }

    public function update(UpdateOrderRequest $request,Order $order){
        $validated= $request->validated();
        $order->update([
            'status'=>$validated['status'],
        ]);

        $order->load([
            'user',
            'orderItems.pizza'
        ]);
        return response()->json([
            'message'=>'Order status updated successfully',
            'order'=>new OrderResource(($order))
        ]);
    }
}
