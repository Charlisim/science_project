function retrieveUsers () {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find',
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    var userNames = [];

		    $.each( data.results, function( i, result ) {
		        var userNameString = "<p>" + result.username + "</p>";
		        console.log(userNameString);
		        userNames.push(userNameString);
		    });
		}
	});
}

function findUserByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find',
	    type: 'GET',
	    dataType: "JSON",
	    data: '?criteria= '+ criteria,
	    success: function( data ) {

		    var userNames = [];

		    $.each( data.results, function( i, result ) {
		        var userNameString = "<p>" + result.username + "</p>";
		        console.log(userNameString);
		        userNames.push(userNameString);
		    });
		}
	});
}

function createUser(userData) {
	$.ajax({url: urlAPI + databaseSchema + '/users/_insert',
	    type: 'POST',
	    dataType: "JSON",
	    data: 'docs=[' + JSON.stringify(userData) + ']',
	    success: function( data ) {

		    $.each( data.results, function( i, result ) {
		        console.log(result.ok);
		    });
		}
	});
}
