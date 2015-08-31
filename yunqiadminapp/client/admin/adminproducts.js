Template.adminproducts.events({
    "click .btnmodifyproduct": function () {
 
    
    },    
    "click .btnsetoffline": function () {
 
    
    },    
});
Template.adminproducts.onRendered(function () {
   // $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(0).addClass('sel');

});