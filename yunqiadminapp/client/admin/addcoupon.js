Template.addcoupon.events({
    "click .btnaddcoupon": function () {
          console.log("click btn add coupon");
          event.preventDefault();
          var title= $('#title').val();
          var coupontype= $('#coupontype').val();
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var conditionamount = $('#conditionamount').val();
          var offamount = $('#offamount').val();
          var couponDoc = {
              title:title,
              coupontype:coupontype,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              conditionamount:conditionamount,
              offamount:offamount,
              isavaliable:true
          }
          console.log("insert coupon:" + EJSON.stringify(couponDoc));
          Meteor.call("insertCoupon",couponDoc);
            
          Router.go("/admin/navcoupons");
    
    },    
  });