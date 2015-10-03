Meteor.methods({
    'insertProduct': function(productDoc){
		console.log("insertProduct:" + EJSON.stringify(productDoc));
		Products.insert(productDoc);
	},
  'insertCoupon': function(couponDoc){
		console.log("insertCoupon:" + EJSON.stringify(couponDoc));
		Coupons.insert(couponDoc);
	},
	'insertSalespromotion':function(salespromotionDoc){
		console.log("insertSalespromotion:" + EJSON.stringify(salespromotionDoc));
		SalesPromotions.insert(salespromotionDoc);
	}

});
