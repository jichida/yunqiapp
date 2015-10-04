Template.orderselectredpackage.events({
    'click #btnselredpackage':function(){
        console.log("btnselredpackage:this" + EJSON.stringify(this));
        this.curnewpagename.set('newmyorder');
    },
  });

  Template.orderselectredpackage.helpers({
    'mylistredpackage':function(){
      var redpackagelist = globalgetmyredpackage('allisvalid');
      var self=this;
      redpackagelist = _.map(redpackagelist,function(p){
        return _.extend(p,{curnewpagename:self.curnewpagename});
      });
      return redpackagelist;
    }
  });
