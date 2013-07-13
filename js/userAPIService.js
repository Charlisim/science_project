function retrieveUsers () {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find',
	    type: 'GET',
	    dataType: "JSONP",
	    success: function( data ) {

		    var userNames = [];

		    $.each( data.results, function( i, result ) {
		        var userNameString = "<p>" + result.username + "</p>"
		        userNames.push(userNameString);
		    });
		}
	});
}

function findUserByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find',
	    type: 'GET',
	    dataType: "JSONP",
	    data: '?criteria= '+ criteria,
	    success: function( data ) {

		    var userNames = [];

		    $.each( data.results, function( i, result ) {
		        var userNameString = "<p>" + result.username + "</p>"
		        userNames.push(userNameString);
		    });
		}
	});
}