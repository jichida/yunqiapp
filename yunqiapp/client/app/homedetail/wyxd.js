 
    
     Template.wyxd.events({  
        'click #btnfinish': function(event, template) {
            // 1. Collect the username and password from the form
         var deliveryaddress = template.find('#deliveryaddress').value;//送气地址
         var contactname = template.find('#contactname').value;//联系人
         var contacttel   = template.find('#contacttel').value;//联系联系电话人  
         var yunqimemo = template.find('#yunqimemo').value;//备注
         var wanttime = template.find('#wanttime').value;//时间
         var paytypee = template.find('input:radio[name=paytype]:checked');//付款方式
         var paytype = "-1";
         if (paytypee!=null){
             paytype = $(paytypee).val();
         }
         paytypestring = "货到付款";
                //Router.go("/homedetail/wyxd");
         //Router.go("/homedetail/wyxd");
         
        //  console.log("deliveryaddress:" + deliveryaddress);
        // console.log("contactname:" + contactname);
        // console.log("contacttel:" + contacttel);
        // console.log("yunqimemo:" + yunqimemo);
        // console.log("wanttime:" + wanttime);
       // console.log("paytype:" + paytype);
        //  console.log("click finished");
         
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
				createuser:currentUserId,
				contactname:contactname,
				contacttel:contacttel,
				deliveryaddress:deliveryaddress,
				yunqimemo:yunqimemo,
				wanttime:wanttime,
				paytype:paytype,
				paytypestring:paytypestring,
                orderstatus:'neworder',
                orderstatusstring:'待支付',
                orderamount:amount,
                createtime:new Date(),
                orderproductlists:productlistsession
			};
      		Meteor.call('insertOrder', orderData);
            Router.go("/");  
        }
    
    });