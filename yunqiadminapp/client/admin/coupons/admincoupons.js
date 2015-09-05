Template.admincoupons.events({

    "click #btnsetinavaliable": function () {
        Meteor.call("setcouponavaliable",this._id,false);

    },
    "click #btnsetavaliable": function () {
 //setproductavaliable
       Meteor.call("setcouponavaliable",this._id,true);
    },
 });


Template.admincoupons.onRendered(function () {
	// $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(4).addClass('sel');
});
