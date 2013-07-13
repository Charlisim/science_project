function retrieveProjects () {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
	    type: 'GET',
	    dataType: "JSONP",
	    success: function( data ) {

		    var projectNames = [];

		    $.each( data.results, function( i, result ) {
		        var projectNameString = "<p>" + result.name + "</p>"
		        projectNames.push(projectNameString);
		    });

		    $("projectList").append(projectNames);
		}
	});
}

function findProjectByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
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