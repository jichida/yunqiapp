Template.orderquery.events({
    "click #btnqueryorders": function () {
      console.log("click btn btnqueryorders");
      event.preventDefault();
      var queryorderid =  $('#queryorderid').val();
      var queryorderdate =  $('#queryorderdate').val();
      var query = {};
      if(queryorderid != ''){
      //  query = {_id:"/.*" + queryorderid +  ".*/"};
        query = {_id: {'$regex': queryorderid}};
      }
      if(queryorderdate != ''){
        var startdate = moment(queryorderdate,'YYYY/MM/DD').format('YYYY-MM-DD');
        var enddate = moment(queryorderdate,'YYYY/MM/DD').add({days:1}).format('YYYY-MM-DD');
        query = _.extend(query,{
          createtime:{
            $gte:startdate,
            $lt:enddate,
          }
        });
      }
      console.log("querydate:" + EJSON.stringify(query));
      var queryorderresultlistsession = [];
      var orderlistdb = Orders.find(query) ;
      orderlistdb.forEach(function(orderdb){
           queryorderresultlistsession.push(orderdb);
      });
      console.log("queryorderresultlistsession:"+EJSON.stringify(queryorderresultlistsession));
      Session.set('queryorderresultlistsession',queryorderresultlistsession);
    }
});

  Template.orderquery.helpers({
      'queryorderresults':function(){
          var queryorderresultlistsession = Session.get("queryorderresultlistsession");
          if(queryorderresultlistsession == null){
              queryorderresultlistsession = [];
          }
         console.log("queryorderresults:"+EJSON.stringify(queryorderresultlistsession));
         return queryorderresultlistsession;
      },
 });

 Template.orderquery.onCreated(function () {
  console.log("Template.orderquery.onCreated");
  Session.set('queryorderresultlistsession',[]);
});

 Template.orderquery.onDestroyed(function () {
  console.log("Template.orderquery.onDestroyed");
  Session.set('queryorderresultlistsession',[]);
});

Template.orderquery.rendered = function() {
    $('#queryorderdate').pickadate();
}
