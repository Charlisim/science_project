$(function() {
  var $button = $('#share_in_twitter');
  $button.on('click', function(event){
    var $this = $(this);
    $this.button('loading');

    var postTweet = function(user) {
      var hash = $this.attr('data-hash');
      var url = window.location + "?ref" + hash + "&user=" + user.id;
      var tweet = "Help me fund this project! " + url;
      Twitter.tweet(tweet, function(reply){
        $this.button('reset');
        if(reply.httpstatus == 200) {
          $this.text('Tweeted!!');
        } else {
          $this.text('Error! :(');
        }
      });
    };

    Twitter.user(function(user){
      postTweet(user);
    });
  });
});