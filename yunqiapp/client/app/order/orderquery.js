Template.orderquery.events({
    "click #btnqueryorders": function () {
      console.log("click btn btnqueryorders");
      event.preventDefault();     
      var queryorderid =  $('#queryorderid').val();    
      var queryorderdate =  $('#queryorderdate').val(); 
      var queryorderresultlistsession = [];  
      var orderlistdb = Orders.find() ;
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