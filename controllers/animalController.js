const express = require('express');
const bodyParser = require('body-parser');

const services = require('../services/animalService');
const validation = require('../services/validation');
const exceptionHandler = require('../exceptions/exceptionHandler');

const controller = express();

controller.use(
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
);

/** 
 * Retorna os dados do animal referente ao id recebido
 * 
 * @param {String} id
 */
controller.get('/v1/animals/:id', async (req, res) => {
    try {
        let id = req.params['id'];
        let result = await services.read(id);
        return res.status(200).json({ 
            msg: 'Returned',
            data: result, 
        });
    } catch(e) {
        const error = exceptionHandler(e);
        return res.status(error.status).json({ 
            msg: error.message,
        });
    }
});

/** 
 * Cria um animal
 * 
 * @param {String} id
 * @param {String} name
 * @param {String} type
 * @param {Number} age
 * @param {Number} weight
 */
controller.post('/v1/animals', async (req, res) => {
    try {
        let body = req.body;
        await validation.createAnimal.validateAsync(body);
        let result = await services.create(body);
        return res.status(200).json({ 
            msg: 'Created',
            data: result, 
        });
    } catch(e) {
        const error = exceptionHandler(e);
        return res.status(error.status).json({ 
            msg: error.message,
        });
    }
});

/** 
 * Atualiza os dados do animal referente ao id recebido
 * 
 * @param {String} id
 * @param {String} name
 * @param {String} type
 * @param {Number} age
 * @param {Number} weight
 */
controller.put('/v1/animals/:id', async (req, res) => {
    try {
        let id = req.params['id'];
        let body = req.body;
        await validation.updateAnimal.validateAsync(body);
        await services.update(id, body);
        return res.status(200).json({ 
            msg: 'Updated',
            data: {}, 
        });
    } catch(e) {
        const error = exceptionHandler(e);
        return res.status(error.status).json({ 
            msg: error.message,
        });
    }
});

module.exports = controller;
