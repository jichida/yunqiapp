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
        console.log("address:" + EJSON.stringify(addresslist));
        Meteor.users.update(Meteor.userId(), {$set: {addresslist: addresslist}});
    },    
});