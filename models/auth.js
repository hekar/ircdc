"use strict";

const passport = require('../index.js').passport;
const config = require('../config.json');
const co = require('co');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const GithubStrategy = require('passport-github').Strategy
  const port = (config.site.oauth.port !== 80) ?
    port = `:${config.site.oauth.port}` : '';
  passport.use(new GithubStrategy({
    clientID: config.site.oauth.github.clientID,
    clientSecret: config.site.oauth.github.clientSecret,
    callbackURL: config.site.oauth.host + port + '/auth/github/callback'
  },
  function (token, tokenSecret, profile, done) {
    // retrieve user ...
    co(function *(){
      // do some async/yield stuff here to get/set profile data
      done(null, profile);
    }).catch(function onError(e){
      console.error("Something went terribly wrong!");
      console.error(e.stack);
      done(e, null);
    });

  }
));
