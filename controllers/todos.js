const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');

todosRouter.get('/', async (req, res) => {
    const user = req.user;
    const todos = await Todo.find({ user: user.id });
    return res.status(200).json(todos);
});

todosRouter.post('/', async (req, res) => {
    const user = req.user;
    const { text } = req.body;
    const newTodo = new Todo({
        text,
        checked: false,
        user: user._id
    });

    const savedTodo = await newTodo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();
    
    return res.status(201).json(savedTodo);
})

todosRouter.delete('/:id', async (req, res) => {
    const user = req.user;
    
    await Todo.findByIdAndDelete(req.params.id)

    user.todos = user.todos.filter(todo => todo.id !== req.params.id);

    await user.save();
    
    return res.sendStatus(204);
})

todosRouter.patch('/:id', async (req, res) => {
    const user = req.user;

    const { checked } = req.body;

    await Todo.findByIdAndUpdate(req.params.id, { checked });

    return res.sendStatus(200);
})

module.exports = todosRouter;