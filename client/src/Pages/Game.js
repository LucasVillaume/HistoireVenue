// Main page of the game part of the app

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spacer from "../Components/Spacer";
import Player from "../Components/Player";
import "../App.css";

//Component for the question card
function Card({question, answer, points}) {

    //generate random strings
    const random_str = Math.random().toString(36).substring(2,20);

    //state for the answer
    const [text, setText] = useState(random_str);
    //state for the card (flip or not)
    const [moved, setMoved] = useState(false);
    //state for the button
    const [revealed, setRevealed] = useState(false);
    let timeoutID = null;


    useEffect(() => {
        if (moved && !revealed){
            timeoutID = setTimeout(() => {
                setText(random_str);
            }, 100);
        }
    },[moved, revealed, random_str]); // useEffect will run when moved, revealed or random_str changes


    const reveal = () => {
        clearTimeout(timeoutID);
        setRevealed(true); 
        setText(answer);
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
    //state for the button class
    const [buttonClass, setClass] = useState("game-button");

    //Read properties from the location object (if setup page was visited)
    const location = useLocation();
    const themesList = location.state || {"themes":["","",""]};

    // function to add a player
    const addPlayer = () => {
        if (players.length === 5) {
            alert('Max number of players reached');
            setClass("hidden");
            return;
        }
        setPlayer([...players, <Player key={players.length} />]);
    };

    useEffect (() => {
        document.title = 'Let\'s play !';
        
        fetch('/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( themesList )
        }).then(response => response.json())
        .then(data => {
            setThemes(data);
        });
    }, []);

    return (
        <>
            <h1 class="game-title">Game</h1>
            <div class="game-container">
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
            <button class={buttonClass} onClick={addPlayer}>New challenger</button>
            <div class="game-container">
                <Spacer spacing={150}>
                    {players}
                </Spacer>
            </div>
        </>
    );
}

export default Game;