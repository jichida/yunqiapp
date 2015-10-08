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
		console.log("updateCoupon:" + EJSON.stringify(couponDoc));
		Coupons.update(id, {$set:couponDoc});
	},
	'updateProduct':function(id,productData){
		console.log("updateProduct:" + EJSON.stringify(productData));
		Products.update(id, {$set:productData});
	},
	'insertRedpackage': function(redpackageDoc){
		//var currentUserId = Meteor.userId();
		SystemRedPackages.insert(redpackageDoc);
	},
	'updateRedpackage':function(id,redpackageDoc){
		console.log("updateRedpackage:" + EJSON.stringify(redpackageDoc));
		SystemRedPackages.update(id, {$set:redpackageDoc});
	},
	'updateSalespromotion':function(id,salespromotionDoc){
		console.log("updateSalespromotion:" + EJSON.stringify(salespromotionDoc));
		SalesPromotions.update(id, {$set:salespromotionDoc});
	},
	'setproductavaliable':function(id,isavaliable){
		Products.update(id, {$set:{isavaliable:isavaliable}});
	},
	'setsalespromotionavaliable':function(id,isavaliable){
		SalesPromotions.update(id, {$set:{isavaliable:isavaliable}});
	},
	'setredpackageavaliable':function(id,isavaliable){
		SystemRedPackages.update(id, {$set:{isavaliable:isavaliable}});
	},
	'setcouponavaliable':function(id,isavaliable){
		Coupons.update(id, {$set:{isavaliable:isavaliable}});
	},
  'setOrderStatus':function(id,setDoc){
    console.log("before updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
    Orders.update(id, {$set:setDoc});
    console.log("after updateSalespromotion:" + EJSON.stringify(Orders.findOne(id)));
  },
  'updateSalespromotionImage':function(id,imageid){
    console.log("updateSalespromotionImage image,id:" + id);
    var imageurl = "/cfs/files/images/" + imageid;
    SalesPromotions.update(id, {$set:{imageid:imageid,imageurl:imageurl}});
  }

});
