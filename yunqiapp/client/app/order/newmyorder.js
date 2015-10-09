function ClassNewOrderData() {
  this.curnewpagename = new ReactiveVar('selectproduct');
  this.productlistsession = new ReactiveVar([]);
  this.usecouponid = new ReactiveVar('');
  this.useredpackageid = new ReactiveVar('');
  this.useaddressid = new ReactiveVar(Meteor.user().profile.defaultaddressid);
  this.neworderdoc = {
    createuser:'',
    contactname:'',
    contacttel:'',
    deliveryaddress:'',
    yunqimemo:'',
    wanttime:'',
    paytype:'',
    paytypestring:'',
    orderstatus:'',
    orderstatusstring:'',
    orderamount:0,
    createtime:'',
    orderproductlists:[]
  };
}

ClassNewOrderData.prototype.getCurrentpagename = function () {
  return this.curnewpagename.get();
}


Template.newmyorder.created = function () {
  this.newOrderDataInstance = new ClassNewOrderData();
}

Template.newmyorder.helpers({
  'iscurpagename':function(curpagename){
    return  Template.instance().newOrderDataInstance.curnewpagename.get() == curpagename;
  },
  'getNewOrderDataInstance': function () {
    return Template.instance().newOrderDataInstance;
  },

});

Template.newmyorder.events({
    'click #btnreturn':function(){
      var curpagename = Template.instance().newOrderDataInstance.curnewpagename.get();
      console.log("click return btn:" + curpagename);
      if(curpagename == 'selectproduct'){
        event.preventDefault();
        Router.go(this.returnhome);
      }
      else if(curpagename == 'neworder'){
        Template.instance().newOrderDataInstance.curnewpagename.set('selectproduct');
      }
      else if(curpagename == 'orderselectredpackage'){
        Template.instance().newOrderDataInstance.curnewpagename.set('neworder');
      }
      else if(curpagename == 'orderselectcoupon'){
        Template.instance().newOrderDataInstance.curnewpagename.set('neworder');
      }
      else if(curpagename == 'orderselectaddress'){
        Template.instance().newOrderDataInstance.curnewpagename.set('neworder');
      }
    },
});
