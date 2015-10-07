
Template.orderselectcoupon.events({
    'click #btnselcoupon':function(){
      //  this.curnewpagename.set('newmyorder');
       console.log("btnselcoupon:this" + EJSON.stringify(this));
        this.usecouponid.set(this.usermoneyid);
        this.curnewpagename.set('neworder');
    },
  });

Template.orderselectcoupon.helpers({
  'mylistcoupon':function(){
    var couponlist = globalgetmycoupon('allisvalid');
    var self=this;
    couponlist = _.map(couponlist,function(p){
      return _.extend(p,{
        curnewpagename:self.curnewpagename,
        usecouponid:self.usecouponid});
    });
    console.log("mylistcoupon=====》" + EJSON.stringify(couponlist));
    return couponlist;
  }
});
