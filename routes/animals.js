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
 * Retorna os dados do animal referente ao id recebido
 * 
 * @param {String} id
 */
router.get('/:id', (req, res) => controller.read(req, res));

/** 
 * Cria um animal
 * 
 * @param {String} id
 * @param {String} name
 * @param {String} type
 * @param {Number} age
 * @param {Number} weight
 */
router.post('', (req, res) => controller.create(req, res));

/** 
 * Atualiza os dados do animal referente ao id recebido
 * 
 * @param {String} id
 * @param {String} name
 * @param {String} type
 * @param {Number} age
 * @param {Number} weight
 */
router.put('/:id', (req, res) => controller.update(req, res));

app.use('/v1/animals', router);

/**
 * Caso a rota requisitada não exista
 */
app.use((req, res) => res.status(404).json({ msg: "Rota não encontrada!" }));

module.exports = app;
