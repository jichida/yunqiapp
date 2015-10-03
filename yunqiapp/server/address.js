Meteor.methods({
    'insertAddress': function(addressDoc){
        addressDoc = _.extend(addressDoc,{
          userid:Meteor.userId()
        });
        console.log("insertAddress:" + EJSON.stringify(addressDoc));
        UserAddress.insert(addressDoc);

	},
    'updateAddress':function(id,addressDoc){
      addressDoc = _.extend(addressDoc,{
        userid:Meteor.userId()
      });
      console.log("updateAddress:" + EJSON.stringify(addressDoc));
      UserAddress.update(id,addressDoc);
    },

    'deleteAddress':function(id){
      UserAddress.remove(id);
    },
    'setdefaultaddress':function(id){
      Meteor.users.update({_id:Meteor.userId()}, { $set:{"profile.defaultaddressid":id}} )
    }
});
