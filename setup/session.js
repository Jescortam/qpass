const session = require('express-session');

module.exports = store => {
	return session({
		name: 'session',
		store,
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 3600000 * 24,
		},
	});
};
