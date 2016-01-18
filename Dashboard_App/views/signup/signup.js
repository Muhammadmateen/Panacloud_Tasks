/**
 * Created by Mateen Bhai on 1/16/2016.
 */

angular.module("appModule")

    .controller("signup_controller",function(firebaseUrl,redirect,$timeout,$mdDialog,$mdToast)
    {
        var _self = this;
        var ref = new Firebase(firebaseUrl);
        _self.loader = false;

        var defaultPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYoAAAGKCAIAAACdHJFHAACAAElEQ…d4L284kjsl1KnXDn/xbkyqk0yPyxKckLbwZ/nfAAAA//+Ar+BRRn1cowAAAABJRU5ErkJggg==";


        _self.signUp = function() {
            _self.loader = true;
            ref.createUser({
                email: _self.email,
                password: _self.pass
            }, function (error, userData) {
                if (error) {
                    _self.loader = false;
                    _self.email = "";
                    _self.pass = "";
                    redirect.alertDialog(" "+error);
                } else {
                            var childRef = ref.child(userData.uid+"/user_details");
                            childRef.set(
                                {
                                    firstName : _self.fName,
                                    lastName : _self.lName,
                                    completedTasks:0,
                                    profilePic: defaultPic
                                },function(error)
                                {
                                    if(error)
                                    {
                                        _self.loader = false;
                                        redirect.alertDialog(error);
                                    }
                                    else
                                    {
                                        _self.loader = false;
                                        redirect.alertDialog("Successful","Successfully created user account");
                                        redirect.redirectCurrent();
                                    }

                                });
                        }

            });


        };



    });