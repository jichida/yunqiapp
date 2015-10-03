Template.neworder.events({
    "click #btnsubmit": function () {
      console.log("click btn btnsubmit");
      event.preventDefault();

      var productlistsession = Session.get("productlistsession");
      if(productlistsession == null){
          productlistsession = [];
      }
      var amount = 0;
      for( j in productlistsession){
          amount += productlistsession[j].price;
      };
			var currentUserId = Meteor.userId();
			var orderData = {
        orderno:Random.id([8]),
				createuser:currentUserId,
				contactname:$('#contactname').val(),
				contacttel:$('#contacttel').val(),
				deliveryaddress:$('#deliveryaddress').val(),
				yunqimemo:$('#yunqimemo').val(),
				wanttime:$('#wanttime').val(),
				paytype:$('#paytype').val(),
				paytypestring:"货到付款",
        orderstatus:'neworder',
        orderstatusstring:'待支付',
        orderamount:amount,
        createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
        orderproductlists:productlistsession
			};
   		Meteor.call('insertOrder', orderData);
      Router.go('/profile');
    },
    'click #btnuseorderselectredpackage':function(){
      Router.go('/orderselectredpackage');
    },
    'click #btnuseorderselectcoupon':function(){
      Router.go('/orderselectcoupon');
    },
    'click #btnusemyaddress':function(){
      console.log('click btnuse my address');
       var contactname = '';
       var contacttel='';
       var address ='';
       if(Meteor.user().profile.defaultaddressid){
          curaddress = UserAddress.findOne(Meteor.user().profile.defaultaddressid);
       }
       else{
         curaddress = UserAddress.findOne();
       }
       if(curaddress){
         contactname = curaddress.contactname;
         contacttel = curaddress.contacttel;
         address = curaddress.address;
       }
       $('#contactname').val(contactname);
       $('#contacttel').val(contacttel);
       $('#deliveryaddress').val(address);
    }
  });

  ﻿Template.neworder.helpers({
    'selectordersalepromotion':function(){
      var selectordersalepromotion = Session.get("selectordersalepromotion");
      if(selectordersalepromotion == null){
        selectordersalepromotion = {
          useredpackage:false,
          usecoupon:false
        };
      }
      return selectordersalepromotion;
    }
  });

Template.neworder.rendered=function() {
    $('#wanttime').pickadate();
}
