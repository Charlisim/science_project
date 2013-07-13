function retrieveUsers () {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find',
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    return data.results;
		}
	});
}

function findUserByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/users/_find'+'?criteria='+ JSON.stringify(criteria),
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    return data.results;
		}
	});
}

function createUser(userData) {
	$.ajax({url: urlAPI + databaseSchema + '/users/_insert',
	    type: 'POST',
	    dataType: "JSON",
	    data: 'docs=[' + JSON.stringify(userData) + ']',
	    success: function( data ) {

		    return data.results;		}
	});
}
