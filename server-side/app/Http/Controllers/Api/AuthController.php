<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validate=Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users,email',
            'password'=>'required|string|min:8|confirmed'
        ]);

        if($validate->fails()){
            return response()->json([
                'errors'=>$validate->errors()
            ],422);
        }

        $user=User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> Hash::make($request->password)
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'=>'User registered successfully.',
            'user'=>new UserResource($user),
            'token'=>$token
        ],201);
    }
    public function login(Request $request){
        $validate=Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);
        if($validate->fails()){
            return response()->json([
                'errors'=>$validate->errors(),
            ],422);
        }

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json([
                'message'=>'Invalid email or password',
            ],401);
        }

        $user = User::where('email',$request->email)->first();
        $user->tokens()->delete();

        $token =$user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'=>'Login successful',
            'user'=>new UserResource($user),
            'token'=>$token
        ],200);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message'=> 'Logged out successfully.'
        ],200);
    }
}
