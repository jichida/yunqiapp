Template.useraddress.events({
  'click #btnaddnewaddress': function(event) {
     event.preventDefault();
	   console.log("click add address");
     Router.go("/profile/adduseraddress");
  },
  'click #btnaddressupdate':function(event){
     event.preventDefault();
     Router.go("/updateuseraddress/" + this._id);
  },
  'click #btnaddressdelete':function(event){
      event.preventDefault();
      Meteor.call('deleteAddress',this._id);
  },
  'click #btnsetdefault':function(event){
    event.preventDefault();
    Meteor.call('setdefaultaddress',this._id);
  }

});

Template.useraddress.helpers({
      'addresslist': function () {
          var addresslist = [];
          UserAddress.find({userid:Meteor.userId()}).forEach(function(address){
            addresslist.push(address);
          });
          return addresslist;
      },
      'isdefault':function(){
          var defaultaddressid = Meteor.user().profile.defaultaddressid;
          if(defaultaddressid){
            return defaultaddressid == this._id;
          }
          return false;
      }
});
