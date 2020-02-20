const services = require('../services/animals');
const exceptionHandler = require('../exceptions/exceptionHandler');
const validation = require('../services/validation');

module.exports = {
    read: async (req, res) => {
        try {
            let id = req.params['id'];
            services.validateObjectId(id);
            let result = await services.read(id);
            return res.status(200).json(result);
        } catch(e) {
            const error = exceptionHandler(e);
            return res.status(error.status).json({ 
                msg: error.message,
            });
        }
    },

    create: async (req, res) => {
        try {
            let body = req.body;
            await validation.createAnimal.validateAsync(body);
            let result = await services.create(body);
            return res.status(201).json(result);
        } catch(e) {
            const error = exceptionHandler(e);
            return res.status(error.status).json({ 
                msg: error.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            let id = req.params['id'];
            services.validateObjectId(id);
            let body = req.body;
            await validation.updateAnimal.validateAsync(body);
            let result = await services.update(id, body);
            return res.status(200).json(result);
        } catch(e) {
            const error = exceptionHandler(e);
            return res.status(error.status).json({ 
                msg: error.message,
            });
        }
    }
}
