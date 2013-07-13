$.ajax({url: 'http://10.71.199.207:27080/science_project/users/_find',
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

$.ajax({url: 'http://10.71.199.207:27080/science_project/projects/_find',
    type: 'GET',
    dataType: "JSONP",
    success: function( data ) {

	    var projecNames = [];

	    $.each( data.results, function( i, result ) {
	        var projectNameString = "<p>" + result.username + "</p>"
	        projectNames.push(projectNameString);
	    });

	    $("projectList").append(projectNames);
	}
});
