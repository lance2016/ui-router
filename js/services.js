var myServices = angular.module('myServices',[]);

myServices.service('msgBox',function(){
    this.msg = function(msg) {
	msg = msg.replace('\"',"");
	msg = msg.replace('\"',"");
	reset();
	alertify.alert(msg);
    };
});