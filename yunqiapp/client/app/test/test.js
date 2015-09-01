Template.test.events({
    "click #btninsertprodcuts": function () {
		//插入产品测试数据
		  var productlistdb = 
          [ 
          {
              _id:'abcd',
              productname:'液化气（小）',
              productprice:30,
              stockqty:100,
          
           },
          {
              productname:'液化气（中）',
              productprice:100  ,
              stockqty:100,
            
          },
          {
              productname:'液化气（大）',
              productprice:440,
              stockqty:100,
         
          },
          {
              productname:'二甲醚（小）',
              productprice:130.00 ,
              stockqty:100,
            
         },
          {
              productname:'二甲醚（中）',
              productprice:130.00 ,
               stockqty:100,
       
                                      }];
     
    // Products.remove();      
    if(Products.find().count() === 0){
        for (var i in productlistdb) {
            Meteor.call('insertProduct',productlistdb[i]);
           
        }
    }
    else{
        alert("系统中已经存在产品数据");
    }
    
	},
    "click #btninsertredpackage": function () {
		//插入一个系统红包
		
        //系统红包
        var systemredpackage = {
            title:'这是个测试红包',
            systemuserid:'0',
            amountcount:10,
            leftcount:10,
            money:10,
            createtime:'2015-08-25 13:24:21',
            starttime:'2015-08-25 00:00:00',
            endtime:'2015-10-30 13:24:21',
        };
       Meteor.call('createsystemredpackage',systemredpackage);
         
	},
    "click #btninsertcoupons": function () {
		//插入系统优惠券数据
        
        var coupons = [
        {
            _id:'1234',
            type:'muchless',
            title:'满50减10',
            createtime:'2015-08-25 13:24:21',
            starttime:'2015-08-25 00:00:00',
            endtime:'2015-08-30 13:24:21',
            conditionamout:50,
            offamout:10,
        },
        {
            type:'muchless',
            title:'满20减3',
            createtime:'2015-08-25 13:24:21',
            starttime:'2015-08-25 00:00:00',
            endtime:'2015-08-30 13:24:21',
            conditionamout:20,
            offamout:3,        
        },
        {
            type:'muchless',
            title:'满30减5',
            createtime:'2015-08-25 13:24:21',
            starttime:'2015-08-25 00:00:00',
            endtime:'2015-08-30 13:24:21',
            conditionamout:30,
            offamout:5,        
        }
        ];
        if(Coupons.find().count() === 0){
            for (var i in coupons) {
                 Meteor.call('insertCoupon',coupons[i]);
            }
        }
        else{
            alert("系统中已经存在优惠券数据");
        }
    
	},
    "click #btninsertsalespromotions": function () {
		//插入促销活动数据
            
        var salespromotions = [
            {
                type:'typeorder',
                subtype:'freedelivery',
                title:'全场包邮',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                link:'',
            },
            {
                type:'typeorder',
                subtype:'amountfreedelivery',
                title:'满额包邮',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                link:'',
                conditionamout:100,
            },
            {
                type:'typeorder',
                subtype:'freetospecialproduct',
                title:'满30就送小液化气',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                productid:'abcd',
                link:'',
                conditionamout:30,
            },
            {
                type:'typeorder',
                subtype:'freetocoupons',
                title:'满50就赠优惠券',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                couponid:'1234',
                link:'',
                conditionamout:50,
            },
            {
                type:'typeproduct',
                subtype:'specialproductdiscount',
                title:'买小液化气打7折',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                productid:'abcd',
                link:'',
            },
            {
                type:'typeproduct',
                subtype:'buyonefreeone',
                title:'买小液化气买一赠一',
                createtime:'2015-08-25 13:24:21',
                starttime:'2015-08-25 00:00:00',
                endtime:'2015-08-30 13:24:21',
                productid:'abcd',
                link:'',
            },
        ];
        if(SalesPromotions.find().count() === 0){
            for (var i in salespromotions) {
                Meteor.call('insertSalespromotion',salespromotions[i]);
            }
        }
        else{
            alert("系统中已经存在促销活动数据");
        }
        
	},
    "click #btninsertmyredpackage": function () {
		//给自己发送一个红包
        var currentUserId = Meteor.userId(); 
        if(currentUserId == null){
            alert("请先登录");
            return;
        }
        if(SystemRedPackages.find().count() === 0){
            alert("系统中没有红包数据");
            return;
        }
        var curredpackage = SystemRedPackages.findOne();
        Meteor.call('getsystemredpackage', currentUserId,curredpackage._id);
    
	},
    "click #btninsertmycoupons": function () {
		//给自己发送优惠券
        var currentUserId = Meteor.userId(); 
        if(currentUserId == null){
            alert("请先登录");
            return;
        }
        if(Coupons.find().count() === 0){
            alert("系统中没有优惠券数据");
            return;
        }
        var curcoupons = Coupons.findOne();
        Meteor.call('getacoupon', currentUserId,curcoupons._id);
	},
});