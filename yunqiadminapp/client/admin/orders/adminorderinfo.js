Template.adminorderinfo.events({
    "click #btndelivery": function () {

        var order = this.curorder;
        console.log("click btndelivery:" + EJSON.stringify(order));
        var setDoc = {
          orderstatus:'tobefinished',
          orderstatusstring:'已发货',
        };
        Meteor.call("setOrderStatus",order._id,setDoc);
    },
  });

  Template.adminorderinfo.helpers({
    'orderispaid':function(){
        return this.curorder.orderstatus == "tobedelivered";
    },
    'orderisdevelied':function(){
        return this.curorder.orderstatus == "tobefinished";
    }
  });
