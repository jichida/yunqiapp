Template.adminorderinfo.events({
    "click #btndelivery": function () {

        var order = this.curorder;
        console.log("click btndelivery:" + EJSON.stringify(order));
        var setDoc = {
          orderstatus:'deliveredorder',
          orderstatusstring:'已发货',
        };
        Meteor.call("setOrderStatus",order._id,setDoc);
    },
  });

  Template.adminorderinfo.helpers({
    'orderispaid':function(){
        return this.curorder.orderstatus == "paidorder";
    },
    'orderisdevelied':function(){
        return this.curorder.orderstatus == "deliveredorder";
    }
  });
