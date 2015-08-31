if(Meteor.isServer){
		Meteor.methods({
			'insertCoupon': function(couponDoc){
				//var currentUserId = Meteor.userId();
				Coupons.insert(couponDoc);
			},
			
			'updateCoupon':function(id,couponDoc){
				Coupons.update(id, {$set:couponDoc});
			}
		});
	};