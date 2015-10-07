Template.sendredpackage.events({
    "click #btnsendredpackage": function () {
           console.log("click btn add redpackage");
           event.preventDefault();
           var title= $('#title').val();
           var typestring = $("#coupontype").find("option:selected").text();
           var typevalue = $("#coupontype").val();
           var redpackageid = typevalue;
           Meteor.call('sendredpackage',this.userid,redpackageid);
           Router.go('/admin/adminuserinfo/' + this.userid);
        },
});

Template.sendredpackage.helpers({
    "redpackages": function () {
          var redpackages = [];
          SystemRedPackages.find().forEach(function(cn){
              redpackages.push(cn);
          });
          return redpackages;
        },
});
