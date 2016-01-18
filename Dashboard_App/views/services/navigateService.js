




angular.module("appModule")

    .factory("redirect",function($state,$mdDialog)
    {
        var factory = {};

        factory.redirectCall =  function(val)
        {
            $state.go(val);
        };


        factory.alertDialog = function(title,content)
        {
            var alert = $mdDialog.alert({
                title: title,
                content: content,
                ok: 'Close'
            });
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });
        }

        factory.redirectCurrent = function()
        {
            $state.go($state.current,[],{reload:true});
        }


        return factory;
    });
