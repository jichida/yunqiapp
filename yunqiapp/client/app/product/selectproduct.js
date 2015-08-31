Template.selectproduct.helpers({
          'sessionorderamount':function(){
              //订单总金额
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
          //列出所有产品,来自db
          var productlistret = [];
          var productlistdb = Products.find();
          var productlistsession = Session.get("productlistsession");
          if(productlistsession == null){
             productlistdb.forEach(function(productdb){
                 productdb.qty = 0;
                 productlistret.push(productdb);
              });
          }
          else{
              productlistdb.forEach(function(productdb){
                 productdb.qty = 0;
                 for(j in productlistsession){
                     if (productlistsession[j]._id == productdb._id){
                         productdb.qty = productlistsession[j].qty;
                     }
                 };
                 productlistret.push(productdb);
             });
          }
          
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


Template.selectproduct.events({  
    'click .btnnext': function(event, template) {
       event.preventDefault();
       var tabindex = this.tabindex;
       var action  = this.action;
       console.log("tabindex:"+tabindex +",action:" + action);
       ///homedetail/neworder/
       Router.go("/homedetail/neworder/" + tabindex);
    }
    
    });
    
   Template.oneproduct.events({  
        'click .dec':function(event,template){
            //产品减1
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
        'click .inc':function(event,template){
            //产品+1
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
    
   
  
    
