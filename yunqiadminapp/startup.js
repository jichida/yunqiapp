

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
        
      //AutoForm.setDefaultTemplate("plain");
   //  AutoForm.setDefaultTemplateForType('afFieldInput', 'plain');
       // AutoForm.setDefaultTemplate('nothing');
    //AutoForm.setDefaultTemplate('bootstrap3');
     //AutoForm.setDefaultTemplate("semanticUI");
    }
    
    if(Meteor.isServer){
    //    var productlistdb = 
    //       [ 
    //       {
    //           _id:'abcd',
    //           productname:'液化气（小）',
    //           productprice:30,
    //           stockqty:100,
          
    //        },
    //       {
    //           productname:'液化气（中）',
    //           productprice:100  ,
    //           stockqty:100,
            
    //       },
    //       {
    //           productname:'液化气（大）',
    //           productprice:440,
    //           stockqty:100,
         
    //       },
    //       {
    //           productname:'二甲醚（小）',
    //           productprice:130.00 ,
    //           stockqty:100,
            
    //      },
    //       {
    //           productname:'二甲醚（中）',
    //           productprice:130.00 ,
    //            stockqty:100,
       
    //                                   }];
     
    // // Products.remove();      
    // if(Products.find().count() === 0){
    //     for (var i in productlistdb) {
    //         Products.insert(productlistdb[i]);
    //     }

    // }
    
    // //系统红包
    // var systemredpackage = {
    //     title:'这是个测试红包',
    //     systemuserid:'0',
    //     amountcount:10,
    //     leftcount:10,
    //     money:10,
    //     createtime:'2015-08-25 13:24:21',
    //     starttime:'2015-08-25 00:00:00',
    //     endtime:'2015-08-30 13:24:21',
    // };
    // if(SystemRedPackages.find().count() === 0){
    //     SystemRedPackages.insert(systemredpackage);
    // }
    
    // var coupons = [
    //   {
    //       _id:'1234',
    //       type:'muchless',
    //       title:'满50减10',
    //       createtime:'2015-08-25 13:24:21',
    //       starttime:'2015-08-25 00:00:00',
    //       endtime:'2015-08-30 13:24:21',
    //       conditionamout:50,
    //       offamout:10,
    //   },
    //   {
    //       type:'muchless',
    //       title:'满20减3',
    //       createtime:'2015-08-25 13:24:21',
    //       starttime:'2015-08-25 00:00:00',
    //       endtime:'2015-08-30 13:24:21',
    //       conditionamout:20,
    //       offamout:3,        
    //   },
    //   {
    //       type:'muchless',
    //       title:'满30减5',
    //       createtime:'2015-08-25 13:24:21',
    //       starttime:'2015-08-25 00:00:00',
    //       endtime:'2015-08-30 13:24:21',
    //       conditionamout:30,
    //       offamout:5,        
    //   }
    // ];
    // if(Coupons.find().count() === 0){
    //     for (var i in coupons) {
    //         Coupons.insert(coupons[i]);
    //     }
    // }
    
    // var salespromotions = [
    //     {
    //         type:'typeorder',
    //         subtype:'freedelivery',
    //         title:'全场包邮',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         link:'',
    //     },
    //     {
    //         type:'typeorder',
    //         subtype:'amountfreedelivery',
    //         title:'满额包邮',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         link:'',
    //         conditionamout:100,
    //     },
    //     {
    //         type:'typeorder',
    //         subtype:'freetospecialproduct',
    //         title:'满30就送小液化气',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         productid:'abcd',
    //         link:'',
    //         conditionamout:30,
    //     },
    //     {
    //         type:'typeorder',
    //         subtype:'freetocoupons',
    //         title:'满50就赠优惠券',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         couponid:'1234',
    //         link:'',
    //         conditionamout:50,
    //     },
    //     {
    //         type:'typeproduct',
    //         subtype:'specialproductdiscount',
    //         title:'买小液化气打7折',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         productid:'abcd',
    //         link:'',
    //     },
    //     {
    //         type:'typeproduct',
    //         subtype:'buyonefreeone',
    //         title:'买小液化气买一赠一',
    //         createtime:'2015-08-25 13:24:21',
    //         starttime:'2015-08-25 00:00:00',
    //         endtime:'2015-08-30 13:24:21',
    //         productid:'abcd',
    //         link:'',
    //     },
    // ];
    // if(SalesPromotions.find().count() === 0){
    //     for (var i in salespromotions) {
    //         SalesPromotions.insert(salespromotions[i]);
    //     }
    // }
    
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