var hash = window.location.hash.substring(1);
if (hash.match('&')){
	console.log(hash.substring(0, hash.indexOf('&')));
}

