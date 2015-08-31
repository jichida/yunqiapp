Template.register.events({
    "click #btnregister": function () {
      console.log("click btn btnregister");
      event.preventDefault();
  
  // Collect data and validate it.
    var username =  $('#username').val();  
    var phone =  $('#phone').val();  
    var password =  $('#password').val();  
    var passwordConfirmation =  $('#passwordConfirmation').val();  
    leftamout = 0;
    // You can go about getting your data from the form any way you choose, but
    // in the end you want something formatted like so:
    user = {
      username: username,
      password: password,
      phone: phone,
      profile: {
        leftamout: leftamout,
        // etc...
      }
    }

    // Post the user to the server for creation
    Accounts.createUser(user, function (error) {
      if (error) {
        alert(error.reason);
        console.log(error);
      }
      else{
          Router.go('/profile'); 
      }
    });

    return false;   
    },    
  });
