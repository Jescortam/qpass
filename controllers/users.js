const User = require('../models/users');
const Card = require('../models/cards');
const AdminUser = require('../models/adminUsers');
const mongoose = require('mongoose');

module.exports.index = async (req, res) => {
	const users = await User.find({ admin: req.user });
	res.render('users/index', { users });
};

module.exports.getCreate = async (req, res) => {
	const availableCards = await Card.find({ user: null });
	res.render('users/new', { availableCards });
};

module.exports.create = async (req, res) => {
	let { card: cardId, firstName, lastName, curp, email } = req.body.user;
	if (await User.findOne({ email })) {
		req.flash('error', 'ERROR: El correo ingresado se encuentra en uso');
		res.redirect('/usuarios/nuevo');
	}
	const user = new User(req.body.user);
	user.firstName = firstName.toUpperCase();
	user.lastName = lastName.toUpperCase();
	user.curp = curp.toUpperCase();
	user.admin = req.user;

	if (cardId) {
		cardId = mongoose.Types.ObjectId(cardId);
		card = await Card.findById(cardId);
		user.card = card;
		card.user = user._id;
		await card.save();
	} else {
		user.card = null;
	}

	const adminUser = await AdminUser.findById(req.user._id);
	adminUser.users.push(user);
	await user.save();
	await adminUser.save();
	req.flash('success', 'Creación exitosa del usuario.');
	res.redirect('/usuarios');
};

module.exports.update = async (req, res) => {
	console.log(req.body);
	const user = await User.findByIdAndUpdate(req.params.id, req.body.user, {
		new: true,
		runValidators: true,
	});
	await user.save();
	req.flash('success', 'Actualización exitosa del usuario.');
	res.redirect('/usuarios');
};

module.exports.delete = async (req, res) => {
	await AdminUser.findByIdAndUpdate(req.user._id, {
		$pull: { users: req.params.id },
	});
	await User.findByIdAndDelete(req.params.id);
	req.flash('success', 'Eliminación exitosa del usuario.');
	res.redirect('/usuarios');
};
