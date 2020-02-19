const Joi = require('@hapi/joi');
const ApiError = require('../exceptions/ApiError');

module.exports = {
    createAnimal: Joi.object({
        name: Joi.string().min(3).alphanum().required(),

        age: Joi.number().integer().positive().required(),

        weight: Joi.number().positive().required(),

        type: Joi.string().required()
    }).error(errors => {
        const err = errors[0];
        var message = "Atributo inválido!";
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
            case "string.base":
                message = `o atributo ${err.path[0]} precisa ser uma string`;
                break;
            case "string.min":
                message = `o atributo ${err.path[0]} precisa ter no mínimo 3 caracteres`;
                break;
            case "string.alphanum":
                message = `o atributo ${err.path[0]} precisa ser uma string alfanumérica`;
                break;
            default:
                break;
        };
        throw new ApiError(message, 422);
    }),

    updateAnimal: Joi.object({
        name: Joi.string().min(3).alphanum(),

        age: Joi.number().integer().positive(),

        weight: Joi.number().positive(),

        type: Joi.string()
    }).or('name', 'age', 'weight', 'type').error(errors => {
        const err = errors[0];
        var message = "Atributo inválido!";
        switch (err.code) {
            case "object.missing":
                message = "Nenhum atributo informado!";
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
            case "string.base":
                message = `o atributo ${err.path[0]} precisa ser uma string`;
                break;
            case "string.min":
                message = `o atributo ${err.path[0]} precisa ter no mínimo 3 caracteres`;
                break;
            case "string.alphanum":
                message = `o atributo ${err.path[0]} precisa ser uma string alfanumérica`;
                break;
            default:
                break;
        };
        throw new ApiError(message, 422);
    }),
};
