const Card = require('../models/cards');
const User = require('../models/users');
const Vehicle = require('../models/vehicles');
const AdminUser = require('../models/adminUsers');
const mongoose = require('mongoose');

module.exports.index = async (req, res) => {
	const cards = await Card.find({ owner: req.user });
	res.render('cards/index', { cards });
};

module.exports.getCreate = async (req, res) => {
	const card = {
		bank: 'BANORTE',
		name: '',
		number: Math.floor(Math.random() * (1e17 - 1e16) + 1e16)
			.toString()
			.match(/\d{4}/g)
			.join(' '),
		expiry: `${new Date().getMonth() + 1}/${
			parseInt(new Date().getFullYear().toString().slice(-2)) + 3
		}`,
		cvv: Math.floor(Math.random() * 1000),
	};
	const availableUsers = await User.find({ card: null });
	const availableVehicles = await Vehicle.find({ card: null });
	res.render('cards/new', { card, availableUsers, availableVehicles });
};

module.exports.create = async (req, res) => {
	let { user: userId, vehicle: vehicleId, name, number } = req.body.card;
	const card = new Card(req.body.card);
	card.name = name.toUpperCase();
	card.number = number.replace(/\s/g, '');
	card.money = 0.0;
	card.active = true;
	card.owner = req.user;

	if (userId) {
		userId = mongoose.Types.ObjectId(userId);
		user = await User.findById(userId);
		card.user = user;
		user.card = card._id;
		await user.save();
	} else {
		card.user = null;
	}

	if (vehicleId) {
		vehicleId = mongoose.Types.ObjectId(vehicleId);
		vehicle = await Vehicle.findById(vehicleId);
		card.vehicle = vehicle ? vehicle : null;
		vehicle.card = card._id;
		await vehicle.save();
	} else {
		card.vehicle = null;
	}

	const adminUser = await AdminUser.findById(req.user._id);
	adminUser.cards.push(card);
	await adminUser.save();

	await card.save();
	req.flash('success', 'Creación exitosa de tarjeta.');
	res.redirect('/tarjetas');
};

module.exports.update = async (req, res) => {
	const card = await Card.findById(req.params.id);
	card.name = req.body.name;
	card.pin = req.body.pin;
	await card.save();
	req.flash('success', 'Actualización exitosa de tarjeta.');
	res.redirect('/tarjetas');
};

module.exports.toggleActive = async (req, res) => {
	const card = await Card.findById(req.params.id);
	card.active = !card.active;
	await card.save();
	req.flash('success', 'Actualización exitosa de tarjeta.');
	res.redirect('/tarjetas');
};

module.exports.recharge = async (req, res) => {
	const card = await Card.findById(req.params.id);
	card.money += parseFloat(req.body.amount);
	await card.save();
	req.flash('success', 'Recarga exitosa de tarjeta.');
	res.redirect('/tarjetas');
};

module.exports.delete = async (req, res) => {
	await AdminUser.findByIdAndUpdate(req.user._id, {
		$pull: { cards: req.params.id },
	});
	await Card.findByIdAndDelete(req.params.id);
	req.flash('success', 'Eliminación exitosa de tarjeta.');
	res.redirect('/tarjetas');
};
