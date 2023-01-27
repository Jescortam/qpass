const express = require('express');
const router = express.Router();

const {
	isLoggedIn,
	validateId,
	isAuthor,
	validateBody,
} = require('../middleware');
const { cardSchema } = require('../schemas');
const Card = require('../models/cards');
const cardController = require('../controllers/cards');

router
	.route('/')
	.get(isLoggedIn, cardController.index)
	.post(isLoggedIn, validateBody(cardSchema), cardController.create);

router.get('/nueva', isLoggedIn, cardController.getCreate);

router
	.route('/:id')
	.put(
		isLoggedIn,
		validateId(Card),
		isAuthor(Card),
		validateBody(cardSchema),
		cardController.update
	)
	.delete(isLoggedIn, validateId(Card), isAuthor(Card), cardController.delete);

router.put(
	'/:id/toggle-active',
	isLoggedIn,
	validateId(Card),
	isAuthor(Card),
	cardController.toggleActive
);

router.put(
	'/:id/recharge',
	isLoggedIn,
	validateId(Card),
	isAuthor(Card),
	cardController.recharge
);

module.exports = router;
