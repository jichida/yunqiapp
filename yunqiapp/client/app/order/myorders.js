var curTab = new ReactiveVar(0);

Template.myorders.onRendered(function () {
   curTab.set(this.data.mycurtab);
   var tabid = parseInt(this.data.mycurtab) + 1;
   var tabsel = '#tabone'+tabid;
   var consel = '#con_one_'+tabid;
   console.log("tabsel:" + tabsel + ",consel:" + consel );
   this.$(tabsel).addClass('active');
   this.$(consel).css({'display':'block'});
});


Template.myorders.events({
  'click #tabone1':function(event,template){
    event.preventDefault();
    template.$('#tabone1').addClass('active');
    template.$('#tabone2').removeClass('active');
    template.$('#tabone3').removeClass('active');

    template.$('#con_one_1').css({'display':'block'});
    template.$('#con_one_2').css({'display':'none'});
    template.$('#con_one_3').css({'display':'none'});
    curTab.set(0);
    console.log("click tab1");
  },
  'click #tabone2':function(event,template){
    event.preventDefault();
    template.$('#tabone2').addClass('active');
    template.$('#tabone1').removeClass('active');
    template.$('#tabone3').removeClass('active');

    template.$('#con_one_2').css({'display':'block'});
    template.$('#con_one_1').css({'display':'none'});
    template.$('#con_one_3').css({'display':'none'});
    curTab.set(1);
    console.log("click tab2");
  },
  'click #tabone3':function(event,template){
    event.preventDefault();
    template.$('#tabone3').addClass('active');
    template.$('#tabone1').removeClass('active');
    template.$('#tabone2').removeClass('active');

    template.$('#con_one_3').css({'display':'block'});
    template.$('#con_one_1').css({'display':'none'});
    template.$('#con_one_2').css({'display':'none'});
    curTab.set(2);
    console.log("click tab3");
  },
});


 Template.allorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId});
         console.log("allorders:"+EJSON.stringify(orders));
         return orders;
      },
      'orderisnew':function(){
          return this.orderstatus == "neworder";
      },
      'orderisdevelied':function(){
          return this.orderstatus == "deliveredorder";
      }
 });



 Template.allorders.events({
   'click #btnpayorder':function(){
     console.log("click btnpayorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'paidorder',
       orderstatusstring:'已支付',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
   'click #btnfinishorder':function(){
     console.log("click btnfinishorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'finishedorder',
       orderstatusstring:'已完成',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
 });

  Template.alltobedeliveryorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'paidorder'});
         console.log("alltobedeliveryorders:"+orders.count());
         return orders;
      },
 });

 Template.allclosedorders.events({
   'click #btnfinishorder':function(){
     console.log("click btnfinishorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'finishedorder',
       orderstatusstring:'已完成',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
 });


  Template.allclosedorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'deliveredorder'});
         console.log("allpayedorders:"+orders.count());
         return orders;
      },
 });
