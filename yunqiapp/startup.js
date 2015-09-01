

Meteor.startup(function(){
    console.log("start up");
    if(Meteor.isClient){
        console.log("client start...0");
        Meteor.subscribe("userData");
        Meteor.subscribe("redpackage");
        Meteor.subscribe("coupons");
        Meteor.subscribe("salespromotions");
        Meteor.subscribe("products");
        Meteor.subscribe("orders");
        
       // FlashMessages.configure({
        //     autoHide: true,
        //     hideDelay: 3000,
        //     autoScroll: true
        // });
      //AutoForm.setDefaultTemplate("plain");
   //  AutoForm.setDefaultTemplateForType('afFieldInput', 'plain');
       // AutoForm.setDefaultTemplate('nothing');
    //AutoForm.setDefaultTemplate('bootstrap3');
     //AutoForm.setDefaultTemplate("semanticUI");
    }
    
    if(Meteor.isServer){
     
    //===================================================================
    //发布订单数据
    Meteor.publish("orders",function(){
        return Orders.find();
    });
    //发布产品数据
    Meteor.publish("products",function(){
        return Products.find();
    });
    //发布用户数据
    Meteor.publish("userData", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId});
        } else {
            this.ready();
        }
     });
     //发布红包,这里设置过滤条件
     Meteor.publish("redpackage", function () {
        return SystemRedPackages.find();
     });
     //发布优惠券（全部）
     Meteor.publish("coupons", function () {
        return Coupons.find();
     });
     //发布促销活动（全部）
     Meteor.publish("salespromotions", function () {
        return SalesPromotions.find();
     });
 }
});