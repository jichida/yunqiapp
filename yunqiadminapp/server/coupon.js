if(Meteor.isServer){
		Meteor.methods({
			'sendusercoupon':function(userid,couponid){
				var usermoney = {
					userid:userid,
					moneyid:couponid,
					moneytype:'coupon',
					status:'notused',
					orderid:''
				}
				UserMoney.insert(usermoney);
			}
		});
	};
