/**
 * Created by Mateen Bhai on 1/15/2016.
 */


angular.module("appModule")

    .controller("todo_dialog_ctrl",function(firebaseUrl,$mdDialog)
    {
        var _self = this;

        _self.addTodo = function(a)
        {
            var uid = localStorage.getItem("uid");
            var user_todo_ref = new Firebase(firebaseUrl+uid+"/todos");

            var abc = user_todo_ref.push(
                {
                    name:a
                });

            $mdDialog.hide();

        }



    })