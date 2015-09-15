Template.useraddress.events({
  'click #btnaddnewaddress': function(event) {
     event.preventDefault();
	   console.log("click add address");
     Router.go("/profile/adduseraddress");
  },
  'click #btnaddressupdate':function(event){
     event.preventDefault();
     var address = this;
     console.log("click update address:" + EJSON.stringify(address));
     Router.go("/updateuseraddress/" + this.addressid);
  },
  'click #btnaddressdelete':function(event){
    //  event.preventDefault();
  //  console.trace();
      var address = this;
      console.log("click delete address:" + EJSON.stringify(address));
      Meteor.call('deleteAddress',address.addressid);
  },

});

Template.useraddress.helpers({
      'addresslist': function () {
          var addresslist = [];
          var currentUserId = Meteor.userId();
          var usr = Meteor.users.findOne(currentUserId);
          if (usr) {
              if(usr.profile.addresslist){
                addresslist = usr.profile.addresslist;
            }
          }
          //console.log("addresslist:" + addresslist.count());
          return addresslist;
      },
});

// Template.useraddress.events({
//     "click .toggle-setdefault": function () {
//         var currentUserId = Meteor.userId();
//         var addresslist = [];
//         var usr = Meteor.users.findOne(currentUserId);
//         if (usr) {
//           if(usr.addresslist){
//             addresslist = usr.profile.addresslist;
//           }
//         }
//         for(i in addresslist){
//             if (addresslist[i].addressid == this.addressid){
//                addresslist[i].isdefault = true;
//             }
//             else{
//                addresslist[i].isdefault = false;
//             }
//         }
//         console.log("set deleteAddress...");
//         Meteor.call('setAddress', addresslist);
//
//     },
//   });
