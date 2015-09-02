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
	},	
	'updateCoupon':function(id,couponDoc){
		Coupons.update(id, {$set:couponDoc});
	},	
	'updateProduct':function(id,productData){
		Products.update(id, {$set:productData});
	},
	'insertRedpackage': function(redpackageDoc){
		//var currentUserId = Meteor.userId();
			SystemRedPackages.insert(redpackageDoc);
	},	
	'updateRedpackage':function(id,redpackageDoc){
		SystemRedPackages.update(id, {$set:redpackageDoc});
	},		
	'updateSalespromotion':function(id,salespromotionDoc){
			SalesPromotions.update(id, {$set:salespromotionDoc});		
	},
	'setproductavaliable':function(id,isavaliable){
		Products.update(id, {$set:{isavaliable:isavaliable}});
	},

});