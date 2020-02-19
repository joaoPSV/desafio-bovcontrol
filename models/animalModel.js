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
    findById : async (id) => {
        try {
            let result = await animalModel.findById(id);
            return result;
        } catch(e) {
            throw e;
        }
    },

    create: async (data) => {
        try {
            let newAnimal = new animalModel(data);
            await newAnimal.save()
            return newAnimal;
        } catch(e) {
            throw e;
        }
    },

    update: async (id, data) => {
        try {
            data["updatedAt"] = new Date().getTime();
            await animalModel.updateOne({ '_id': id }, data);
        } catch(e) {
            throw e;
        }
    }
};
