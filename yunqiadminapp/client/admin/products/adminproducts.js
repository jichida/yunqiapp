Template.adminproducts.events({

    "click #btnsetinavaliable": function () {
        Meteor.call("setproductavaliable",this._id,false);

    },
    "click #btnsetavaliable": function () {
 //setproductavaliable
       Meteor.call("setproductavaliable",this._id,true);
    },
 });
Template.adminproducts.onRendered(function () {
   // $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
    $('.jcd_admin_sidebar li a').removeClass('sel');
    $('.jcd_admin_sidebar li a').eq(0).addClass('sel');

});
