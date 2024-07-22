// Main page of the game part of the app

import { useEffect, useState } from "react";
import Spacer from "../Components/Spacer";


function Card({question, answer, points}) {

    //generate random strings
    const random_str = Math.random().toString(36).substring(2,7);

    //state for the answer
    const [text, setText] = useState(random_str);
    const reveal = () => { setText(answer) };
    //state for the card (flip or not)
    const [moved, setMoved] = useState(false);
    const move = () => { setMoved(!moved) };
    
    if (moved) {
        return (
            <div>
                <p>Retourné !</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>{question}</p>
                <p>{text}</p>
                <button onClick={reveal}>Answer</button>
                <button onClick={move}>Flip</button>
            </div>
        );
    }
}


function Game() {
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100'}}>
            <Spacer spacing={50}>
                <Card question="What is the capital of France?" answer="Paris" id={0}/>
                <Card question="What is the capital of France?" answer="Paris" id={1}/>
                <Card question="What is the capital of France?" answer="Paris" id={2}/>
            </Spacer>
        </div>
    );
}

export default Game;