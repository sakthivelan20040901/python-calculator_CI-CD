const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Sakthivelan" }
];

app.get('/', (req, res) => {
    res.json({ service: 'Node.js', status: 'healthy' });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
});

app.listen(3000, () => {
    console.log('Node Service Running');
});