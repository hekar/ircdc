"use strict";

const Router = require('koa-router');
const config = require('./config.json');
const main = require('./controllers/main.js');
const logger = require('./lib/logger');
const api = require('./lib/api');
const daemon = require('./lib/daemon');

const routes = new Router();

function bootstrap(app, passport, addons) {

  // routes
  let user = null;

  routes.get('/', function* (){
    if (this.isAuthenticated()) {
      user = this.session.passport.user;
    }

    yield this.render('index', {
      title: config.site.name,
      user: user
    });
  });

  // for passport
  routes.get('/login', function* (){
    if (this.isAuthenticated()) {
      user = this.session.passport.user;
    }
    yield this.render('login', {user: user});
  });

  routes.get('/logout', function* () {
    this.logout();
    this.redirect('/');
  });

  // you can add as many strategies as you want
  routes.get('/auth/github',
    passport.authenticate('github')
  );

  routes.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/account',
      failureRedirect: '/'
    })
  );

  routes.get('/account', main.account);

  app.use(routes.middleware());

  const childAddons = Object.assign({ passport }, addons);

  [api, daemon].forEach((server) => {
    try {
      server.bootstrap(app, routes, childAddons)
    } catch (e) {
      log.error(e, 'Failure to bootstrap server: ', server)
    }
  });
}

module.exports = {
  bootstrap
};
