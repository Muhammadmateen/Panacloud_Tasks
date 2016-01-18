/**
 * Created by Mateen Bhai on 1/15/2016.
 */


angular.module("appModule")

    .controller("todo_dialog_ctrl",function(firebaseUrl,$firebaseArray,todoService,$mdDialog)
    {
        var _self = this;




        _self.addTodo = function(a)
        {
            todoService.addTodo(a);
            _self.todo = "";
            $mdDialog.hide();
        }



    })