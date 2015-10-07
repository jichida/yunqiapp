
Router.route('/', function () {
  console.log("index html");
  this.layout('mainlayout');
  this.render('navbar0', {to: 'navbar'});
  this.render('home', {to: 'content'});
});

Router.route('/test', function () {
  console.log("test html");
  this.render('test');

});

Router.route('/signIn',function(){
  this.render('signIn');
});

Router.route('/orderselectredpackage');
Router.route('/orderselectcoupon');
Router.route('/updateuseraddress/:addressid', function () {
    this.layout('indexdetailpagelayout',{data: {title: '修改地址',returnurl:"/profile/useraddress",returnhome:'/profile'}});
    var currentaddress = UserAddress.findOne(this.params.addressid);
    this.render('updateuseraddress', {to: 'detailpagecontent',data:currentaddress});


});
Router.route('/forgetpassword');
Router.route('/newmyorder');

Router.route('/profile', function () {
  this.layout('mainlayout');
  this.render('navbar1', {to: 'navbar'});
  if (Meteor.user()) {
     console.log("login");
     var currentUserId = Meteor.userId();
     var countallorders = Orders.find({createuser:currentUserId}).count();
     var countneworders = Orders.find({createuser:currentUserId,orderstatus:'neworder'}).count();
     var countpayedorders = Orders.find({createuser:currentUserId,orderstatus:'payedorder'}).count();
     this.render('profile', {to: 'content',data:{
         countallorders:countallorders,
         countneworders:countneworders,
         countpayedorders:countpayedorders,
     }});
  }
  else{
      console.log("not login");
      this.redirect("/signIn");

   }

});

Router.route('/wjmm', function () {
    this.layout('mainlayout');
    this.render('wjmm', {to: 'content'});
});


Router.route('/register', function () {
    this.layout('indexdetailpagelayout',{data: {title: '注册',returnurl:'/',returnhome:'/'}});
    this.render('register', {to: 'detailpagecontent'});
});

Router.route('/more', function () {
    this.layout('mainlayout');
    this.render('navbar2', {to: 'navbar'});
    this.render('more', {to: 'content'});
});

Router.route('/tabhome/:_tabindex', function () {
    if(this.params._tabindex == "1"){
        this.redirect("/profile");
    }
    else if(this.params._tabindex == "2"){
        this.redirect("/more");
    }
    else{
        this.redirect("/");
    }

});

Router.route('/orderselectaddress');

// Router.route('/homedetail/producttype/:_tabindex', function () {
//     console.log("/homedetail/producttype");
//     this.layout('indexdetailpagelayout',{data: {title: '选择产品',returnurl:'/homedetail/neworder/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
//     this.render('producttype', {to: 'detailpagecontent',data:{tabindex:this.params._tabindex}});
// });

Router.route('/homedetail/selectproduct/:_tabindex/:_action', function () {
    console.log("/homedetail/selectproduct");
    this.layout('indexdetailpagelayout',{data: {title: '选择产品',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
    this.render('selectproduct', {to: 'detailpagecontent',data:{tabindex:this.params._tabindex,action:this.params._action}});
});



Router.route('/homedetail/neworder/:_tabindex', function () {


    this.layout('indexdetailpagelayout',{data: {title: '我要下单',returnurl:'/homedetail/selectproduct/'+this.params._tabindex+"/neworder",returnhome:'/tabhome/'+this.params._tabindex}});

    var productlistsession = Session.get("productlistsession");
    if(productlistsession == null){
        productlistsession = [];
    }
    var amount = 0;
    for( j in productlistsession){
        amount += productlistsession[j].price;
    };
    var curorder = {
        orderamount:amount,
        orderproductlists:productlistsession
    };
    console.log("我要下单neworder：orderamount:"+amount);
    //this.render('orderproduct', {data:{tabindex:this.params._tabindex,order:curorder}});
    this.render('neworder', {to: 'detailpagecontent',data:{tabindex:this.params._tabindex,order:curorder}});


$});

Router.route('/homedetail/myorders/:_tabindex/:_id', function () {

    this.layout('indexdetailpagelayout',{data: {title: '我的订单',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});

    // if(this.params._id == "0"){
    //     this.render('tabheader0', {to: 'tabheader',data:{tabindex:this.params._tabindex}});
    //     this.render('allorders', {to: 'orderscontent',data:{tabindex:this.params._tabindex}});
    // }
    // else if(this.params._id == "1"){
    //     this.render('tabheader1', {to: 'tabheader',data:{tabindex:this.params._tabindex}});
    //     this.render('alltobedeliveryorders', {to: 'orderscontent',data:{tabindex:this.params._tabindex}});
    // }
    // else  if(this.params._id == "2"){
    //     this.render('tabheader2', {to: 'tabheader',data:{tabindex:this.params._tabindex}});
    //     this.render('allclosedorders', {to: 'orderscontent',data:{tabindex:this.params._tabindex}});
    // }
    this.render('myorders', {to: 'detailpagecontent',data:{tabindex:this.params._tabindex}});

    var id = this.params._id; // "5"
    Session.set("curtab",id);
});

//我的优惠券
Router.route('/homedetail/mycoupons/:_tabindex', function () {

    this.layout('indexdetailpagelayout',{data: {title: '我的优惠券',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
    this.render('mycoupons', {to: 'detailpagecontent'});

});


Router.route('/homedetail/orderinfo/:_tabindex/:_id', function () {
  //订单详情
   this.layout('indexdetailpagelayout',{data: {title: '订单详情',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
   curorder = Orders.findOne({_id:this.params._id});
   this.render('orderproduct', {data:{tabindex:this.params._tabindex,order:curorder}});
   this.render('orderinfo', {to: 'detailpagecontent',data:{tabindex:this.params._tabindex,order:curorder}});
   var id = this.params._id; // "5"
   Session.set("curtab",id);
});


Router.route('/homedetail/salespromotions/:_tabindex', function () {
    this.layout('indexdetailpagelayout',{data: {title: '促销活动',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
    var salespromotions = [];
    SalesPromotions.find().forEach(function(sp){
        console.log("促销活动(get one):" + EJSON.stringify(sp));
        salespromotions.push(sp);
    });
    console.log("促销活动:" + EJSON.stringify(salespromotions));
    this.render('salespromotions', {to: 'detailpagecontent',data:{salespromotions:salespromotions}});
},{name: 'salespromotions'});



Router.route('/homedetail/orderquery/:_tabindex', function () {
    this.layout('indexdetailpagelayout',{data: {title: '用气查询',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
    this.render('orderquery', {to: 'detailpagecontent'});
});

Router.route('/homedetail/wdhb/:_tabindex', function () {

    this.layout('indexdetailpagelayout',{data: {title: '我的红包',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
    this.render('wdhb', {to: 'detailpagecontent'});
});

Router.route('/homedetail/yhq/:_tabindex', function () {

     this.layout('indexdetailpagelayout',{data: {title: '优惠券',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
     this.render('yhq', {to: 'detailpagecontent'});
});

Router.route('/profile/useraddress', function () {
    this.layout('indexdetailpagelayout',{data: {title: '地址',returnurl:'/tabhome/1',returnhome:'/tabhome/1'}});
    this.render('useraddress', {to: 'detailpagecontent'});
});

Router.route('/profile/adduseraddress', function () {
    this.layout('indexdetailpagelayout',{data: {title: '地址',returnurl:'/profile/useraddress',returnhome:'/tabhome/1'}});
    this.render('adduseraddress', {to: 'detailpagecontent'});
});

Router.route('/bz', function () {
    this.layout('indexdetailpagelayout',{data: {title: '使用帮助',returnurl:'/tabhome/2',returnhome:'/tabhome/2'}});
    this.render('bz', {to: 'detailpagecontent'});
});

Router.route('/logout', function () {
    Meteor.logout();
    this.redirect('/profile');
});


Router.route('/homedetail/getredpackage/:_tabindex', function () {
    var tabindex = this.params._tabindex;
    this.layout('indexdetailpagelayout',{data: {title: '我的红包',returnurl:'/tabhome/'+tabindex,returnhome:'/tabhome/'+tabindex}});
    this.render('getredpackage', {to: 'detailpagecontent'});


});
// Router.route('/homedetail/getredpackage/:_tabindex', function () {
//     var tabindex = this.params._tabindex;
//     this.layout('indexdetailpagelayout',{data: {title: '我的红包',returnurl:'/tabhome/'+tabindex,returnhome:'/tabhome/'+tabindex}});
//     this.render('getredpackage',{
//         data:function(){
//             return { to: 'detailpagecontent',data:function(){
//                 Meteor.call('showsystemredpackage',function(err,result){
//                 var isavaliable = false;
//                 if(result){
//                     isavaliable = true;
//                     console.log("红包显示页："+EJSON.stringify(result));
//                 }
//                 var data = {
//                     isavaliable:isavaliable,
//                     redpackage:result,
//                 }
//                 return data;
//             };
//         });
//        }
//     });

// });

Router.route('/homedetail/myredpackages/:_tabindex', function () {
        this.layout('indexdetailpagelayout',{data: {title: '我的红包',returnurl:'/tabhome/'+this.params._tabindex,returnhome:'/tabhome/'+this.params._tabindex}});
        this.render('myredpackages', {to: 'detailpagecontent'});
});

Router.onBeforeAction(function() {
  if (! Meteor.user()) {
    console.log("onBeforeAction not login");
    this.redirect("/signIn");
    this.next();
  }
  else {
    console.log("onBeforeAction login");
    if(Roles.userIsInRole(Meteor.user(), ['user'])){
        console.log("onBeforeAction is user");
        this.next();
    }
    else{
      console.log("onBeforeAction is not user");
      this.redirect("/signIn");
      this.next();
    }
  }
},{
  except:['salespromotions','register','forgetpassword']
});
