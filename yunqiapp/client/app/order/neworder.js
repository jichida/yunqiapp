Template.neworder.events({
    "click #btnsubmit": function () {
      console.log("click btn btnsubmit");
      event.preventDefault();

      var productlistsession = this.productlistsession.get();//Session.get("productlistsession");
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
      console.log("btnuseorderselectredpackage:this" + EJSON.stringify(this));
      this.curnewpagename.set('orderselectredpackage');
    //  Router.go('/orderselectredpackage');
    },
    'click #btnuseorderselectcoupon':function(){
      this.curnewpagename.set('orderselectcoupon');
    //  Router.go('/orderselectcoupon');
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
      var usecoupon = false;
      var useredpackage = false;
      var usecouponid = this.usecouponid.get();
      var useredpackageid = this.useredpackageid.get();
      var coupon = Coupons.findOne(usecouponid);
      var coupontitle = '';
      var redpackagetitle = '';
      if(coupon){
        usecoupon = true;
        coupontitle = coupon.title;
      }

      var redpackage = SystemRedPackages.findOne(useredpackageid);
      if(redpackage){
        useredpackage = true;
        redpackagetitle = redpackage.title;
      }

      var data = {
        usecoupon:usecoupon,
        coupontitle:coupontitle,
        useredpackage:useredpackage,
        redpackagetitle:redpackagetitle,
        usecouponid:usecouponid,
        useredpackageid:useredpackageid,
      };
      console.log("selectordersalepromotion data:" + EJSON.stringify(data));
      return data;
    },
    'getcurrentorderdata':function(){
      var productlistsession = this.productlistsession.get();//Session.get("productlistsession");
      if(productlistsession == null){
          productlistsession = [];
      }
      var amount = 0;
      for( j in productlistsession){
          amount += productlistsession[j].price;
      };
      finalmoney = amount;

      var paymoneylist = [];
      var usecouponid = this.usecouponid.get();
      var useredpackageid = this.useredpackageid.get();
      var coupon = Coupons.findOne(usecouponid);
      if(coupon){
        paymoneylist.push({
          type:'coupon',
          money:coupon.offamount,
          id:usecouponid
        });
        finalmoney = finalmoney - coupon.offamount;
      }
      var redpackage = SystemRedPackages.findOne(useredpackageid);
      if(redpackage){
        paymoneylist.push({
          type:'redpackage',
          money:redpackage.money,
          id:useredpackageid
        });
        finalmoney = finalmoney - redpackage.money;
      }

      var redpackage = SystemRedPackages.findOne(useredpackageid);
      if(redpackage){
        useredpackage = true;
        redpackagetitle = redpackage.title;
      }

      var order = {
        orderproductlists:productlistsession,
        orderamount:amount,
        paymoneylist:paymoneylist,
        finalmoney:finalmoney,
      };
      console.log("order:" + EJSON.stringify(order));
      return {order:order};

    }
  });

Template.neworder.rendered=function() {
    $('#wanttime').pickadate();
}
