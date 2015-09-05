Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',

});
//管理端首页
Router.route('/admin', function () {
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminorders', {to: 'admincontent'});
});

//发布产品
Router.route('/admin/addproduct', function () {
  console.log("admin addproduct html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminproductadd', {to: 'admincontent'});
 // this.render('adminproductadd');
 });


 //发布红包
 Router.route('/admin/addredpackage', function () {
  console.log("admin addredpackage html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addredpackage', {to: 'admincontent'});
 //  this.render('addredpackage');
 });
   //修改红包
  Router.route('/admin/updateredpackage/:id', function () {
  console.log("admin updateredpackage html,id:" + this.params.id);
  var curredpackage = SystemRedPackages.findOne({_id:this.params.id});
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updateredpackage', {to: 'admincontent',data:{curredpackage:curredpackage}});

 });

 //红包详情
  Router.route('/admin/redpackage/:id', function () {
  console.log("admin redpackage html,id:" + this.params.id);
  var curredpackage =  SystemRedPackages.findOne({_id:this.params.id});
   console.log("红包详情:" + EJSON.stringify(curredpackage));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('redpackageinfo', {to: 'admincontent',data:{curredpackage:curredpackage}});
 //  this.render('redpackageinfo',{data:{curredpackage:curredpackage}});
 });
 //发布促销
 Router.route('/admin/addsalespromotion', function () {
  console.log("admin addsalespromotion html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  var products = [];
  Products.find({isavaliable:true}).forEach(function (pd) {
    products.push(pd);
  });
  this.render('addsalespromotion', {to: 'admincontent',data:{products:products}});
 // this.render('addsalespromotion');
 });
 //修改促销
  Router.route('/admin/updatesalespromotion/:id', function () {
  console.log("admin updatesalespromotion html");
  var products = [];
    Products.find({isavaliable:true}).forEach(function (pd) {
    products.push(pd);
  });
  var cursalespromotion = SalesPromotions.findOne({_id:this.params.id});
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updatesalespromotion', {to: 'admincontent',data:{products:products,cursalespromotion:cursalespromotion}});
  });


 //新增优惠券
 Router.route('/admin/addcoupon', function () {
  console.log("admin addcoupon html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addcoupon', {to: 'admincontent'});
 //  this.render('addcoupon');
 });

  //修改优惠券
  Router.route('/admin/updatecoupon/:id', function () {
  console.log("admin updatecoupon html");
  var curcoupon = Coupons.findOne({_id:this.params.id});
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updatecoupon', {to: 'admincontent',data:{curcoupon:curcoupon}});

 });



 //用户详情
  Router.route('/admin/adminuserinfo/:id', function () {
  console.log("admin adminuserinfo html");
  // this.render('addcoupon');
  var curuser =  Meteor.users.findOne({_id:this.params.id});
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminuserinfo', {to: 'admincontent'});
 // this.render('adminuserinfo',{data:{curuser:curuser}});
 });

 //订单详情
Router.route('/admin/adminorderinfo/:_id', function () {
  console.log("admin adminorderinfo html");
  // this.render('addcoupon');
  var curorder =  Orders.findOne({_id:this.params.id});
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminorderinfo', {to: 'admincontent'});
 //  this.render('adminorderinfo',{data:{curorder:curorder}});
 });

 //修改产品
 Router.route('/admin/updateproduct/:id', function () {
  console.log("admin updateproduct html");
  curproduct = Products.findOne({_id:this.params.id});

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminproductupdate', {to: 'admincontent',data:{curproduct:curproduct}});
 // this.render('adminproductupdate',{data:{curproduct:curproduct}});
 });

//产品列表页面
Router.route('/admin/navproducts', function () {
    console.log("admin navproducts html");

    var products = [];
    Products.find().forEach(function(pd){
        products.push(pd);
    });
    console.log("展示产品:" + EJSON.stringify(products));

   this.layout('adminmainlayout');
   this.render('adminnavbar', {to: 'adminnavbar'});
   this.render('adminproducts', {to: 'admincontent',data:{products:products}});
});
//订单列表页面
Router.route('/admin/navorders', function () {
  console.log("admin navorders html");

    var orders = [];
    Orders.find().forEach(function(pd){
        orders.push(pd);
    });
    console.log("展示订单:" + EJSON.stringify(orders));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminorders', {to: 'admincontent',data:{orders:orders}});
});
//用户列表页面
Router.route('/admin/navusers', function () {
  console.log("admin navusers html");
  var users = [];
  Meteor.users.find().forEach(function(ur){
      users.push(ur);
  });
  console.log("展示用户:" + EJSON.stringify(users));
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminusers', {to: 'admincontent',data:{users:users}});
});
//促销活动列表页面
Router.route('/admin/navsalespromotions', function () {
  var salespromotions = [];
  SalesPromotions.find().forEach(function(sp){
      salespromotions.push(sp);
  });
  console.log("展示促销活动:" + EJSON.stringify(salespromotions));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminsalespromotions', {to: 'admincontent',data:{salespromotions:salespromotions}});
});
//优惠券列表页面
Router.route('/admin/navcoupons', function () {
  var coupons = [];
  Coupons.find().forEach(function(cn){
      coupons.push(cn);
  });
  console.log("展示优惠券:" + EJSON.stringify(coupons));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('admincoupons', {to: 'admincontent',data:{coupons:coupons}});
});
//红包列表页面
Router.route('/admin/navredpackages', function () {

  var redpackages = [];
  SystemRedPackages.find().forEach(function(rk){
      redpackages.push(rk);
  });
  console.log("展示红包:" + EJSON.stringify(redpackages));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('adminredpackages', {to: 'admincontent',data:{redpackages:redpackages}});
});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('login');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {
  only: ['admin']
  // or except: ['routeOne', 'routeTwo']
});
