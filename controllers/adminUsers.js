const AdminUser = require('../models/adminUsers');

module.exports.getSignup = (req, res) => {
	res.render('adminUsers/signup');
};

module.exports.signup = async (req, res, next) => {
	let { username, email, password, firstName, lastName, isBusiness } =
		req.body.adminUser;
	isBusiness = isBusiness === 'true';
	firstName = firstName.toUpperCase();
	lastName = lastName.toUpperCase();
	if (await AdminUser.findOne({ email })) {
		req.flash('error', 'El correo introducido ya se encuentra en uso.');
		res.redirect('/signup');
	}
	if (await AdminUser.findOne({ username })) {
		req.flash('error', 'El nombre de usuario ya se encuentra en uso.');
		res.redirect('/signup');
	}
	const adminUser = new AdminUser({
		username,
		email,
		firstName,
		lastName,
		isBusiness,
	});
	const registAdminUser = await AdminUser.register(adminUser, password);
	req.login(registAdminUser, err => {
		if (err) console.log(err);
		req.flash('success', `Bienvenido, ${firstName}.`);
		res.redirect('/');
	});
};

module.exports.getLogin = (req, res) => {
	res.render('adminUsers/login');
};

module.exports.login = async (req, res) => {
	const redirectUrl = req.session.returnTo || '/inicio';
	delete req.session.returnTo;
	req.flash('success', `Bienvenido, ${req.user.firstName}.`);
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	const firstName = req.user.firstName;
	req.logout(err => {
		if (err) {
			return next(err);
		}
		req.flash('success', `Adiós, ${firstName}.`);
		res.redirect('/');
	});
};
