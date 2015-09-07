Meteor.methods({
    'insertAddress': function(addressDoc){
		    var currentUserId = Meteor.userId();
        var addresslist = [];
        var usr = Meteor.users.findOne(currentUserId);
        if (usr) {
            if(usr.addresslist){
                addresslist = usr.addresslist;
            }
        }
        addresslist.push(addressDoc);
        Meteor.call('setAddress', addresslist);
	},
  'setAddress':function(addresslist){
        console.log("setAddress:" + EJSON.stringify(addresslist));
        Meteor.users.update(Meteor.userId(), {$set: {addresslist: addresslist}});
    },
    'updateAddress':function(id,addressDoc){
      var addresslist = [];
      var currentUserId = Meteor.userId();
      var usr = Meteor.users.findOne(currentUserId);
      if (usr) {
          if(usr.addresslist){
              addresslist = usr.addresslist;
          }
      }
      for(var i = 0;i < addresslist.length; i++){
        if(addresslist[i].addressid == id){
          addresslist[i] = addressDoc;
        }
      }
      Meteor.call('setAddress', addresslist);
    },

    'deleteAddress':function(id){

      var addresslist = [];
      var currentUserId = Meteor.userId();
      var usr = Meteor.users.findOne(currentUserId);
      if (usr) {
          if(usr.addresslist){
            for(var i = 0;i < usr.addresslist.length; i++){
              if(usr.addresslist[i].addressid != id){
                addresslist.push(usr.addresslist[i]);
              }
            }
          }
      }
      console.log("deleteAddress methods:" + id +",resultlist:"+EJSON.stringify(addresslist));
      Meteor.call('setAddress', addresslist);
    },
});
