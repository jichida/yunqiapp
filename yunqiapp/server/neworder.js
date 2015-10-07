	Meteor.methods({
		'insertOrder': function(orderData){
				 var orderid =	Orders.insert(orderData);
				 if(orderData.paymoneylist){
					 for (var i = 0; i < orderData.paymoneylist.length; i ++ ){
						 var paymoney = orderData.paymoneylist[i];
						 UserMoney.update(paymoney.id,{$set:{status:'used',orderid:orderid}});
					 }
				 }
		},
		'setOrderStatus':function(id,setDoc){
				console.log("before updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
				Orders.update(id, {$set:setDoc});
				console.log("after updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
			},
	});
