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
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
	    type: 'GET',
	    dataType: "JSON",
	    data: '?criteria= '+ criteria,
	    success: function( data ) {

		    return data.results;
		}
	});
}