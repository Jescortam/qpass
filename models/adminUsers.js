const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminUserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	isBusiness: {
		type: Boolean,
		required: true,
	},
	cards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Card',
		},
	],
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	vehicles: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Vehicle',
		},
	],
});

adminUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AdminUser', adminUserSchema);
