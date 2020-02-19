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
        try {
            let animal = await models.create(data);
            return getAnimalDTO(animal);
        } catch(e) {
            throw e;
        }
    },

    update: async (id, data) => {
        try {
            await models.update(id, data);
        } catch(e) {
            throw e;
        }
    },

    read: async (id) => {
        try {
            let animal = await models.findById(id);
            return getAnimalDTO(animal);
        } catch(e) {
            throw e;
        }
    }
};