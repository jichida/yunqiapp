Template.getredpackage.events({
    "click .btn_getredpackage": function () {
        var currentUserId = Meteor.userId(); 
        var packageid = this.redpackage._id;
        console.log("packageid:" + packageid);
        Meteor.call('getsystemredpackage', currentUserId,packageid);
    
    },    
  });