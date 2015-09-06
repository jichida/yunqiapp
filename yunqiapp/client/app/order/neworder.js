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
          amount += (productlistsession[j].productprice * productlistsession[j].qty);
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
				paytypestring:"paytypestring",
        orderstatus:'neworder',
        orderstatusstring:'待支付',
        orderamount:amount,
        createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
        orderproductlists:productlistsession
			};
   		Meteor.call('insertOrder', orderData);
      Router.go('/profile');
    },
  });
