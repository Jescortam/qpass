const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	curp: {
		type: String,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	phoneNumber: {
		type: Number,
	},
	address: {
		type: String,
	},
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	card: {
		type: Schema.Types.ObjectId,
		ref: 'Card',
	},
});

module.exports = mongoose.model('User', userSchema);
