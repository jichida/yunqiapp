Template.myredpackages.helpers({
      'myredpackages': function () {
          var myredpackages = [];
          var currentUserId = Meteor.userId();  
          var usr = Meteor.users.findOne(currentUserId);
          if (usr) {
            if(usr.myredpackages){
              myredpackages = usr.myredpackages;
            }	          
          }
          return myredpackages;
      },
});