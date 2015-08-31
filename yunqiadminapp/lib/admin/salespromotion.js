if(Meteor.isServer){
		Meteor.methods({
			'insertSalespromotion': function(salespromotionDoc){
				//var currentUserId = Meteor.userId();
				SalesPromotions.insert(salespromotionDoc);
			},
			
			'updateSalespromotion':function(id,salespromotionDoc){
				SalesPromotions.update(id, {$set:salespromotionDoc});
			}
		});
	};