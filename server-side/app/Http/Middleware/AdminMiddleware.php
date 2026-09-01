<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->user()){
            return response()->json([
                'message'=>'Unauthenticated'
            ],401);
        }

        if(!$request->user()->is_admin){
            return response()->json([
                'message'=>"forbiden, Admin access only"
            ],403);
        }
        return $next($request);
    }
}
