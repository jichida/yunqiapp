Template.login.events({
    "click #btnsign": function () {
      console.log("click btn sign");
      event.preventDefault();
      var username =  $('#username').val();
      var password =  $('#password').val();
      Meteor.loginWithPassword(username,password, function (error) {
        if(error){
           alert(error.reason);
           console.log(error.reason);
          // FlashMessages.sendError(error.reason);
        }
        else{
          if(Roles.userIsInRole(Meteor.user(), ['admin'])){
            Router.go('/admin');//登录成功
          }
          else{
            alert("非admin用户");
          }

        }
      });
    },
  });
