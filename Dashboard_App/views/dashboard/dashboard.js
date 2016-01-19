/**
 * Created by Mateen Bhai on 1/12/2016.
 */

angular.module("appModule")

    .controller('dashboard_controller', function ($scope,$timeout, $mdSidenav,$mdDialog,$document,redirect,firebaseUrl,$firebaseObject,$firebaseArray) {

        var _self = this;

       /* var localData = JSON.parse(localStorage.getItem('firebase:session::todo-task'));*/

        _self.loader = true;

        var uid = localStorage.getItem("uid");
        var user_details_ref = new Firebase(firebaseUrl+uid+"/user_details");
        var user_todo_ref = new Firebase(firebaseUrl+uid+"/todos");
        _self.user_details = $firebaseObject(user_details_ref);
        _self.user_todos = $firebaseArray(user_todo_ref);


        _self.user_details.$loaded().then(function()
        {
            _self.user_todos.$loaded().then(function()
            {
                _self.loader = false;
            })
        })





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

        _self.pictureDialog = function(ev)
        {
            $mdDialog.show({

                controller: 'pic_dialog_ctrl',
                controllerAs: 'ctrl',
                templateUrl: './views/pic_dialog_template/pic_dialog_template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        }










        //deleted todo function
        _self.deleteTodo = function(a)
        {

            _self.user_todos.$remove(a);
            user_details_ref.update(
                {
                    completedTasks:++_self.user_details.completedTasks
                })

        }





        //logout function
        _self.logout = function()
        {
            localStorage.removeItem("uid");
            redirect.redirectCurrent();
        }






        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };









        //for picture clcik event
        /*var fileInput = document.getElementById('fileInput');

        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var imageType = /image.*!/;

            if (file.type.match(imageType)) {
                var reader = new FileReader();

                reader.onload = function(e) {


                    _self.picture1 = reader.result;

                    user_details_ref.update({
                        profilePic:_self.picture1
                    })


                }

                reader.readAsDataURL(file);
            } else {
                console.log("File not supported");
            }

        });*/









    })




