/**
 * Created by Muhammad on 1/2/2016.
 */


var app = angular.module("myApp",['ngMaterial','ngMdIcons']);


/*app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');

});*/

    app.controller("indexCtrl",function()
    {

        var vm = this;

         vm.allTodo = [];



        //Add todos
        vm.addTodo = function()
        {
            vm.allTodo.push(
                {
                   todo: vm.todoItem,
                    check:false
                });
            vm.todoItem = "";
        }


        //Archive todos
        vm.archive = function()
        {
            for(var i = 0;i<vm.allTodo.length;i++)
            {
                if(vm.allTodo[i].check == true)
                {
                    vm.allTodo.splice(i,1);
                    i--;
                    vm.counter--;
                }

            }
        };



            vm.counter = 0;

        //selected archives
        vm.selectedArchives = function(a)
        {
            if(vm.allTodo[a].check == true)
            {
               vm.counter--;
            }
            else
            {
                vm.counter++;
            }

        }



    });