// Main page of the game part of the app

import { useEffect, useState, Children } from "react";
import Spacer from "../Components/Spacer";

//Component for the question card
function Card({question, answer, points}) {

    //generate random strings from 2 to 6 characters
    const random_str = Math.random().toString(36).substring(2,7);

    //state for the answer
    const [text, setText] = useState(random_str);
    //state for the card (flip or not)
    const [moved, setMoved] = useState(false);
    //state for the button
    const [revealed, setRevealed] = useState(false);

    const reveal = () => { 
        setText(answer);
        setRevealed(true);
    };
    
    const move = () => { setMoved(!moved) };


    
    if (!moved) {
        return (
            <div>
                <p>{points}</p>
                <button onClick={move}>Flip</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>{question}</p>
                <p>{text}</p>
                {!revealed && <button onClick={reveal}>Reveal</button>}
            </div>
        );
    }
}

//Component for the theme
function Theme({theme, children}) {
    return (
        <div>
            <h1>{theme}</h1>
            {children}
        </div>
    );
}



function Game() {

    //state for the questions
    const [themes, setThemes] = useState([]);

    useEffect (() => {
        document.title = 'Let\'s play !';
        fetch('/questions')
            .then(response => response.json())
            .then(data => setThemes(data));
    }, []);

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Spacer spacing={50}>
                {themes.map((theme, i) => (
                    <Theme key={i} theme={theme.Theme}>
                        {theme.obj.map((question, j) => (
                            <Card key={j} question={question.question} answer={question.answer} points={question.points}/>
                        ))}
                    </Theme>
                ))}
            </Spacer>
        </div>
    );
}

export default Game;