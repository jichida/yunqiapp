Template.myredpackages.helpers({
      'myredpackages': function () {
          var myredpackages = [];
          UserMoney.find({userid:Meteor.userId(),moneytype:'redpackage'}).forEach(
            function(usermoney){
              var redpackage = SystemRedPackages.findOne(usermoney.moneyid);
              var rp = _.extend(redpackage,{
                status:usermoney.status,
                orderid:usermoney.orderid,
              });
              myredpackages.push(rp);
            }
          )
          return myredpackages;
      },
});
