Meteor.methods({
        'showsystemredpackage':function(){
            var redpackagetoshow = {_id:"0"};
            var cursysredpackagelist = SystemRedPackages.find();
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
            cursysredpackagelist.forEach(function (redpackage) {
               if(redpackage.starttime <= curtime && redpackage.endtime >=  curtime){
                      redpackagetoshow =  redpackage;
               }
            });    
            console.log("redpackagetoshow:" + EJSON.stringify(redpackagetoshow));
            return redpackagetoshow;
        },
        'createsystemredpackage': function(redpackage){
        //系统管理员生成一个红包
             console.log("redpackage:" + EJSON.stringify(redpackage));
             SystemRedPackages.insert(redpackage);
        },
         'isusercangetpackage':function(userid,systemredpackageid){
         //该用户是否可以抢红包
         // console.log("isusercangetpackage,userid:" + userid + ",systemredpackageid:"+ systemredpackageid );
             var info = ""
             var isavaliable = true;
             cursystempackage = SystemRedPackages.findOne({_id:systemredpackageid});
             console.log("cursystempackage:" + EJSON.stringify(cursystempackage));
             if (cursystempackage){
                  if(cursystempackage.leftcount > 0){
                        if(cursystempackage.detail){
                                for( i in cursystempackage.detail){
                                        if(cursystempackage.detail[i].userid == userid){
                                                isavaliable = false;
                                                info = "已经抢过该红包";
                                                break;
                                        }
                                }
                        }
                  }
                  else{//无可用个数
                      info = "已经抢光啦";
                      isavaliable = false;    
                  }
             }
             var retdata =  {
                     info:info,
                     isavaliable:isavaliable
             };
             console.log("retdata:" + EJSON.stringify(retdata));
             return retdata;
        },
        'getsystemredpackage':function(userid,systemredpackageid){
        //用户抢红包
             Meteor.call('isusercangetpackage',userid, systemredpackageid,
                     function (error, result){ //判断用户是否可以抢红包
                          console.log("判断用户是否可以抢红包:" + EJSON.stringify(result) + ",error:"+ EJSON.stringify(error) );
                          if(!error && result.isavaliable){//如果可以
                                cursystempackage = SystemRedPackages.findOne({_id:systemredpackageid});
                                if (cursystempackage){
                                      var myredpackages =  {
                                              title:cursystempackage.title,
                                              systemredpackageid:cursystempackage._id,
                                              money:cursystempackage.money,
                                              createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
                                              avaliablemoney:cursystempackage.money,
                                              frozenmoney:0    
                                      };//生成一个用户红包
                                      //将红包放入用户账户
                                      //to do
                                      Meteor.call('addredpackagetouser',userid,myredpackages);
                                      //更新系统红包
                                      cursystempackage.leftcount--;//个数减1
                                      var detailpackage = {
                                          userid:userid,
                                          createtime:myredpackages.createtime,
                                          money:myredpackages.money
                                      }
                                      var details = [];
                                      if(cursystempackage.details){
                                           details =  cursystempackage.details; 
                                      }
                                      details.push(detailpackage);
                                      console.log("cursystempackage:" + EJSON.stringify(cursystempackage));
                                      //更新
                                      SystemRedPackages.update(cursystempackage._id,{$set:
                                               {detail: details,
                                               leftcount:cursystempackage.leftcount}});
                                }
                          }
                });

        },
       
        'addredpackagetouser':function(userid,myredpackage){
              console.log("myredpackages:" + EJSON.stringify(myredpackage));
             
                var myredpackages = [];
                var usr = Meteor.users.findOne(userid);
                if (usr) {
                        if(usr.myredpackages){
                        myredpackages = usr.myredpackages;
                }	          
              }
              myredpackages.push(myredpackage);
              Meteor.users.update(userid, {$set: {myredpackages: myredpackages}});
        },
 
    
});