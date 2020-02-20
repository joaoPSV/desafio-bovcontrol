const models = require('../models/animals');
const ApiError = require('../exceptions/ApiError');
const validation = require('./validation');

const getAnimalDTO = (animalData) => {
    return {
        id: animalData.id,
        name: animalData.name,
        age: animalData.age,
        type: animalData.type,
        weight: animalData.weight,
    };
};

module.exports = {
    create: async (data) => {
        let animal = await models.create(data);
        return getAnimalDTO(animal);
    },

    update: async (id, data) => {
        let animal = await models.update(id, data);
        if (!animal)
            throw new ApiError("Animal não encontrado!", 404);
        return getAnimalDTO(animal);
    },

    read: async (id) => {
        let animal = await models.findById(id);
        if (!animal)
            throw new ApiError("Animal não encontrado!", 404);
        return getAnimalDTO(animal);
    },

    validateObjectId: (id) => {
        if (!validation.objectId(id))
            throw new ApiError("Id inválido!", 422);
    }
};