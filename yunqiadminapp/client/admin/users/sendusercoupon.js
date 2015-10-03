Template.sendusercoupon.events({
    "click #btnsendcoupon": function () {
           console.log("click btn add redpackage");
           event.preventDefault();
           var title= $('#title').val();
           var typestring = $("#coupontype").find("option:selected").text();
           var typevalue = $("#coupontype").val();
           var couponid = typevalue;
           Meteor.call('sendusercoupon',this.userid,couponid);
           Router.go('/admin/adminuserinfo/' + this.userid);
        },
});

Template.sendusercoupon.helpers({
    "coupons": function () {
          var coupons = [];
          Coupons.find().forEach(function(cn){
              coupons.push(cn);
          });
          return coupons;
        },
});
