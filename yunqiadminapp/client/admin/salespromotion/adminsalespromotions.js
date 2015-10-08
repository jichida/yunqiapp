Template.adminsalespromotions.helpers({
  'salespromotions':function(){
    var salespromotions = [];
    SalesPromotions.find().forEach(function(sp){
        var imagesp = Images.findOne(sp.imageid);
        console.log("image:" + EJSON.stringify(imagesp));
        sp = _.extend(sp,{imagesp:imagesp});
        salespromotions.push(sp);
    });
    return salespromotions;
  },
  // 'imagesp:':function(){
  //   var imagesp = Images.findOne(this.imageid);
  //   console.log("imagesp:" + EJSON.stringify(imagesp));
  //   return imagesp;
  // }
})

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
