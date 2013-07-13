function getProjectIdByAnchor(){
  var hash = window.location.hash.substring(1);
if (hash.match('&')){
  hash = hash.substring(0, hash.indexOf('&'));
}
return hash;
}


function calculatePercentage(actual, needed){
  return (100 * actual) / needed;
};

function fillData(){
  var id = parseInt(getProjectIdByAnchor());
  console.log(id);
  var result  = findProjectByCriteria({"_id": id}, function(results){
      result = results[0];
      console.log(result)
      $('#project').text(result.name);
      $('#description').text(result.description);
      $('progress').attr('value', 
            calculatePercentage(result.funding_recieved, result.funding_needed))
  });
  
}
fillData();
$(function() {
  var $button = $('#share_in_twitter');
  $button.on('click', function(event){
    var $this = $(this);
    $this.button('loading');

    var postTweet = function() {
      var hash = $this.attr('data-hash');
      var tweet = "I like this project! http://localhost:8080/project.html?ref=" + hash + "&user=" + Twitter.user.id;
      Twitter.tweet(tweet, function(reply){
        $this.button('reset');
        if(reply.httpstatus == 200) {
          $this.text('Tweeted!!');
        } else {
          $this.text('Error! :(');
        }
      });
    };

    if(Twitter.user) {
      postTweet();
    } else {
      Twitter.verify(function(reply){
        postTweet();
      });
    }
  });
});