const express = require('express');
const router = express.Router();

const { validateBody } = require('../middleware');
const { adminUserSchema } = require('../schemas');
const passport = require('passport');
const adminUserController = require('../controllers/adminUsers');

router
	.route('/signup')
	.get(adminUserController.getSignup)
	.post(validateBody(adminUserSchema), adminUserController.signup);

router
	.route('/login')
	.get(adminUserController.getLogin)
	.post(
		passport.authenticate('local', {
			failureRedirect: '/login',
			failureFlash: true,
			successFlash: true,
		}),
		adminUserController.login
	);

router.get('/logout', adminUserController.logout);

module.exports = router;
