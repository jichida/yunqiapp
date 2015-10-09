Template.orderselectredpackage.events({
    'click #btnselredpackage':function(){
        this.useredpackageid.set(this.usermoneyid);
        this.curnewpagename.set('neworder');
    },
  });

  Template.orderselectredpackage.helpers({
    'mylistredpackage':function(){
      var redpackagelist = globalgetmyredpackage('allisvalid');
      var self=this;
      redpackagelist = _.map(redpackagelist,function(p){
        return _.extend(p,{curnewpagename:self.curnewpagename,
        useredpackageid:self.useredpackageid});
      });
      return redpackagelist;
    }
  });
