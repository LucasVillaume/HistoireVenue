const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ "users": ["user1", "user2", "user3", "user4"] });
});

app.get('/questions', (req, res) => {
    //toy example
    res.json({"Theme" : "Theme1", "questions": ["question11", "question12", "question13", "question14"], "answers": ["answer11", "answer12", "answer13", "answer14"]});
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});