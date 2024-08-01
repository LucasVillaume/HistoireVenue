const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

app.get('/themes', (req, res) => {
    let themes = getThemes();
    res.json(themes);
});


app.post('/game', craftGame);


function getThemes() {
    let themes = [];
    let file = require('./questions.json');
    file.forEach(element => {
        themes.push(element.name);
    });
    return themes;
}


function craftQuestions(theme) {
    let q = [];
    let questions = [];
    let file = require('./questions.json');
    file.forEach(element => {
        if (element.name === theme) {
            q.push(element.q400);
            q.push(element.q300);
            q.push(element.q200);
            q.push(element.q100);
        }
    });

    q.forEach(element => {
        let index = Math.floor(Math.random() * element.length);
        questions.push(element[index]);
    });

    return {
        "Theme" : theme,
        "obj" : questions
    }
}


function craftGame(req, res) {
    let selected = req.body.themes;
    let questions = [];
    let themes = getThemes();

    selected.forEach(select => {
        if (select === ""){ // no theme selected
            let random_index = Math.floor(Math.random() * themes.length);
            let theme = craftQuestions(themes[random_index]);
            questions.push(theme);
            themes.splice(random_index, 1);
        } else { // theme selected
            let theme = craftQuestions(select);
            questions.push(theme);
            themes.splice(themes.indexOf(select), 1);
        }
    });
    res.json(fisherYates(questions));

}






//Shuffle the questions (avoid the sort() bias)
function fisherYates(array) {
    const random = crypto.getRandomValues(new Uint32Array(array.length));
    for (let i = array.length - 1; i > 0; i--) {
        const j = random[i] % array.length;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}










//launch server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});