const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const AdminUser = require('../models/adminUsers');

router.get('/inicio', isLoggedIn, async (req, res) => {
	const adminUser = await AdminUser.findById(req.user);
	res.render('dashboard', { adminUser });
});

router.get('/', (req, res) => {
	if (req.user) {
		return res.redirect('/inicio');
	}
	res.render('index');
});

router.all('*', (req, res) => {
	console.log(req.user);
	res.render('404');
});

module.exports = router;
