//Home page component

import React, {useEffect, useState} from 'react'

function Home() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    document.title = 'Users List'
    fetch('/api')
      .then(response => response.json())
      .then(data => setBackendData(data))
  },[])

  return (
    <div>

      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}

    </div>
  );
}

export default Home;