

if(Meteor.isClient){
    
    Template.producttype.events({  
    'click #btnfinish': function(event, template) {
        // 1. Collect the username and password from the form
       // var username = template.find('#login-username').value,
       //     password = template.find('#login-password').value;
       //删除为0的选项  
       var tabindex = template.find('.tabindex').value;  
        
        Router.go("/homedetail/neworder/" + tabindex);
    }
    
    });
    
   Template.product.events({  
        'click .deC':function(event,template){
            var productlistret = [];
            var productlistsession = Session.get("productlistsession");
            if(productlistsession == null){
                productlistsession = [];
            }
             
            var pid = template.find('.pid').value;
            var qty = parseInt(template.find('.qty').value,10);
            if(qty > 0){
                qty = qty - 1;
                for( j in  productlistsession){
                    if (productlistsession[j]._id != pid){
                        productlistret.push(productlistsession[j]);
                        
                    }
                };
                var curproduct = Products.findOne({_id:pid});
                if(qty > 0){
                    curproduct.qty = qty;
                    productlistret.push(curproduct);
                }
                Session.set("productlistsession", productlistret);
            }
        },
        'click .inC':function(event,template){
            var productlistret = [];
            var productlistsession = Session.get("productlistsession");
            if(productlistsession == null){
                productlistsession = [];
            }
             
            var pid = template.find('.pid').value;
            var qty = parseInt(template.find('.qty').value,10);
            if(qty >= 0){
                qty = qty + 1;
                for( j in  productlistsession){
                    if (productlistsession[j]._id != pid){
                        productlistret.push(productlistsession[j]);
                        //console.log("curproduct qty:"+productlistsession[j].qty + "name:"+productlistsession[j].productname);
                    }
                };
                var curproduct = Products.findOne({_id:pid});
                if(qty > 0){
                    curproduct.qty = qty;
                   // console.log("curproduct qty:"+curproduct.qty + "name:"+curproduct.productname);
                    productlistret.push(curproduct);
                }
                Session.set("productlistsession", productlistret);
            }
        },
    });
    
   
  
    Template.producttype.helpers({
          'sessionorderamount':function(){
          var productlistsession = Session.get("productlistsession");
           var amount = 0;
          
          if(productlistsession != null){
           
              for( j in productlistsession){
                 amount += (productlistsession[j].productprice * productlistsession[j].qty);
             };
          }
          console.log("sessionorderamount:" + amount);  
          return amount;
      
      },
      'products': function () {
          //来自db
          var productlistret = [];
          var productlistdb = Products.find();
          var productlistsession = Session.get("productlistsession");
          if(productlistsession == null){
             productlistdb.forEach(function(productdb){
               //  console.log("cur products name:" + productdb.productname);  
                 productdb.qty = 0;
               //  console.log("productdb qty:"+productdb.qty);
                 productlistret.push(productdb);
                 //productlistdb.update();
             });
          }
          else{
              productlistdb.forEach(function(productdb){
                 productdb.qty = 0;
                 for(j in productlistsession){
                     if (productlistsession[j]._id == productdb._id){
                         productdb.qty = productlistsession[j].qty;
                    
                        // console.log("cur products name:" + productdb.productname); 
                     }
                 };
                 // console.log("productdb qty:"+productdb.qty);
                 productlistret.push(productdb);
             });
          }
          
        //for test  
        // for (i in productlistret) {
        //     console.log("cur products name qty:"+productlistret[i].qty);
        //     console.log("cur products name:" + productlistret[i].productname); 
        // };
        
        //保持session
        productlistsession = [];
        for( j in  productlistret){
            if (productlistret[j].qty > 0){
                productlistsession.push(productlistret[j]);
                
            }
        };
        Session.set("productlistsession",productlistsession);
  
        return productlistret;
     }
});


}