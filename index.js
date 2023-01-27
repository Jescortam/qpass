if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const AdminUser = require('./models/adminUsers');

const adminUserRoutes = require('./routes/adminUsers');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const vehicleRoutes = require('./routes/vehicles');
const miscRoutes = require('./routes/misc');
const mainRoutes = require('./routes/main');

require('./setup/moongose');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const store = require('./setup/mongoStore');

app.use(require('./setup/session')(store));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(AdminUser.authenticate()));
passport.serializeUser(AdminUser.serializeUser());
passport.deserializeUser(AdminUser.deserializeUser());

app.use(require('./setup/locals'));

app.use((req, res, next) => {
	console.log(req.originalUrl);
	next();
});

app.use('/', adminUserRoutes);
app.use('/tarjetas', cardRoutes);
app.use('/usuarios', userRoutes);
app.use('/vehiculos', vehicleRoutes);
app.use('/', miscRoutes);
app.use('/', mainRoutes);

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
	console.log(`Listening on port ${port}`);
});
