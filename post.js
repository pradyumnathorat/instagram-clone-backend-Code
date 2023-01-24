const mongoose = require('mongoose');

const schema = mongoose.Schema;

const postschema = new schema({
    Author:{
        type: String,
        required: true

    },
    Location:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default:0
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: "15/05/2022"
    }
});

const postModel = mongoose.model('InstaPost', postschema);

module.exports = postModel;
