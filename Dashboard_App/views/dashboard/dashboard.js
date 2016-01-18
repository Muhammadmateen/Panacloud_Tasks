/**
 * Created by Mateen Bhai on 1/12/2016.
 */

angular.module("appModule")

    .controller('dashboard_controller', function ($scope,$timeout, $mdSidenav, $log, $mdDialog,todoService,$document,redirect) {

        var _self = this;

       /* var localData = JSON.parse(localStorage.getItem('firebase:session::todo-task'));*/
        var uid = localStorage.getItem("uid");




        $document.ready(function()
        {

            if(uid == null)
            {
                redirect.redirectCall("login");
            }

        });

        this.toggleLeft = buildDelayedToggler('left');

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = this,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }, 200);
        }


        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }





        //Show dialog box for add todo
        _self.showDialog = function(ev)
        {
            $mdDialog.show({
                controller: 'todo_dialog_ctrl',
                controllerAs: 'ctrl',
                templateUrl: './views/dialog_template/dialog_template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };



        _self.todo = todoService.user_todos;
        _self.details = todoService.user_details;


        _self.deleteTodo = function(a)
        {
            todoService.deleteTodo(a);

        }

        _self.logout = function()
        {
            //localStorage.removeItem(uid);
        }



        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };




        var fileInput = document.getElementById('fileInput');

        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var imageType = /image.*/;

            if (file.type.match(imageType)) {
                var reader = new FileReader();

                reader.onload = function(e) {


                    _self.picture1 = reader.result;

                    todoService.saveImag(_self.picture1);
                    console.log(_self.picture1);

                }

                reader.readAsDataURL(file);
            } else {
                console.log("File not supported");
            }

        });









    })




