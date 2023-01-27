const express = require('express');
const router = express.Router();

router.get('/informacion-general', (req, res) => {
	res.render('informacion-general');
});

router.get('/preguntas-frecuentes', (req, res) => {
	res.render('preguntas-frecuentes');
});

router.get('/atencion-al-cliente', (req, res) => {
	res.render('atencion-al-cliente');
});

module.exports = router;
