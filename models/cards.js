const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	number: {
		type: Number,
		required: true,
	},
	bank: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	money: {
		type: Number,
		required: true,
	},
	cvv: {
		type: Number,
		required: true,
	},
	expiry: {
		type: String,
		required: true,
	},
	pin: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	vehicle: {
		type: Schema.Types.ObjectId,
		ref: 'Vehicle',
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'AdminUser',
	},
	active: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Card', cardSchema);
