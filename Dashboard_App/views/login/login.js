/**
 * Created by Mateen Bhai on 1/16/2016.
 */


angular.module("appModule")

    //$sessionStorage

    .controller("login_controller",function(firebaseUrl,$document,$timeout,redirect,$state,$mdToast)
    {

        var _self = this;
        var ref = new Firebase(firebaseUrl);
        /*var localData = JSON.parse(localStorage.getItem('firebase:session::todo-task'));*/

        var uid = localStorage.getItem("uid");

        //When page is ready
        $document.ready(function()
        {

            if(uid != null)
            {
                redirect.redirectCall("/");
            }

        });




        //Login Function
        _self.login = function(email,pass)
        {
            _self.loader = true;
            ref.authWithPassword({
                email    :email,
                password :pass
            },function(error,authData)
            {
                if(error)
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Login Failed : Email address and password is incorrect')
                            .position(_self.getToastPosition())
                            .hideDelay(3000)
                    );
                    $timeout(function()
                    {
                        _self.pass = "";
                        _self.loader = false;
                    },0);
                }
                else
                {
                    localStorage.setItem("uid",authData.uid);
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Login Successfully')
                            .position(_self.getToastPosition())
                            .hideDelay(3000)
                    );

                    $state.go("/");
                }
            });

        };


        //Set the position of Toast
        _self.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        //get the position of Toast
        _self.getToastPosition = function() {
            return Object.keys(_self.toastPosition)
                .filter(function(pos) { return _self.toastPosition[pos]; })
                .join(' ');
        };


    });