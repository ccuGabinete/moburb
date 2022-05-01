const express = require('express');
const router = express.Router();
const tele = require('../controllers/telemetriaController');
const poly = require('../controllers/polylinhaController');

router.post('/telemetria', tele.getAll);
router.post('/polylinha', poly.getPoly);

module.exports = router;
