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
        Meteor.subscribe("users");
        Meteor.subscribe('usermoney');
        Meteor.subscribe('useraddress');
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
     //发布促销活动（全部）
     Meteor.publish("users", function () {
        return Meteor.users.find();
     });
     Meteor.publish("usermoney", function () {
        return UserMoney.find();
     });
     Meteor.publish("useraddress", function () {
        return UserAddress.find();
     });

     if(Meteor.users.find({username:'admin'}).count() == 0){
         var user ={
           username:'admin',
           password:'admin',
         };
         var userid = Accounts.createUser(user);
         Roles.addUsersToRoles(userid, ['admin']);
     }
 }
});
