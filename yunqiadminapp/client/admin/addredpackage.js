Template.addredpackage.events({
    "click .btnaddredpackage": function () {
           console.log("click btn add redpackage");
           event.preventDefault();
          var title= $('#title').val();
          var money= $('#money').val();
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var amountcount = $('#amountcount').val();
          var offamount = $('#offamount').val();
          var redpackageDoc = {
              title:title,
              money:money,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              amountcount:amountcount,
              offamount:offamount,
              isavaliable:true
          }
          console.log("insert redpackage:" + EJSON.stringify(redpackageDoc));
          Meteor.call("createsystemredpackage",redpackageDoc);
          Router.go("/admin/navredpackages");
    
    },    
  });