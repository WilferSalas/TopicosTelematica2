var signupController = require('./controllers/signupController');
var configController = require('./controllers/configController');
var Controller = require('./controllers/configController');


module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.get('', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.get('/share', isLoggedIn, (req, res) => {
		res.render('shareWithMe', {
			user: req.user
		});
	});
	
	app.get('/routes', isLoggedIn, (req, res) => {
		res.render('myRoutes', {
			user: req.user
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', signupController.create, (req, res) =>{
		message: req.flash('signupMessage');
		user: req.flash(userCreated);
	});


	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});

	app.get('/config', isLoggedIn, (req, res) =>{
		res.render('config' ,{ 
			user: req.user,
			message: ''
		});
	});

	app.post('/config', configController.update, isLoggedIn, (req, res) =>{
		message: req.flash('configMessage');
		user: req.flash(user);
	});

	app.get('/map', (req, res) => {
		res.render('map', {
			message: req.flash('signupMessage')
		});
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
}

