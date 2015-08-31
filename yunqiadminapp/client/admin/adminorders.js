Template.adminorders.events({
    "click .btnmodifyproduct": function () {
 
    
    },    
    "click .btnsetoffline": function () {
 
    
    },

    "click .jdc_admin_changeEMS": function(){
		console.log(this)
    },    
});
Template.adminorders.onRendered(function () {
   // $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(1).addClass('sel');

});