  Template.myorders.helpers({
      'curtab':function(){
            console.log("curtab:"+Session.get("curtab"));
            return Session.get("curtab");
      },
 });


 Template.allorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId});
         console.log("allorders:"+EJSON.stringify(orders));
         return orders;
      },
 });

  Template.alltobedeliveryorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'neworder'});
         console.log("alltobedeliveryorders:"+orders.count());
         return orders;
      },
 });

  Template.allclosedorders.helpers({
      'allorders':function(){
         var currentUserId = Meteor.userId();
         var orders = Orders.find({createuser:currentUserId,orderstatus:'payedorder'});
         console.log("allpayedorders:"+orders.count());
         return orders;
      },
 });
