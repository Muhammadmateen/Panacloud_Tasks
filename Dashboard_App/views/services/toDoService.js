/**
 * Created by Mateen Bhai on 1/15/2016.
 */


angular.module("appModule")

    .factory("todoService",function(firebaseUrl,$firebaseArray,$firebaseObject)
    {


        var data = {};
        var uid = localStorage.getItem("uid");

        var user_details_ref = new Firebase(firebaseUrl+uid+"/user_details");
        var user_todo_ref = new Firebase(firebaseUrl+uid+"/todos");
        data.user_details = $firebaseObject(user_details_ref);
        data.user_todos = $firebaseArray(user_todo_ref);


        //Add todo in firebase
        data.addTodo = function(a)
        {
            var abc = user_todo_ref.push(
            {
                name:a
            });
        }




        //Delete todo from firebase
        data.deleteTodo = function(a)
        {
            data.user_todos.$remove(a);
            /*console.log(data.user_details.completedTasks);*/
            user_details_ref.update(
                {
                    completedTasks:++data.user_details.completedTasks
                })

        }




        data.saveImag = function(a)
        {
            user_details_ref.update({
                profilePic:a
            })




        }



        /*for(var x in data.todoList[3]) {
         if(x.indexOf('$') == -1){
         console.log(x);
         console.log(data.todoList[3][x].name);
         }

         }*/




        return data;

    })