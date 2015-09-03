Template.adminsalespromotions.events({
   
    "click #btnsetinavaliable": function () {
        Meteor.call("setsalespromotionavaliable",this._id,false);
    
    },    
    "click #btnsetavaliable": function () {
 //setproductavaliable
       Meteor.call("setsalespromotionavaliable",this._id,true);
    },   
 });
 
Template.adminsalespromotions.onRendered(function () {
	// $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(3).addClass('sel');
});