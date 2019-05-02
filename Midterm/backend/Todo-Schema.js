const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_name: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_type: {
        type: String
    },
    todo_completed: {
        type: Boolean
    },
    todo_deleted : {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);