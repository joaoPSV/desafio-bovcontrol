const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://bovtester:bovcontrol@bovcontol-c8vnu.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
        await animalModel.updateOne({ '_id': id }, data);
    }
};
