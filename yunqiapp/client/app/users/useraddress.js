Template.useraddress.events({
  'submit form': function(event) {
     event.preventDefault();
	   console.log("click add address");
      Router.go("/profile/adduseraddress");
  },
	
});

Template.useraddress.helpers({
      'addresslist': function () {
          var addresslist = [];
          var currentUserId = Meteor.userId();  
          var usr = Meteor.users.findOne(currentUserId);
          if (usr) {
            console.log("user is here ...");
            if(usr.addresslist){
              console.log("address is here ...");
              addresslist = usr.addresslist;
            }	          
          }
          //console.log("addresslist:" + addresslist.count());
          return addresslist;
      },
});

Template.useraddress.events({
    "click .toggle-setdefault": function () {
        var currentUserId = Meteor.userId(); 
        var addresslist = [];
        var usr = Meteor.users.findOne(currentUserId);
        if (usr) {
          if(usr.addresslist){
            addresslist = usr.addresslist;
          }	          
        }
        for(i in addresslist){
            if (addresslist[i].addressid == this.addressid){
               addresslist[i].isdefault = true;   
            }
            else{
               addresslist[i].isdefault = false;
            }
        }
        Meteor.call('setAddress', addresslist);
    
    },    
  });