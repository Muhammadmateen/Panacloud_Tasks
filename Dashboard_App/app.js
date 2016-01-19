/**
 * Created by Mateen Bhai on 1/12/2016.
 */


(function()
{
    var app = angular.module("appModule",['ngMaterial','ngMdIcons','ui.router','firebase','angular-img-cropper'])

    app.config(states_config_func);

    app.constant("firebaseUrl","https://todo-task.firebaseio.com/");


    function states_config_func ($stateProvider,$urlRouterProvider)
    {
        $stateProvider.state("/",
            {
                url:'/',
                templateUrl:'views/dashboard/dashboard.html',
                controller:'dashboard_controller',
                controllerAs:'ctrl'
            })

        $stateProvider.state("login",
            {
                url:'/login',
                templateUrl:'views/login/login.html',
                controller:'login_controller',
                controllerAs:'ctrl'
            })

        $stateProvider.state("signup",
            {
                url:'/signup',
                templateUrl:'views/signup/signup.html',
                controller:'signup_controller',
                controllerAs:'ctrl'
            })



            $urlRouterProvider.otherwise("login");
    }

}());