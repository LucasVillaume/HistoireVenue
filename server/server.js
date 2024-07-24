const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ "users": ["user1", "user2", "user3", "user4"] });
});

app.get('/questions', (req, res) => {
    //toy example
    let example = {
        "Theme" : "Theme1",
        "obj" : [
            {
                "question" : "question1",
                "answer" : "answer1",
                "points" : 400
            },
            {
                "question" : "question2",
                "answer" : "answer2",
                "points" : 200
            },
            {
                "question" : "question3",
                "answer" : "answer3",
                "points" : 100
            }
        ]
    }
    res.json([example, example]);
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});