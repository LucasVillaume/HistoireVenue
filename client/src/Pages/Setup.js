//Setup page component: setup a game with different settings

import { useEffect } from "react";

function Setup() {

    useEffect(() => {
        document.title = 'Setup a game'
    })

    return (
        <div>
            <h1>Setup</h1>
            <p>Setup a game with different settings</p>
        </div>
    );
}

export default Setup;