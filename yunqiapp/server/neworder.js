	Meteor.methods({
		'insertOrder': function(orderData){
		//var currentUserId = Meteor.userId();
  	Orders.insert(orderData);
		}
	});
