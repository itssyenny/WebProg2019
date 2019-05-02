const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 8081;

let Todo = require('./Todo-Schema');

// what the server uses
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

// connect to mongoDB for database
mongoose.connect('mongodb+srv://syenny:midterm_project@midterm-1sdrw.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.on('error', error => {
    console.log(error);
});

connection.once('open', () => {
    console.log('MongoDB database connection is established successfully.')
});

// implement API endpoints by express router (as a middleware)
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err,todos) { // handle incoming HTTP GET req on the /todo/URL path. and retrieve a list of all todo items from database
        if(err) {
            console.log(err);
        }
        else {
            res.json(todos);
        }
    });
});

//retrieve a todo list by an ID
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!todo) {
            res.status(400).send("new todo list data is not found");            
        }
        else {
            todo.todo_name = req.body.todo_name;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_type = req.body.todo_type;
            todo.todo_completed = req.body.todo_completed;
            todo.todo_deleted = req.body.todo_deleted;

            console.log('id: '+ todo._id + 'here is deleted status: ' + todo.todo_deleted);

            if(todo.todo_deleted == true) {
                Todo.findByIdAndDelete(todo._id, (err) => {
                    if(err) console.log(err);
                    else console.log('delete success.');
                });
            }

            todo.save().then(function(todo) {
                res.json("Todo list is updated");
            })
            .catch(function(err) {
                res.status(400).send("update is not possible");            
            });
        }
    });
});

// route for adding a new todo item by HTTP POST
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    console.log(req.body);
    todo.save()
        .then(function(todo) {
            res.status(200).json({"todo":"todo is added successfully"});
        })
        .catch(function(err) {
            res.status(400).send('fail adding new todo');
        });
});


//what port the server will listen to
app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}.`);
});