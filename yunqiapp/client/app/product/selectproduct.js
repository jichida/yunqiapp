
function isproductinsalespromotions(productdoc){
  var isspecialproductdiscount = false;
  var isbuyonefreeone = false;
  var title1 = '';
  var title2 = '';
  var cursp = {};

  var query = {specialproductid:productdoc._id,isavaliable:true};
  SalesPromotions.find(query).forEach(function(sp){
    if(sp.typevalue == '201'){
      cursp = sp;
      isspecialproductdiscount = true;
      title1 = sp.title;
    }
    else if(sp.typevalue == '202'){
      cursp = sp;
      isbuyonefreeone = true;
      title2 = sp.title;
    }
  });
  var result ={
    isspecialproductdiscount:isspecialproductdiscount,
    isbuyonefreeone:isbuyonefreeone,
    title1:title1,
    title2:title2,
    cursp:cursp
  };
  console.log("result:"+EJSON.stringify(result)+",productdoc:"+productdoc._id);
  return result;
}

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

Template.oneproduct.onCreated(function () {
   Session.set('currentprice',{});
});
Template.oneproduct.helpers({
  'isproductinsalespromotions':function(){
      return isproductinsalespromotions(this);
  },
  'currentprice':function(template){
      var obj1 = Session.get('currentprice');
      var obj = {};
      if(obj1){
        var cur = "{\"" + this._id + "\":\"aaa\"}";
        console.log("cur json:" + cur);
            var obj2 = EJSON.parse(cur);
        console.log("obj2:" + EJSON.stringify(obj2));
            obj = _.extend(obj1, obj2);
      }
      console.log("current currentprice:" + EJSON.stringify(obj));
      return obj[this._id];
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

            var pid = this._id;
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

            var currentpricetitle = '';
            var doc = isproductinsalespromotions(this);
            if(doc.isspecialproductdiscount){
              currentpricetitle = "￥" + qty*this.productprice*doc.cursp*specialdiscount;
            }
            else if(doc.isbuyonefreeone){
              if(qty % 2 == 0){
                currentpricetitle = "￥" + qty*this.productprice*doc.cursp*0.5;
              }
              else{
                currentpricetitle = "￥" + qty*this.productprice*doc.cursp-(qty-1)*this.productprice*doc.cursp*0.5;
              }
            }
            else{
              currentpricetitle = "￥" + qty*this.productprice;
            }
            var obj1 = Session.get('currentprice');
            if(obj1){
              var cur = "{\"" + pid + "\":\"" + currentpricetitle + "\"}";
              console.log("cur json:" + cur);
              var obj2 = EJSON.parse(cur)
              var obj = _.extend(obj1, obj2);
              console.log("click dec,current:" + EJSON.stringify(obj));
              Session.set('currentprice',obj);
            }
            else{
              console.log("why here...???");
            }

        },
        'click .inc':function(event,template){
            //产品+1
            var productlistret = [];
            var productlistsession = Session.get("productlistsession");
            if(productlistsession == null){
                productlistsession = [];
            }

            var pid = this._id;
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

            var currentpricetitle = '';
            var doc = isproductinsalespromotions(this);
            if(doc.isspecialproductdiscount){
              currentpricetitle = "￥" + qty*this.productprice*doc.cursp*specialdiscount;
            }
            else if(doc.isbuyonefreeone){
              if(qty % 2 == 0){
                currentpricetitle = "￥" + qty*this.productprice*doc.cursp*0.5;
              }
              else{
                currentpricetitle = "￥" + qty*this.productprice*doc.cursp-(qty-1)*this.productprice*doc.cursp*0.5;
              }
            }
            else{
              currentpricetitle = "￥" + qty*this.productprice;
            }
            var obj1 = Session.get('currentprice');
            if(obj1){
              var cur = "{\"" + pid + "\":\"" + currentpricetitle + "\"}";
              console.log("cur json:" + cur);
              var obj2 = EJSON.parse(cur)
              var obj = _.extend(obj1, obj2);
              console.log("click inc,current:" + EJSON.stringify(obj));
              Session.set('currentprice',obj);
            }
            else{
              console.log("why here...???");
            }
        },
    });
