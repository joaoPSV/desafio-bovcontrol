const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const ApiError = require('../exceptions/ApiError');

const formatException = (errors) => {
    var messages = [];
    var message;
    for(err of errors) {
        switch (err.code) {
            case "object.missing":
                message = "Nenhum atributo informado!";
                break;
            case "any.required":
                message = `O atributo ${err.path[0]} é obrigatório`;
                break;
            case "object.unknown":
                message = `O atributo ${err.path[0]} não é permitido`;
                break;
            case "number.base":
                message = `o atributo ${err.path[0]} precisa ser um número`;
                break;
            case "number.integer":
                message = `o atributo ${err.path[0]} precisa ser um número inteiro`;
                break;
            case "number.positive":
                message = `o atributo ${err.path[0]} precisa ser um número positivo`;
                break;
            case "number.min": 
                message = `o atributo ${err.path[0]} precisa ser um número maior ou igual a 0`;
                break;
            case "string.base":
                message = `o atributo ${err.path[0]} precisa ser uma string`;
                break;
            case "string.min":
                message = `o atributo ${err.path[0]} precisa ter no mínimo 3 caracteres`;
                break;
            case "string.alphanum":
                message = `o atributo ${err.path[0]} precisa ser uma string alfanumérica`;
                break;
            case "string.empty":
                message = `o atributo ${err.path[0]} não pode ser uma string vazia`;
                break;
            default:
                message = 'Não foi possível identificar o erro';
                break;
        };
        messages.push(message);
    }
    throw new ApiError(messages, 422);
}

module.exports = {
    createAnimal: Joi.object({
        name: Joi.string().min(3).alphanum().required(),

        age: Joi.number().integer().min(0).required(),

        weight: Joi.number().positive().required(),

        type: Joi.string().required()
    }).error(errors => formatException(errors)),

    updateAnimal: Joi.object({
        name: Joi.string().min(3).alphanum(),

        age: Joi.number().integer().positive(),

        weight: Joi.number().positive(),

        type: Joi.string()
    }).or('name', 'age', 'weight', 'type')
        .error(errors => formatException(errors)),

    objectId: (id) => mongoose.Types.ObjectId.isValid(id),
};
