const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/animals');

const app = express();
const router = express.Router();

router.use(
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
);

/** 
 * Return data from an animal referenced by id requested
 * 
 * @param {String} id (Required)
 */
router.get('/:id', (req, res) => controller.read(req, res));

/** 
 * Create an animal
 * 
 * @param {String} name (Required)
 * @param {String} type (Required)
 * @param {Number} age (Required)
 * @param {Number} weight (Required)
 */
router.post('', (req, res) => controller.create(req, res));

/** 
 * Update data from an animal referenced by id requested
 * 
 * @param {String} id (Required)
 * @param {String} name 
 * @param {String} type
 * @param {Number} age
 * @param {Number} weight
 */
router.put('/:id', (req, res) => controller.update(req, res));

app.use('/v1/animals', router);

/**
 * IF route not exists
 */
app.use((req, res) => res.status(404).json({ msg: "Rota não encontrada!" }));

module.exports = app;
