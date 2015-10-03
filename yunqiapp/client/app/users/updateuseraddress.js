Template.updateuseraddress.events({
  'click #btnupdateaddress': function(event) {
     event.preventDefault();
	   var address= $('#address').val();
	   var contactname= $('#contactname').val();
	   var contacttel= $('#contacttel').val();
     var addressDoc ={
       address:address,
       contactname:contactname,
       contacttel:contacttel,
     }
     Meteor.call('updateAddress',this._id, addressDoc);

     console.log("address doc:"+EJSON.stringify(addressDoc));
     Router.go("/profile/useraddress");
  },

});
