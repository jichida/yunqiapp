Template.adduseraddress.events({
  'submit form': function(event) {
     event.preventDefault();
	   var address= $('#address').val();
	   var contactname= $('#contactname').val();
	   var contacttel= $('#contacttel').val();
     var addressDoc ={
       addressid:Random.id(),
       address:address,
       contactname:contactname,
       contacttel:contacttel,
       isdefault:false
     }
     Meteor.call('insertAddress', addressDoc);
     
     console.log("address doc:"+EJSON.stringify(addressDoc));
     Router.go("/profile/useraddress");
  },
	
});