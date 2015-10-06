
Template.addsalespromotion.helpers({
  'promotionlist':[
    // {
    //   typevalue:'101',
    //   typestring:'全场包邮',
    // },
    // {
    //   typevalue:'102',
    //   typestring:'满额包邮',
    // },
    // {
    //   typevalue:'103',
    //   typestring:'满就赠指定商品',
    // },
    // {
    //   typevalue:'104',
    //   typestring:'满就赠优惠券',
    // },
    {
      typevalue:'201',
      typestring:'购买指定商品打折',
    },
    {
      typevalue:'202',
      typestring:'购买指定商品买一赠一',
    },
  ]
});

Template.addsalespromotion.events({
    "click #btnaddsalespromotion": function () {
          console.log("click btn add salespromotion");
          event.preventDefault();
          var title= $('#title').val();
          var coupontype= $('#coupontype').val();//促销类型
          //这里需要做判断，针对促销类型
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var conditionamount = $('#conditionamount').val();
          var specialdiscount =$('#specialdiscount').val();

          var typestring = $("#saleprotomotiontype").find("option:selected").text();
          var typevalue = $("#saleprotomotiontype").val();

          var specialproductid =  $("#specialproduct").val();
          var specialproductname =  $("#specialproduct").find("option:selected").text();

          var isavaliable = $("#isavaliable").is(':checked');
          var salespromotionDoc = {
              title:title,
              typestring:typestring,
              typevalue:typevalue,
              specialproductid:specialproductid,
              specialproductname:specialproductname,
              starttime:starttime,
              endtime:endtime,
              specialdiscount:specialdiscount,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              conditionamount:conditionamount,
              isavaliable:isavaliable
          }
          console.log("insert salespromotion:" + EJSON.stringify(salespromotionDoc)
            +",conditionamount:" + conditionamount);
          Meteor.call("insertSalespromotion",salespromotionDoc);

          Router.go("/admin/navsalespromotions");

    },
  });

  Template.addsalespromotion.rendered=function() {
    $('#starttime').pickadate();
    $('#endtime').pickadate();
  }
  Template.updatesalespromotion.rendered=function() {
    $('#starttime').pickadate();
    $('#endtime').pickadate();
  }

Template.updatesalespromotion.helpers({
  'promotionlist':[
    // {
    //   typevalue:'101',
    //   typestring:'全场包邮',
    // },
    // {
    //   typevalue:'102',
    //   typestring:'满额包邮',
    // },
    // {
    //   typevalue:'103',
    //   typestring:'满就赠指定商品',
    // },
    // {
    //   typevalue:'104',
    //   typestring:'满就赠优惠券',
    // },
    {
      typevalue:'201',
      typestring:'购买指定商品打折',
    },
    {
      typevalue:'202',
      typestring:'购买指定商品买一赠一',
    },
  ]
});


Template.updatesalespromotion.events({
    "click #btnupdatesalespromotion": function () {
          console.log("click btn add salespromotion");
          event.preventDefault();
          var title= $('#title').val();
          var coupontype= $('#coupontype').val();//促销类型
          //这里需要做判断，针对促销类型
          var starttime= $('#starttime').val();//时间日期类型
          var endtime= $('#endtime').val();//时间日期类型
          var conditionamount = $('#conditionamount').val();
          var specialdiscount =$('#specialdiscount').val();

          var typestring = $("#saleprotomotiontype").find("option:selected").text();
          var typevalue = $("#saleprotomotiontype").val();

          var specialproductid =  $("#specialproduct").val();
          var specialproductname =  $("#specialproduct").find("option:selected").text();

          var isavaliable = $("#isavaliable").is(':checked');
          var salespromotionDoc = {
              title:title,
              typestring:typestring,
              typevalue:typevalue,
              specialproductid:specialproductid,
              specialproductname:specialproductname,
              starttime:starttime,
              endtime:endtime,
              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
              conditionamount:conditionamount,
              specialdiscount:specialdiscount,
              isavaliable:isavaliable
          }
          console.log("update salespromotion:" + EJSON.stringify(salespromotionDoc)
            +",conditionamount:" + conditionamount);
          Meteor.call("updateSalespromotion",this.cursalespromotion._id,salespromotionDoc);

          Router.go("/admin/navsalespromotions");

    },
  });
