var signupController = require('./controllers/signupController');
var configController = require('./controllers/configController');
var Controller = require('./controllers/configController');
const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const passport = require('passport');
const router = express.Router();
const env = {
  AUTH0_CLIENT_ID: '0Lw35thxI_O8RLfCKixOVaqqI-plPufb',
  AUTH0_DOMAIN: 'topicos.auth0.com',
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};

module.exports = (app, passport) => {
	// Perform the final stage of authentication and redirect to '/user'
	app.get('/callback',passport.authenticate('auth0', {
	    failureRedirect: '/'
	  }),
	  function(req, res) {
	    res.redirect(req.session.returnTo || '/profile');
			// res.redirect('/profile');
	  }
	);

	app.get('/',passport.authenticate('auth0', {
		clientID: env.AUTH0_CLIENT_ID,
		domain: env.AUTH0_DOMAIN,
		redirectUri: env.AUTH0_CALLBACK_URL,
		audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
		responseType: 'code',
		scope: 'openid profile'
	}),
	(req, res) => {
		res.redirect('/login');
	});

	app.get('',	passport.authenticate('auth0', {
		clientID: env.AUTH0_CLIENT_ID,
		domain: env.AUTH0_DOMAIN,
		redirectUri: env.AUTH0_CALLBACK_URL,
		audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
		responseType: 'code',
		scope: 'openid profile'
	}),
	(req, res) => {
		res.redirect('/login');
	});

	app.get('/login',passport.authenticate('auth0', {
		clientID: env.AUTH0_CLIENT_ID,
		domain: env.AUTH0_DOMAIN,
		redirectUri: env.AUTH0_CALLBACK_URL,
		audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
		responseType: 'code',
		scope: 'openid profile'
	}),
	(req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.get('/share', ensureLoggedIn, (req, res) => {
		res.render('shareWithMe', {
			user: req.user
		});
	});

	app.get('/routes', ensureLoggedIn, (req, res) => {
		res.render('myRoutes', {
			user: req.user
		});
	});


	app.post('/signup',passport.authenticate('auth0', {
		clientID: env.AUTH0_CLIENT_ID,
		domain: env.AUTH0_DOMAIN,
		redirectUri: env.AUTH0_CALLBACK_URL,
		audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
		responseType: 'code',
		scope: 'openid profile'
	}));


	app.get('/profile',ensureLoggedIn,(req, res) => {
		res.render('profile', {
				user : req.user,
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});

	app.get('/config', ensureLoggedIn, (req, res) =>{
		res.render('config' ,{
			user: req.user,
			message: ''
		 });
	});

	app.post('/config', configController.update, ensureLoggedIn, (req, res) =>{
		message: req.flash('configMessage');
		 user: req.flash(user);
	});

	app.get('/map', (req, res) => {
		res.render('map', {
			message: req.flash('signupMessage')
		});
	});
};
