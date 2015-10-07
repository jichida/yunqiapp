globalgetmyredpackage = function(conditiontype){
    var redpackagelist = [];
    UserMoney.find({userid:Meteor.userId(),moneytype:'redpackage'}).forEach(
      function(usermoney){
         var redpacakge = SystemRedPackages.findOne(usermoney.moneyid);
         var orderid = usermoney.orderid;
         var cp = _.extend(redpacakge,{
           usermoneyid:usermoney._id,
           invalidtime:usermoney.invalidtime,
           usefulmoney:usermoney.usefulmoney,
           status:usermoney.status,
           orderid:orderid,
         });

         if(conditiontype == 'allisvalid'){
           if(cp.status == 'notused' && cp.invalidtime > moment().format('YYYY-MM-DD')
           && cp.isavaliable == true){
             redpackagelist.push(cp);
           }
         }
         else if(conditiontype == 'usedinorder'){
           if(cp.status == 'used'){
             redpackagelist.push(cp);
           }
         }
         else if(conditiontype == 'all'){
           redpackagelist.push(cp);
         }
         else if(conditiontype == 'allinvalid'){
           if((cp.status == 'notused' && cp.invalidtime < moment().format('YYYY-MM-DD'))
           || cp.isavaliable == false){
             redpackagelist.push(cp);
           }
         }
       }
     );
    console.log("globalgetmyredpackage redpackagelist:" + EJSON.stringify(redpackagelist));
    return redpackagelist;
};

globalgetmycoupon = function(conditiontype){
  var couponlist = [];
  UserMoney.find({userid:Meteor.userId(),moneytype:'coupon'}).forEach(
    function(usermoney){
      var conpon = Coupons.findOne(usermoney.moneyid);
      var orderid = usermoney.orderid;
      var cp = _.extend(conpon,{
        usermoneyid:usermoney._id,
        invalidtime:usermoney.invalidtime,
        usefulmoney:usermoney.usefulmoney,
        status:usermoney.status,
        orderid:orderid,
      });
      if(conditiontype == 'allisvalid'){
        if(cp.status == 'notused' && cp.invalidtime > moment().format('YYYY-MM-DD')
        && cp.isavaliable == true){
          couponlist.push(cp);
        }
      }
      else if(conditiontype == 'usedinorder'){
        if(cp.status == 'used'){
          couponlist.push(cp);
        }
      }
      else if(conditiontype == 'all'){
        couponlist.push(cp);
      }
      else if(conditiontype == 'allinvalid'){
        if((cp.status == 'notused' && cp.invalidtime < moment().format('YYYY-MM-DD'))
        || cp.isavaliable == false){
          couponlist.push(cp);
        }
      }
    }
  );
  console.log("globalgetmycoupon couponlist:" + EJSON.stringify(couponlist));
  return couponlist;
}
