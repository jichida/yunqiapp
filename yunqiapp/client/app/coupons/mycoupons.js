var curTab = new ReactiveVar(0);

Template.mycoupons.events({
  'click #tabone1':function(){
  //  event.preventDefault();
    $('#tabone2').removeClass('active');
    $('#tabone3').removeClass('active');
    $('#tabone1').addClass('active');
    curTab.set(0);
    console.log("click tab1");
  },
  'click #tabone2':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('active');
    $('#tabone3').removeClass('active');
    $('#tabone2').addClass('active');
    curTab.set(1);
    console.log("click tab2");
  },
  'click #tabone3':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('active');
    $('#tabone2').removeClass('active');
    $('#tabone3').addClass('active');
    curTab.set(2);
    console.log("click tab3");
  },

});


Template.mycoupons.helpers({
      'mycoupons': function () {
          var mycoupons = [];
          var queryString = '';
          if(curTab.get() == 0){//未使用
            queryString = 'allisvalid';
          }
          else if(curTab.get() == 1){//已使用
            queryString = 'usedinorder';
          }
          else if(curTab.get() == 2){//已过期
            queryString = 'allinvalid';
          }

          return globalgetmycoupon(queryString);
      },
});
