Template.adminuserinfo.helpers({
  "couponlist": function () {
        var couponlist = [];
        UserMoney.find({userid:this.curuser._id,moneytype:'coupon'}).forEach(
          function(usermoney){
            var conpon = Coupons.findOne(usermoney.moneyid);
            var orderid = usermoney.orderid;
            var cp = _.extend(conpon,{
              status:usermoney.status,
              orderid:orderid,
            });
            couponlist.push(cp);
          }
        );
        console.log("couponlist:" + EJSON.stringify(couponlist));
        return couponlist;
    },
    "redpackagelist": function () {
      var redpackagelist = [];
      UserMoney.find({userid:this.curuser._id,moneytype:'redpackage'}).forEach(
        function(usermoney){
          var redpacakge = SystemRedPackages.findOne(usermoney.moneyid);
          var orderid = usermoney.orderid;
          var cp = _.extend(redpacakge,{
            status:usermoney.status,
            orderid:orderid,
          });
          redpackagelist.push(cp);
        }
      );
      console.log("redpackagelist:" + EJSON.stringify(redpackagelist));
      return redpackagelist;
    },
    "addresslist": function () {
      var addresslist = [];
      UserAddress.find({userid:this.curuser._id}).forEach(function(address){
        addresslist.push(address);
      });
      console.log("addresslist:" + EJSON.stringify(addresslist));
      return addresslist;
    },

    isEmptyString: function (s) {
      if(s){
        return s == '';
      }
      return true;
    },
});
