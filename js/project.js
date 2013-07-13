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
            calculatePercentage(result.funding_received, result.funding_needed))
      if (result.image != ''){
        $('#imgpage img').attr('src', result.image);
        $('#imgpage img').attr('width', '800px');
        $('#imgpage img').attr('height', '100px');
      }
      $.each(result.tags, function(i, val){
        console.log(val);
        $('.tags').append('<div class="tag">' + val + '</div>')
      });
  });
}
fillData();

$(function() {
  var $button = $('#share_in_twitter');
  $button.on('click', function(event){
    var $this = $(this);
    $this.button('loading');

    var postTweet = function(user) {
      var hash = $this.attr('data-hash');
      var url = window.location + "?ref=" + user.screen_name;
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

  var $pay = $('#pay');
  $pay.on('click', function() {
    $pay.button('loading');
    var refMatch = window.location.toString().match(/ref=(\w+)/);
    var referer;
    if(refMatch) {
      referer = refMatch[1];
      $('#referer').text(referer);
    }
    $('#payModal').modal('show');
  });

  $('#completePayment').on('click', function(){
    $('#payModal').modal('hide');
    var $progress = $('progress');
    var v = parseInt($progress.val());
    $progress.val(v + 30);
    $progress.fadeOut('slow').fadeIn('slow');
    $pay.button('reset').text('Payment Complete!');
    $('#points').text('1 point');
  })

});