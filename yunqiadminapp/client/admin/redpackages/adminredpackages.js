Template.adminredpackages.events({

    "click #btnsetinavaliable": function () {
        Meteor.call("setredpackageavaliable",this._id,false);

    },
    "click #btnsetavaliable": function () {
 //setproductavaliable
       Meteor.call("setredpackageavaliable",this._id,true);
    },
 });

Template.adminredpackages.onRendered(function () {
	// $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(5).addClass('sel');
});
