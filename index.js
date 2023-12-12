const express = require('express');
const parser = require('body-parser');

const app = express();
const port = 3000;

app.use(parser.json());

let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4' },
];

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint to get a task by id
app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Endpoint to create a new task
app.post('/task', (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: tasks.length + 1, title, description};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Endpoint to update a task
app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if(taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body};
        res.json(tasks[taskIndex])
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Endpoint to delete a task
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.sendStatus(204);
});

// Start the nodejs server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});