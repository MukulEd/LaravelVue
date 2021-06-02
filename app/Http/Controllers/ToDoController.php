<?php

namespace App\Http\Controllers;
use App\Services\TodoService;

use Illuminate\Http\Request;
use  App\Http\Requests\StoreToDoRequest;
use Exception;
use App\Exceptions\ServiceException;
use Illuminate\Support\Facades\Log;

class ToDoController extends Controller
{
    private $service;

    public function __construct(TodoService $service){
        $this->service = $service;
    }

    public function getList(Request $request,$id)
    {
        try{
            if(empty($id))
                throw new ServiceException('Invalid Data Provided');

            $list=$this->service->getList($id);
            return response()->json(['list'=>$list],200);
        }
        catch(ServiceException $serviceException){
            $errors=["data"=>$serviceException->getMessage()];
            return response()->json(["errors"=>$errors], 422);
        }
        catch(Exception $e)
        {
            $errors=["data"=>['Unable to Store Data! Try Again Later']];
            return response()->json(["errors"=>$errors], 500);
        }
    }

    public function getAllList()
    {
        try{
            $list=$this->service->getUserListData();
            return response()->json(['list'=>$list],200);
        }
        catch(ServiceException $serviceException){
            $errors=["data"=>[$serviceException->getMessage()]];
            return response()->json(["errors"=>$errors], 422);
        }
        catch(Exception $e)
        {   
            $errors=["data"=>['Unable to Store Data! Try Again Later']];
            return response()->json(["errors"=>$errors], 500);
        }
    }

    public function storeList(StoreToDoRequest $request)
    {   
        try{
            $list=$this->service->storeListData($request);
            return response()->json(['message'=>'List Successfully Created','list'=>$list],201);
        }
        catch(ServiceException $serviceException){
            $errors=["data"=>['Invalid Data']];
            return response()->json(["errors"=>$errors], 422);
        }
        catch(Exception $e)
        {   
            $errors=["data"=>['Unable to Store Data! Try Again Later']];
            return response()->json(["errors"=>$errors], 500);
        }
    }

    
    public function editList(StoreToDoRequest $request)
    {
        try{
            if(empty($request->id))
                throw new ServiceException('Invalid Data Provided');

            $list=$this->service->editListData($request);
            return response()->json(['message'=>'List Successfully Updated','list'=>$list],200);
        }
        catch(ServiceException $serviceException){
            $errors=["data"=>$serviceException->getMessage()];
            return response()->json(["errors"=>$errors], 422);
        }
        catch(Exception $e)
        {
            $errors=["data"=>['Unable to Store Data! Try Again Later']];
            return response()->json(["errors"=>$errors], 500);
        }
    }

    public function deleteList(Request $request,$id)
    {
        try{
            if(empty($id))
                throw new ServiceException('Invalid Data Provided');

            $list=$this->service->deleteToDoList($id);
            return response()->json(['message'=>'List Successfully Deleted','list'=>$list],200);
        }
        catch(ServiceException $serviceException){
            Log::debug($serviceException->getMessage());
            $errors=["data"=>$serviceException->getMessage()];
            return response()->json(["errors"=>$errors], 422);
        }
        catch(Exception $e)
        {   Log::debug($e->getMessage());
            $errors=["data"=>['Unable to Store Data! Try Again Later']];
            return response()->json(["errors"=>$errors], 500);
        }
    }
}
