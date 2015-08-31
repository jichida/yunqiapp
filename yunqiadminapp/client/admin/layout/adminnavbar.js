Template.adminnavbar.onRendered(function () {
   // $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
});

Template.adminnavbar.helpers({
  navlists: function () {
    var navlists = [
        {
          navurl:'/admin/navproducts',
          navico:'glyphicon glyphicon-tower',
          navtitle:'产品管理'            
        },
        {
          navurl:'/admin/navorders',
          navico:'glyphicon glyphicon-th-list',
          navtitle:'订单管理'            
        },
        {
          navurl:'/admin/navusers',
          navico:'glyphicon glyphicon-user',
          navtitle:'用户管理'            
        },
        {
          navurl:'/admin/navsalespromotions',
          navico:'glyphicon glyphicon-tag',
          navtitle:'促销管理'            
        },
        {
          navurl:'/admin/navcoupons',
          navico:'jcd_icon jcd_icon_offsell',
          navtitle:'优惠券管理'            
        },
        {
          navurl:'/admin/navredpackages',
          navico:'jcd_icon jcd_icon_bonus',
          navtitle:'红包管理'            
        },
    ];
    return navlists;
  }
});