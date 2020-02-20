const models = require('../models/animalModel');

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
        await models.update(id, data);
    },

    read: async (id) => {
        let animal = await models.findById(id);
        return getAnimalDTO(animal);
    }
};