Template.orderinfo.events({
  'click #btnpayorder':function(){
    console.log("click btnpayorder:" + EJSON.stringify(this.order._id));
    var setDoc = {
      orderstatus:'tobedelivered',
      orderstatusstring:'待发货',
    };
    Meteor.call("setOrderStatus",this.order._id,setDoc);
  },
  'click #btnfinishorder':function(){
    console.log("click btnfinishorder:" + EJSON.stringify(this.order._id));
    var setDoc = {
      orderstatus:'finished',
      orderstatusstring:'已完成',
    };
    Meteor.call("setOrderStatus",this.order._id,setDoc);
  },
});

Template.orderinfo.helpers({
  'orderisnotpaid':function(){
      return this.order.orderstatus == "tobepaid";
  },
  'orderisdevelied':function(){
      return this.order.orderstatus == "tobefinished";
  }
});

Template.orderproduct.helpers({
  'notdiscount':function(){
    return this.qty* this.productprice==this.price
  },
  'orginprice':function(){
    return this.qty*this.productprice;
  },
  'usepaymoneylist':function(){
    var result = false;
    if(this.order){
      if(this.order.paymoneylist){
        result = this.order.paymoneylist.length > 0;
      }
    }
    console.log("usepaymoneylist" + result);
    return result;
  },

});
