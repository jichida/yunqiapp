Template.registerHelper('getmyredpackage', function(conditiontype){
    return globalgetmyredpackage(conditiontype);
});

Template.registerHelper('getmycoupon', function(conditiontype){
    return globalgetmycoupon(conditiontype);
});

Template.registerHelper('islengthequal', function(a,b){
    return a == b;
});
// Template.registerHelper('isequal',function(a,b){
//   return a == b;
// })
