Template.addsalespromotion.events({
    "click .btnsalespromotion": function () {
          console.log("click btn add salespromotion");
          event.preventDefault();
          var title= $('#title').val();
          var coupontype= $('#coupontype').val();//促销类型
          //这里需要做判断，针对促销类型
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var conditionamount = $('#conditionamount').val();
  
          var salespromotionDoc = {
              title:title,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              conditionamount:conditionamount,
              isavaliable:true
          }
          console.log("insert salespromotion:" + EJSON.stringify(salespromotionDoc));
          Meteor.call("insertSalespromotion",salespromotionDoc);
  
          Router.go("/admin/navsalespromotions");
    
    },    
  });