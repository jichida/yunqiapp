Meteor.methods({
        'getacoupon':function(userid,couponid){
                var currentUserId = Meteor.userId(); 
                var curcoupon = Coupons.findOne({_id:couponid});
                var couponslist = [];
                var usr = Meteor.users.findOne(currentUserId);
                if (usr) {
                      if(usr.couponslist){
                         couponslist = usr.couponslist;
                      }	          
                }
                couponslist.push(curcoupon);
                Meteor.call('setCouponslist', couponslist);       
            },
        'setCouponslist':function(couponslist){
              console.log("couponslist:" + EJSON.stringify(couponslist));
              Meteor.users.update(Meteor.userId(), {$set: {couponslist: couponslist}});
        }
});