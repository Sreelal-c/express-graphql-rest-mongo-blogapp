const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    content: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Blogs', BlogSchema);