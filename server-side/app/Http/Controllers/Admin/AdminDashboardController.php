<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Pizza;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(){
        $totalOrder=Order::count();
        $pendingOrders=Order::where('status','pending')->count();
        $totalPizzas=Pizza::count();
        $revenue=Order::where('status','delivered')->sum('total_price');
        $recentOrders=Order::with(['user','orderItems.pizza'])->latest()->take(5)->get();

        return response()->json([
            'total_orders'=>$totalOrder,
            'pending_orders'=>$pendingOrders,
            'total_pizzas'=>$totalPizzas,
            'revenue'=>$revenue,
            'recent_orders'=>OrderResource::collection($recentOrders)
        ]);
    }
}
