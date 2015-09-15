Template.profile.helpers({
  'truename':function(){
     console.log("log:" + EJSON.stringify(Meteor.user()));
     return Meteor.user().profile.truename;
  }
});
