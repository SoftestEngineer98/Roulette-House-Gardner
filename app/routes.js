module.exports = function (app, passport, db) {
	// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function (req, res) {
		db.collection('games')
			.find()
			.toArray((err, result) => {
				if (err) return console.log(err);
				console.log(result);
				res.render('roulette.ejs', { game: result });
			});
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function (req, res) {
		db.collection('games')
			.find()
			.toArray((err, result) => {
				if (err) return console.log(err);
				res.render('profile.ejs', {
					// with passport, the user is sent as part of the request
					user: req.user,
					game: result,
				});
			});
	});

	// LOGOUT ================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// message board routes ===============================================================
	// !Only admin may have access to this
	// app.post('/messages', (req, res) => {

	// 	db.collection('games').save(
	// 		{
	// 			name: req.body.name,
	// 			msg: req.body.msg,
	// 			wins: 0,
	// 			losses: 0,
	// 			moneyWon: 0,
	// 			moneyLos: 0,
	// 		},
	// 		(err, result) => {
	// 			if (err) return console.log(err);
	// 			console.log('saved to database');
	// 			res.redirect('/profile');
	// 		}
	// 	);
	// });

	app.put('/game', (req, res) => {
		let random = Math.ceil(Math.random() * 37);
		console.log(random);
		console.log(req.body.betColor);
		if (random === 1 && req.body.betColor === 'green') {
			db.collection('games').findOneAndUpdate(
				{},
				{
					$inc: {
						revenue: -(req.body.amount * 35),
						losses: 1,
						moneyLost: req.body.amount,
					},
				},
				{
					sort: { _id: -1 },
				},
				(err, result) => {
					if (err) return res.send(err);
					result = { winCheck: 'bigWinner' };
					console.log(result);
					res.send(result);
				}
			);
		} else if (
			(random >= 2 && random <= 19 && req.body.betColor === 'black') ||
			(random > 19 && req.body.betColor === 'red')
		) {
			db.collection('games').findOneAndUpdate(
				{},
				{
					$inc: {
						revenue: -(req.body.amount * 2),
						losses: 1,
						moneyLost: req.body.amount,
					},
				},
				{
					sort: { _id: -1 },
				},
				(err, result) => {
					console.log('winner');
					result = { winCheck: 'winner' };
					console.log(result);
					if (err) return res.send(err);

					res.send(result);
				}
			);
		} else {
			db.collection('games').findOneAndUpdate(
				{},
				{
					$inc: {
						revenue: req.body.amount,
						wins: 1,
						moneyWon: req.body.amount,
					},
				},
				{
					sort: { _id: -1 },
				},
				(err, result) => {
					result = { winCheck: 'loser' };
					console.log(result);
					if (err) return res.send(err);

					res.send(result);
				}
			);
		}
	});

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	// locally --------------------------------
	// LOGIN ===============================
	// show the login form
	app.get('/login', function (req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post(
		'/login',
		passport.authenticate('local-login', {
			successRedirect: '/profile', // redirect to the secure profile section
			failureRedirect: '/login', // redirect back to the signup page if there is an error
			failureFlash: true, // allow flash messages
		})
	);

	// SIGNUP =================================
	// show the signup form
		app.get('/signup', function (req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post(
			'/signup',
			passport.authenticate('local-signup', {
				successRedirect: '/profile', // redirect to the secure profile section
				failureRedirect: '/signup', // redirect back to the signup page if there is an error
				failureFlash: true, // allow flash messages
			})
		);
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/');
}
