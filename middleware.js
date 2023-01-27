const { findById } = require('./models/adminUsers');
const AdminUser = require('./models/adminUsers');
const { adminUserSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'ERROR: Debes iniciar sesión primero.');
		return res.redirect('/login');
	}
	next();
};

module.exports.isBusiness = async (req, res, next) => {
	const adminUser = await AdminUser.findById(req.user._id);
	if (!adminUser.isBusiness) {
		req.flash('error', 'ERROR: La cuenta en uso no es empresarial.');
		return res.redirect('/inicio');
	}
	next();
};

module.exports.validateId = Model => {
	return async (req, res, next) => {
		await Model.findById(req.params.id).catch(err => {
			req.flash('error', 'ERROR: No se encontró el elemento.');
			return res.redirect('/inicio');
		});
		next();
	};
};

module.exports.isAuthor = Model => {
	return async (req, res, next) => {
		const { id } = req.params;
		const doc = await Model.findById(id);
		const author = doc.owner || doc.admin;
		if (!author.equals(req.user._id)) {
			req.flash(
				'error',
				'ERROR: No cuentas con la autorización para realizar esa acción.'
			);
			return res.redirect(`/inicio`);
		}
		next();
	};
};

module.exports.validateBody = schema => {
	return (req, res, next) => {
		console.log(req.body);
		const requestBody =
			req.body.adminUser || req.body.card || req.body.user || req.body.vehicle;
		const { error } = schema.validate(requestBody);
		if (error) {
			const errMsg = error.details.map(err => err.message).join(',');
			console.log(errMsg);
			req.flash('error', errMsg);
			if (schema === adminUserSchema) {
				return res.redirect('/');
			}
			res.redirect('/inicio');
		} else next();
	};
};
