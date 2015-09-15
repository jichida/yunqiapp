Template.adminorderinfo.events({
    "click #btndelivery": function () {

        var order = this.curorder;
        console.log("click btndelivery:" + EJSON.stringify(order));
        var setDoc = {
          orderstatus:'deliveried',
          orderstatusstring:'已发货',
        };
        Meteor.call("setOrderStatus",order._id,setDoc);
    },
  });
