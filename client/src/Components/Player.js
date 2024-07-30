//Component to track player's score
import {useState} from 'react';
import "../styles/player.css";

export default function Player(){

    const nameGenerator = () => {
        const names = ['Antoine', 'notAntoine', 'True', 'You', 'Joe Mama'];
        return names[Math.floor(Math.random() * names.length)];
    }

    const [score, setScore] = useState(0);
    const [name, setName] = useState(nameGenerator());
    //TODO: add a state for the color of the player (click to change) ??

    //function to rename the player
    const rename = () => {
        let playerName = prompt("Enter a name");
        //sanitizing the input
        if(playerName === "" || playerName === null){
            playerName = name;
        }
        setName(playerName);
    }

    const addScore = () => {
        let value = prompt("Enter a score");
        //sanitizing the input
        if(isNaN(value) || value === "" || value === null){
            value = 0;
        }
        setScore(score + parseInt(value));
    }

    return (
        <div class="playerCard">
            <p onClick={rename}>{name}</p>
            <p onClick={addScore}>{score}</p>
        </div>
    );
} 