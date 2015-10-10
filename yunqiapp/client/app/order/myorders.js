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
      'ordertobepaid':function(){
          return this.orderstatus == "tobepaid";
      },
      'ordertobefinished':function(){
          return this.orderstatus == "tobefinished";
      }
 });



 Template.allorders.events({
   'click #btnpayorder':function(){
     console.log("click btnpayorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'tobedelivered',
       orderstatusstring:'待发货',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
   'click #btnfinishorder':function(){
     console.log("click btnfinishorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'finished',
       orderstatusstring:'已完成',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
 });

Template.alltobedeliveryorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'tobedelivered'});
         console.log("alltobedeliveryorders:"+orders.count());
         return orders;
      },
 });

 Template.alltobefinishedorders.events({
   'click #btnfinishorder':function(){
     console.log("click btnfinishorder:" + EJSON.stringify(this._id));
     var setDoc = {
       orderstatus:'finished',
       orderstatusstring:'已完成',
     };
     Meteor.call("setOrderStatus",this._id,setDoc);
   },
 });


  Template.alltobefinishedorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'tobefinished'});
         console.log("allpayedorders:"+orders.count());
         return orders;
      },
 });
