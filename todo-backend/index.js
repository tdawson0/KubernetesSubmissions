import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const todos = [
    "Learn Kubernetes basics",
    "Deploy application to cluster",
    "Configure persistent volumes"
];

app.get('/todos', (req, res) => {
    console.log('GET /todos');
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { todo } = req.body;
    console.log('POST /todos', todo);
    if (typeof todo !== 'string' || todo.trim() === '') {
        return res.status(400).json({ error: 'Invalid todo item' });
    }
    todos.push(todo.trim());
    res.status(201).json({ message: 'Todo item added', todos });
});
