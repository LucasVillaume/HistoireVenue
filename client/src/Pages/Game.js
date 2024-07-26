// Main page of the game part of the app

import { useEffect, useState } from "react";
import Spacer from "../Components/Spacer";
import Player from "../Components/Player";
import "../styles/game.css";

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
            <div class="card" onMouseDown={move}>
                <p>{points}</p>
                <button onClick={move}>Flip</button>
            </div>
        );
    } else {
        return (
            <div class="card-flipped">
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
        <div class="theme">
            <h1>{theme}</h1>
            {children}
        </div>
    );
}


function Game() {

    //state to track the players
    const [players, setPlayer] = useState([]);
    //state for the questions
    const [themes, setThemes] = useState([]);

    // function to add a player
    const addPlayer = () => {
        if (players.length === 5) {
            alert('Max number of players reached');
            return;
        }
        setPlayer([...players, <Player key={players.length} />]);
    };

    useEffect (() => {
        document.title = 'Let\'s play !';
        fetch('/questions')
            .then(response => response.json())
            .then(data => setThemes(data));
    }, []);

    return (
        <>
        <h1 class="title">Game</h1>
        <div class="container">
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
        <br/>
        <br/>
        <button onClick={addPlayer}>New challenger</button>
        <div class="container">
            <Spacer spacing={150}>
                {players}
            </Spacer>
        </div>
        </>
    );
}

export default Game;