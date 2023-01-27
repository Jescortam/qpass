const Vehicle = require('../models/vehicles');
const Card = require('../models/cards');
const mongoose = require('mongoose');
const AdminUser = require('../models/adminUsers');

module.exports.index = async (req, res) => {
	const vehicles = await Vehicle.find({ owner: req.user });
	res.render('vehicles/index', { vehicles });
};

module.exports.getCreate = async (req, res) => {
	const availableCards = await Card.find({ vehicle: null });
	res.render('vehicles/new', { availableCards });
};

module.exports.create = async (req, res) => {
	let { card: cardId, licensePlate, model, make } = req.body.vehicle;
	licensePlate = licensePlate.toUpperCase();
	model = model.toUpperCase();
	make = make.toUpperCase();
	if (await Vehicle.findOne({ licensePlate })) {
		req.flash('error', 'ERROR: La matrícula ingresada se encuentra en uso');
		res.redirect('/vehiculos/nuevo');
	}
	const vehicle = new Vehicle(req.body.vehicle);
	vehicle.model = model;
	vehicle.make = make;
	vehicle.licensePlate = licensePlate;
	vehicle.owner = req.user;

	if (cardId) {
		cardId = mongoose.Types.ObjectId(cardId);
		card = await Card.findById(cardId);
		vehicle.card = card;
		card.vehicle = vehicle._id;
		await card.save();
	} else {
		vehicle.card = null;
	}

	const adminUser = await AdminUser.findById(req.user._id);
	adminUser.vehicles.push(vehicle);
	await vehicle.save();
	await adminUser.save();
	req.flash('success', 'Creación exitosa del vehículo.');
	res.redirect('/vehiculos');
};

module.exports.update = async (req, res) => {
	let { licensePlate, model, make } = req.body.vehicle;
	licensePlate = licensePlate.toUpperCase();
	model = model.toUpperCase();
	make = make.toUpperCase();
	const vehicle = await Vehicle.findByIdAndUpdate(
		req.params.id,
		{ licensePlate, model, make },
		{
			new: true,
			runValidators: true,
		}
	);
	await vehicle.save();
	req.flash('success', 'Actualización exitosa del vehículo.');
	res.redirect('/vehiculos');
};

module.exports.delete = async (req, res) => {
	await AdminUser.findByIdAndUpdate(req.user._id, {
		$pull: { vehicles: req.params.id },
	});
	await Vehicle.findByIdAndDelete(req.params.id);
	req.flash('success', 'Eliminación exitosa del vehículo.');
	res.redirect('/vehiculos');
};
