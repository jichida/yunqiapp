	if(Meteor.isServer){
		Meteor.methods({
			'insertProduct': function(productData){
				//var currentUserId = Meteor.userId();
				Products.insert(productData);
			},
			
			'updateProduct':function(id,productData){
				Products.update(id, {$set:productData});
			}
		});
	};