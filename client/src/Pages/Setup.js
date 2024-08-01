//Setup page component: setup a game with different settings

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacer from "../Components/Spacer";
import '../styles/setup.css';


function Setup() {

    //Themes available
    const [themes, setThemes] = useState([]);
    //Selected themes
    const [selectedThemes, setSelectedThemes] = useState([""]);
    //Navigation, pass the selected themes to the game page
    const navigate = useNavigate();


    function addTheme() {
        //can't have more than 4 themes
        if (selectedThemes.length <= 3) {
            setSelectedThemes([...selectedThemes, ""]);
        } else {
            alert("You can't add more than 4 themes");
        }
    }


    useEffect(() => {
        document.title = 'Setup a game'
        fetch('/themes')
        .then(response => response.json())
        .then(data => {
            setThemes(data);
        });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        let tmp = []
        selectedThemes.forEach((theme) => {
            if (theme === "") {
                tmp.push(theme);
            } else {
                tmp.find((t) => t === theme) ? tmp.push("") : tmp.unshift(theme);
            }
        });

        //always put selected themes before empty ones (in the array)
        navigate('/game', {state: {themes: tmp}});
      };


    return (
        <div>
            <h1>Setup</h1>
            <p>Setup a game with different settings</p>
            <form onSubmit={handleSubmit}>
                {
                    selectedThemes.map((theme, index) => {
                        return (
                            <select class="themes" key={index} value={theme} onChange={(event) => {
                                const newSelectedThemes = [...selectedThemes];
                                newSelectedThemes[index] = event.target.value;
                                setSelectedThemes(newSelectedThemes);
                            }}>
                                <option value="">Random</option>
                                {themes.map((theme, index) => {
                                    return <option key={index} value={theme}>{theme}</option>
                                })}
                            </select>
                        );
                    })
                }
                <button type="button" onClick={addTheme}>Add theme</button>
                <br/>
                <button class="start" type="submit">Start</button>
            </form>
        </div>
    );
}

export default Setup;