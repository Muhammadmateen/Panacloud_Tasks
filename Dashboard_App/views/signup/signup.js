/**
 * Created by Mateen Bhai on 1/16/2016.
 */

angular.module("appModule")

    .controller("signup_controller",function(firebaseUrl,redirect,$timeout,$mdDialog,$mdToast)
    {
        var _self = this;
        var ref = new Firebase(firebaseUrl);
        _self.loader = false;




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
                                    profilePic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAD5CAIAAAAlcAcXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExQkVEQjhGMUE3RjE2NEVENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTI5NjUyOTkzNUYxMUUxOEQ1MTg0RUQyNTY5ODgyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTI5NjUyODkzNUYxMUUxOEQ1MTg0RUQyNTY5ODgyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENUZCRDc2QTUzOTBFMTExQTY1RkE2Rjg1QzExODhENyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExQkVEQjhGMUE3RjE2NEVENiIvPiA8L3JkZjpEZXNjcmlwdGlv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"
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
                                        redirect.redirectCall("login");
                                    }

                                });
                        }

            });


        };



    });