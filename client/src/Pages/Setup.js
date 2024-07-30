//Setup page component: setup a game with different settings

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacer from "../Components/Spacer";


function Setup() {

    //Themes available
    const [themes, setThemes] = useState([]);
    //Selected themes
    const [selectedThemes, setSelectedThemes] = useState(["",""]);
    //Navigation, pass the selected themes to the game page
    const navigate = useNavigate(); 


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
        navigate('/game', {state: {themes: selectedThemes}});
      };

    return (
        <div>
            <h1>Setup</h1>
            <p>Setup a game with different settings</p>
            <form onSubmit={handleSubmit}>
                <Spacer spacing={30}>
                    {
                        selectedThemes.map((theme, index) => {
                            return (
                                <select key={index} value={theme} onChange={(event) => {
                                    const newSelectedThemes = [...selectedThemes];
                                    newSelectedThemes[index] = event.target.value;
                                    setSelectedThemes(newSelectedThemes);
                                }}>
                                    <option value="">Select a theme</option>
                                    {themes.map((theme, index) => {
                                        return <option key={index} value={theme}>{theme}</option>
                                    })}
                                </select>
                            );
                        })
                    }
                    <button type="submit">Start</button>
                </Spacer>
            </form>
        </div>
    );
}

export default Setup;