<?php

namespace App\Services;
use App\Models\TodoList;
use App\Exceptions\ServiceException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodoService
{
    public function storeListData(Request $request)
    {
        
        if(auth()->user()){
            $data=$this->computeListData($request);
            return TodoList::create($data);
        }
        throw new ServiceException('User Unauthorized');

    }

    public function editListData(Request $request)
    {
        if(auth()->user())
        {
            $data=$this->computeListData($request);
            return TodoList::find($request->id)->update($data);
        }   
        throw new ServiceException('User Unauthorized');
    }

    public function getUserListData()
    {   
        if(auth()->user())
            return TodoList::where('user',auth()->user()->id)->orderBy('created_at','DESC')->get();

        throw new ServiceException('User Unauthorized');

    }

    public function getList($listId)
    {
        if(auth()->user())
        {
            return TodoList::find($listId);
        }
           

        throw new ServiceException('User Unauthorized');
    }

    private function computeListData($request){
        $data=[];
        $data['title']=$request->title;
        $data['listItems']=$request->listItems;
        $data['user']=auth()->user()->id;
        return $data;
    }

    public function deleteToDoList($id)
    {   
        $itemList=TodoList::find($id);
        if(!empty($itemList))
        return $itemList->delete();

        throw new ServiceException('Invalid Data');
    }
}
