Template.orderselectaddress.helpers({
    'addresslist':function(){
      var addresslist = [];
      var self = this;
      UserAddress.find({userid:Meteor.userId()}).forEach(function(address){
        var add = _.extend({useaddressid:self.useaddressid,curnewpagename:self.curnewpagename},address);
        addresslist.push(add);
      });
      console.log("---->" + EJSON.stringify(addresslist));
      return addresslist;
    },
  });

  Template.orderselectaddress.events({
      'click #btnseladdress':function(){
        //  this.curnewpagename.set('newmyorder');
          this.useaddressid.set(this._id);
          this.curnewpagename.set('neworder');
      },
    });
