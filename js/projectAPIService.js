function retrieveProjects () {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
	    type: 'GET',
	    dataType: "JSON",
	    success: function( data ) {

		    var projectNames = [];

		    $.each( data.results, function( i, result ) {
		        var projectNameString = "<p>" + result.name + "</p>"
		        console.log(projectNameString);
		        projectNames.push(projectNameString);
		    });

		    $("projectList").append(projectNames);
		}
	});
}

function findProjectByCriteria(criteria) {
	$.ajax({url: urlAPI + databaseSchema + '/projects/_find',
	    type: 'GET',
	    dataType: "JSON",
	    data: '?criteria= '+ criteria,
	    success: function( data ) {

		    var userNames = [];

		    $.each( data.results, function( i, result ) {
		        var userNameString = "<p>" + result.username + "</p>"
		        console.log(projectNameString);
		        userNames.push(userNameString);
		    });
		}
	});
}