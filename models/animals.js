const mongoose = require('mongoose');

const animalTypes = require('../enums/animalTypes');

const mongoUser = process.env.mongoUser || 'bovtester';
const mongoPass = process.env.mongoPass || 'bovcontrol';

mongoose.connect(
    `mongodb+srv://${mongoUser}:${mongoPass}@bovcontol-c8vnu.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const animalSchema = new mongoose.Schema({
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
    updatedAt: {
        type: Number,
        default: new Date().getTime(),
    },
    deletedAt: {
        type: Number,
    },
    type: {
        type: String,
        required: true,
        enum: animalTypes,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const animalModel = mongoose.model('Animals', animalSchema);

module.exports = {
    findById: async (id) => {
        let result = await animalModel.findById(id);
        return result;
    },

    create: async (data) => {
        let newAnimal = new animalModel(data);
        await newAnimal.save()
        return newAnimal;
    },

    update: async (id, data) => {
        data["updatedAt"] = new Date().getTime();
        let result = await animalModel.findOneAndUpdate({ '_id': id }, data, { new: true });
        return result;
    }
};
