//产品是否在促销列表中
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
  //console.log("result:"+EJSON.stringify(result)+",productdoc:"+productdoc._id);
  return result;
}

//在session中更新某个产品和对应的数量
function updateandrecalc(productid,qty){
  var productlistsession = Session.get("productlistsession");
  if(productlistsession == null){
     productlistsession = new Array();
  }
  var curproduct = Products.findOne(productid);
  if(curproduct){
    var isinarray = false;
    var araryindex = 0;
    //开始计算....
    var price;
    var promotionname;
    var promotionid;
    var presult = isproductinsalespromotions(curproduct);
    if(presult.isspecialproductdiscount){
      //指定商品打折
      price = qty*curproduct.productprice;
      if(presult.cursp.specialdiscount){
        price = price*parseFloat(presult.cursp.specialdiscount);
      }
      promotionname = presult.cursp.title;
      promotionid = presult.cursp._id;
    }
    else if(presult.isbuyonefreeone){
      //买一赠一
      if(qty % 2 == 0){
        price =qty*curproduct.productprice*0.5;
      }
      else{
        price = qty*curproduct.productprice-(qty-1)*curproduct.productprice*0.5;
      }
      promotionname = presult.cursp.title;
      promotionid = presult.cursp._id;
    }
    else{
      //无促销
      price = qty*curproduct.productprice
      promotionname = '';
      promotionid = '';
    }

    var sessionproduct = {
      productid:curproduct._id,
      productname:curproduct.productname,
      productprice:curproduct.productprice,
      qty:qty,
      promotionname:promotionname,
      promotionid:promotionid,
      price:price,
    };
    console.log("updateandrecalc:" + EJSON.stringify(sessionproduct));
    //查找已经存在的id
    for( var index = 0 ;index < productlistsession.length;index++){
       var thisproduct = productlistsession[index];
        if(thisproduct.productid == curproduct._id){
            isinarray = true;
            araryindex = index;
        }
    }

    if(isinarray){
      productlistsession.splice(araryindex,1);
    }

    if(qty > 0){
      productlistsession.push(sessionproduct);
    }

    Session.set("productlistsession",productlistsession);
  }

}



Template.selectproduct.helpers({
      'sessionorderamount':function(){
              //订单总金额
          var productlistsession = Session.get("productlistsession");
          var amount = 0;

          if(productlistsession != null){
              for( j in productlistsession){
                 amount += (productlistsession[j].price);
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
                     if (productlistsession[j].productid == productdb._id){
                         productdb.qty = productlistsession[j].qty;
                     }
                 };
                 productlistret.push(productdb);
             });
          }
        console.log("productlist:"+ EJSON.stringify(productlistret));
        return productlistret;
     }
});


Template.oneproduct.helpers({
  'isproductinsalespromotions':function(){
      return isproductinsalespromotions(this);
  },


  'currentprice':function(template){
    var currentprice = 0;
    var orginprice = 0;
    var productlistsession = Session.get("productlistsession");
    if(productlistsession){
      for( var index = 0 ;index < productlistsession.length;index++){
         var thisproduct = productlistsession[index];
         console.log("thisproduct:"+thisproduct.productid + ",price:" + thisproduct.price);
          if(thisproduct.productid == this._id){
              currentprice = thisproduct.price;
              orginprice = thisproduct.productprice*thisproduct.qty;
          }
        }
    }
    console.log("currentid:"+this._id + ",price:" + currentprice);
    var isdiscount = false;
    var priceshow = "￥" + currentprice;
    if(orginprice != currentprice){
      isdiscount = true;
      priceshow = "原价:￥" + orginprice + ",优惠价:￥" + currentprice;
    }
    return {
      isdiscount:isdiscount,
      orginprice:orginprice,
      currentprice:currentprice
    };
  }
});

Template.selectproduct.events({
    'click .btnnext': function(event, template) {
       event.preventDefault();
       var productlistsession = Session.get("productlistsession");
       if(productlistsession){
         if(productlistsession.length == 0){
           alert("请至少选择一种商品");
           return;
         }
       }
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
            var pid = this._id;
            var qty = parseInt(template.find('.qty').value,10);
            if(qty > 0){
                qty = qty - 1;
                updateandrecalc(pid,qty);
            }
        },
        'click .inc':function(event,template){
            //产品+1
            var pid = this._id;
            var qty = parseInt(template.find('.qty').value,10);
            if(qty >= 0){
                qty = qty + 1;
                updateandrecalc(pid,qty);
            }
        },
    });
