const express = require('express');
const router = express.Router();
const gets = require('../controllers/getsController');
const posts = require('../controllers/postController');
const tele = require('../controllers/telemetriaController');
const poly = require('../controllers/polylinhaController')

/* GET home page. */
router.get('/', gets.getAll);
router.post('/', posts.getAll);
router.post('/telemetria', tele.getAll);
router.post('/polylinha', poly.getPoly);

module.exports = router;
