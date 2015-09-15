	Meteor.methods({
		'insertOrder': function(orderData){
		//var currentUserId = Meteor.userId();
  			Orders.insert(orderData);
		},
		'setOrderStatus':function(id,setDoc){
				console.log("before updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
				Orders.update(id, {$set:setDoc});
				console.log("after updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
			},
	});
