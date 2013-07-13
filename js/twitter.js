Twitter = (function(){
  var cb = new Codebird;
  cb.setConsumerKey("JmIfhkHF8JW3ocUyPoledw", "GhSaR24vvHW3j8z7S5EMhMvj0BUOnYB4GhkoZbFAs");

  var public_fnc = {
    user: null,

    tweet: function(message) {
      cb.__call(
          "statuses_update",
          {"status": message},
          function (reply) {
            console.log(reply);
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

    pin: function() {
      cb.__call(
          "oauth_accessToken",
          {oauth_verifier: document.getElementById("PINFIELD").value},
          function (reply) {
            console.log(reply);
            // store the authenticated token, which may be different from the request token (!)
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            $.cookie('oauth_token', reply.oauth_token);
            $.cookie('oauth_token_secret', reply.oauth_token_secret);

            // if you need to persist the login after page reload,
            // consider storing the token in a cookie or HTML5 local storage
          }
      );
    },

    verify: function() {
      var self = this;
      cb.__call(
          "account_verifyCredentials",
          {},
          function (reply) {
            console.log(reply);
            self.user = reply;
          }
      );
    }
  };

  var token = $.cookie('oauth_token');
  var secret = $.cookie('oauth_token_secret');
  public_fnc.authorized = false;
  if(token && secret) {
    cb.setToken(token, secret);
    public_fnc.authorized = true;
    public_fnc.verify();
  }

  return public_fnc;
})();
