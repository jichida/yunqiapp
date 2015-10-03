Template.addredpackage.events({
    "click #btnaddredpackage": function () {
           console.log("click btn add redpackage");
           event.preventDefault();
          var title= $('#title').val();
          var money= $('#money').val();
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var amountcount = $('#amountcount').val();
          var offamount = $('#offamount').val();
          var isavaliable = $("#isavaliable").is(':checked');
          var redpackageDoc = {
              title:title,
              money:money,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              amountcount:amountcount,
              leftcount:amountcount,
              offamount:offamount,
              isavaliable:isavaliable
          }
          console.log("insert redpackage:" + EJSON.stringify(redpackageDoc));
          Meteor.call("createsystemredpackage",redpackageDoc);
          Router.go("/admin/navredpackages");

    },
  });

  Template.updateredpackage.events({
    "click #btnupdateredpackage": function () {
           console.log("click btn add redpackage");
           event.preventDefault();
          var title= $('#title').val();
          var money= $('#money').val();
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var amountcount = $('#amountcount').val();
          var offamount = $('#offamount').val();
          var isavaliable = $("#isavaliable").is(':checked');
          var redpackageDoc = {
              title:title,
              money:money,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              amountcount:amountcount,
              offamount:offamount,
              isavaliable:isavaliable
          }
          console.log("update redpackage:" + EJSON.stringify(redpackageDoc));
          Meteor.call("updateRedpackage",this.curredpackage._id,redpackageDoc);
          Router.go("/admin/navredpackages");

    },
  });

  Template.addredpackage.rendered=function() {
    $('#starttime').pickadate();
    $('#endtime').pickadate();
  }
  Template.updateredpackage.rendered=function() {
    $('#starttime').pickadate();
    $('#endtime').pickadate();
  }
