/**
 * Created by Mateen Bhai on 1/19/2016.
 */



angular.module("appModule")

    .controller("pic_dialog_ctrl",function($mdDialog,firebaseUrl)
    {
        var _self = this;
        var uid = localStorage.getItem("uid");
        var user_details_ref = new Firebase(firebaseUrl+uid+"/user_details");


        _self.cropper = {};
        _self.cropper.sourceImage = null;
        _self.cropper.croppedImage   = null;
        _self.bounds = {};

        _self.saveImg = function()
        {
            user_details_ref.update({
                profilePic:_self.cropper.croppedImage
            })
            $mdDialog.hide();
        }

        _self.closeDialog = function()
        {
            $mdDialog.hide();
        }
    })