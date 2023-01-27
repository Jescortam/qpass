const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
	licensePlate: {
		type: String,
		required: true,
		unique: true,
	},
	make: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	card: {
		type: Schema.Types.ObjectId,
		ref: 'Card',
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'AdminUser',
	},
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
