Template.mycoupons.helpers({
      'mycoupons': function () {
          var mycoupons = [];
          UserMoney.find({userid:Meteor.userId(),moneytype:'coupon'}).forEach(
            function(usermoney){
              var conpon = Coupons.findOne(usermoney.moneyid);
              var cp = _.extend(conpon,{
                status:usermoney.status,
                orderid:usermoney.orderid,
              });
              mycoupons.push(cp);
            }
          );
          return mycoupons;
      },
});
