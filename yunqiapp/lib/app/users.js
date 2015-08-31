if(Meteor.isClient){  
  Template.more.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
  });
  /** 
Template.login.events({  
    'click #btnlogin': function(event, template) {
        // 1. Collect the username and password from the form
        var username = template.find('#login-username').value,
            password = template.find('#login-password').value;
            
            console.log("username:" + username + ",password:" + password);
        // 2. Attempt to login.
        Meteor.loginWithPassword(username, password, function(error) {
            // 3. Handle the response
            if (Meteor.user()) {
                // Redirect the user to where they're loggin into. Here, Router.go uses
                // the iron:router package.
                Router.go('/profile');
            } else {
                // If no user resulted from the attempt, an error variable will be available
                // in this callback. We can output the error to the user here.
                var message = "There was an error logging in: <strong>" + error.reason + "</strong>";

                template.find('#form-messages').html(message);
            }

            return;
        });

        return false;
    }
});
*/
Template.CreateUser.events({  
  'click #btnregister': function(event, template) {
    var user;

    // Collect data and validate it.
        var formUsername = template.find('#create-user-username').value,
            formPassword = template.find('#create-user-password').value;
            formPhonenumber = template.find('#create-user-phonenumber').value;
            leftamout = 0;
    // You can go about getting your data from the form any way you choose, but
    // in the end you want something formatted like so:
    user = {
      username: formUsername,
      password: formPassword,
      email: formPhonenumber,
      profile: {
        leftamout: leftamout,
        // etc...
      }
    }

    // Post the user to the server for creation
    Accounts.createUser(user, function (error) {
      if (error) {
        // :(
        console.log(error);
      }
      else{
          Router.go('/profile'); 
      }
    });

    return false;
  }
});

}