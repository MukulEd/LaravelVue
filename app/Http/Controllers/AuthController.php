<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Http\Requests\LoginRequest;
use  App\Http\Requests\RegisterRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {   
        $credentials = $request->only('email', 'password');

        try{
            if (! $token = auth()->attempt($credentials)) {

                $errors=["login"=>['Invalid Credentials']];
                return response()->json(["errors"=>$errors], 401);
            }
        }
        catch(JWTException $e){
            return response()->json(['errors' => ['login'=>'Unable to login now,please try again after some time!']], 500);
        }
        
        $tokenData=$this->createNewToken($token);
        $tokenData['message']="Login Successful";
        return response()->json($tokenData);

    }


     /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request) {

        $user = User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password' => bcrypt($request->password)
                ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out'],201);
    }


    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        try {

            if (! $user = auth()->parseToken() ) {
                    return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(["user"=>auth()->user()]);
    }



    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ];
    }
}
