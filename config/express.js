const express = require('express');
const glob = require('glob');

const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const session = require('express-session');
const methodOverride = require('method-override');
const Auth0Strategy = require('passport-auth0');




module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(session({
    secret: 'MrHommie',
    resave: false,
    saveUninitialized: false
  }));

  const strategy = new Auth0Strategy(
    {
      domain: 'topicos.auth0.com',
      clientID: '0Lw35thxI_O8RLfCKixOVaqqI-plPufb',
      clientSecret: '0FbyTpYqYi7ZjrGVWPNsWT1-_calSP84fg1LP5Fhm-u9LJlYQ91Le6_IRguCqZvl',
      callbackURL: 'http://localhost:3000/callback'
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  );

  passport.use(strategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  require('../app/controllers/loginController')(passport);

  require('../app/routes')(app,passport);

  require('../app/controllers/signupController');

  require('../app/controllers/configController');



/*  var controllers = glob.sync(config.root + '/app/routes/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });
*/

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
