Twitter = (function(){
  var cb = new Codebird;
  cb.setConsumerKey("JmIfhkHF8JW3ocUyPoledw", "GhSaR24vvHW3j8z7S5EMhMvj0BUOnYB4GhkoZbFAs");

  var _user;

  var public_fnc = {
    user: function(callback) {
      callback = callback || function(){};
      if(_user) {
        callback(_user);
      } else if($.cookie('Twitter.user')) {
        _user = JSON.parse($.cookie('Twitter.user'));
        callback(_user);
      } else if(this.authorized) {
        var self = this;
        this.verify(function(reply){
          _user = reply;
          $.cookie('Twitter.user', JSON.stringify(reply));
          callback(_user);
        });
      }
    },

    tweet: function(message, callback) {
      cb.__call(
          "statuses_update",
          {"status": message},
          function (reply) {
            console.log(reply);
            if(callback) {
              callback(reply);
            }
          }
      );
    },

    auth: function() {
      cb.__call(
          "oauth_requestToken",
          {oauth_callback: "oob"},
          function (reply) {
            console.log(reply);
            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call(
                "oauth_authorize",
                {},
                function (auth_url) {
                  window.codebird_auth = window.open(auth_url);
                }
            );
          }
      );
    },

    pin: function(pinNumber) {
      if(pinNumber == "") {
        return false;
      }
      var self = this;
      cb.__call(
          "oauth_accessToken",
          {oauth_verifier: pinNumber},
          function (reply) {
            console.log(reply);
            // store the authenticated token, which may be different from the request token (!)
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            $.cookie('oauth_token', reply.oauth_token);
            $.cookie('oauth_token_secret', reply.oauth_token_secret);
            self.authorized = true;
            self.user(self._setUser);
          }
      );
    },

    verify: function(callback) {
      cb.__call(
          "account_verifyCredentials",
          {},
          function (reply) {
            console.log(reply);
            if(callback) {
              callback(reply);
            }
          }
      );
    },
    _setUser: function(user) {
      var url = user.profile_image_url;
      $('#user_profile_img').html("<img src='" + url + "'>");
      $('#login').hide();
    }
  };

  var token = $.cookie('oauth_token');
  var secret = $.cookie('oauth_token_secret');
  public_fnc.authorized = false;
  if(token && secret) {
    cb.setToken(token, secret);
    public_fnc.authorized = true;
  }

  public_fnc.user(public_fnc._setUser);

  return public_fnc;
})();

$(function(){
  $('#login').on('click', function(){
    Twitter.auth();
    $('#myModal').modal('show');
  });
  $('#pinSubmit').on('click', function(){
    var pin = $('#pin_number').val();
    Twitter.pin(pin);
    $('#myModal').modal('hide');
  })
});