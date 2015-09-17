Template.orderinfo.events({
  'click #btnpayorder':function(){
    console.log("click btnpayorder:" + EJSON.stringify(this.order._id));
    var setDoc = {
      orderstatus:'paidorder',
      orderstatusstring:'已支付',
    };
    Meteor.call("setOrderStatus",this.order._id,setDoc);
  },
  'click #btnfinishorder':function(){
    console.log("click btnfinishorder:" + EJSON.stringify(this.order._id));
    var setDoc = {
      orderstatus:'finishedorder',
      orderstatusstring:'已完成',
    };
    Meteor.call("setOrderStatus",this.order._id,setDoc);
  },
});

Template.orderinfo.helpers({
  'orderisnotpaid':function(){
      return this.order.orderstatus == "neworder";
  },
  'orderisdevelied':function(){
      return this.order.orderstatus == "deliveredorder";
  }
});

Template.orderproduct.helpers({
  'notdiscount':function(){
    return this.qty* this.productprice==this.price
  },
  'orginprice':function(){
    return this.qty*this.productprice;
  }
});
