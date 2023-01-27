const MongoStore = require('connect-mongo');

const store = new MongoStore({
	mongoUrl: process.env.DB_URL,
	secret: process.env.SESSION_SECRET,
	touchAfter: 24 * 3600,
});

store.on('error', e => {
	console.log('SESSION STORE ERROR', e);
});

module.exports = store;
