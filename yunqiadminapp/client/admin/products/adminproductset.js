Template.adminproductadd.events({  
    'click .btnaddproduct': function(event, template) {
       console.log("click btn add product");
       event.preventDefault();
	   var productname= $('#productname').val();
	   var productprice= $('#productprice').val();
	   var stockqty= $('#stockqty').val();
       var isavaliable = $("#isavaliable").is(':checked');
       var productDoc = {
            productname:productname,
            productprice:productprice,
            stockqty:stockqty,
            createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
            isavaliable:isavaliable
       }
       console.log("insert product:" + EJSON.stringify(productDoc));
       Meteor.call("insertProduct",productDoc);
      // Products.insert(productDoc);
       Router.go("/admin/navproducts");
     }

});


Template.adminproductupdate.events({
    'click .btnupdateproduct': function(event, template) {
       console.log("click btn update product");
       event.preventDefault();
	   var productname= $('#productname').val();
	   var productprice= $('#productprice').val();
	   var stockqty= $('#stockqty').val();
       var isavaliable = $("#isavaliable").is(':checked');

       var productDoc = {
            productname:productname,
            productprice:productprice,
            stockqty:stockqty,
            createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
            isavaliable:isavaliable
       }
       Meteor.call("updateProduct",this.curproduct._id,productDoc);
      // Products.insert(productDoc);
       Router.go("/admin/navproducts");
     }

});
