const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000; // Your backend will run on this port

app.use(cors());  // Enable cross-origin requests
app.use(bodyParser.json());  // Parse JSON data in request bodies

// Serve a welcome message at the root path
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!'); // You can customize this message
});

// The file where tasks will be stored
const DATA_FILE = './tasks.json';

// Load tasks from file
function loadTasks() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return [];
}

// Save tasks to file
function saveTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Get all tasks
app.get('/tasks', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const tasks = loadTasks();
    const newTask = { id: Date.now().toString(), task: req.body.task };
    tasks.push(newTask);
    saveTasks(tasks);
    res.json(newTask);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== req.params.id);
    saveTasks(tasks);
    res.status(204).send();  // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
