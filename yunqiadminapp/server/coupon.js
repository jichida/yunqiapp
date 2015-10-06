if(Meteor.isServer){
		Meteor.methods({
			'sendusercoupon':function(userid,couponid){
				var coupon = Coupons.findOne(couponid);
				var invalidtime = '';
				if(coupon.invalidtype == 'fixeddays'){
					invalidtime = moment().add({days:coupon.invaliddays}).format('YYYY-MM-DD');
				}
				else {
					//fixedendtime
					invalidtime = coupon.endtime;
				}
				var usermoney = {
					userid:userid,
					moneyid:couponid,
					invalidtime:invalidtime,
					moneytype:'coupon',
					status:'notused',
					orderid:''
				}
				console.log("coupon:" + EJSON.stringify(coupon) + "uermony:" + EJSON.stringify(usermoney));

				UserMoney.insert(usermoney);
			}
		});
	};
