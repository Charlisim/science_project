function retrieveProjects () {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    return data.results;
		}
	});
}

function findProjectByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find'+'?criteria='+ JSON.stringify(criteria),
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    return data.results;
		}
	});
}