const Joi = require('joi');

const userSchema = Joi.object({
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	email: Joi.string().email().trim().required(),
	curp: Joi.string().alphanum().min(18).max(18).trim().required(),
	birthDate: Joi.date().max('now').required(),
	phoneNumber: Joi.string().alphanum().min(10).max(10).required(),
	address: Joi.string().trim().required(),
	card: Joi.string().allow(''),
});

const cardSchema = Joi.object({
	name: Joi.string().trim().required(),
	pin: Joi.string().alphanum().min(3).max(3).trim().required(),
	number: Joi.string(),
	bank: Joi.string(),
	cvv: Joi.string(),
	expiry: Joi.string(),
	user: Joi.string().allow(''),
	vehicle: Joi.string().allow(''),
});

const vehicleSchema = Joi.object({
	make: Joi.string().trim().required(),
	model: Joi.string().trim().required(),
	year: Joi.string().min(4).max(4).trim().required(),
	licensePlate: Joi.string().alphanum().min(7).max(7).trim().required(),
	card: Joi.string().allow(''),
});

const adminUserSchema = Joi.object({
	username: Joi.string().alphanum().trim().required(),
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	email: Joi.string().email().trim().required(),
	password: Joi.string().trim().min(5).required(),
	isBusiness: Joi.string().required(),
});

module.exports = {
	userSchema,
	cardSchema,
	vehicleSchema,
	adminUserSchema,
};
