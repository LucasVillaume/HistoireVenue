// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Setup from './Pages/Setup';
import Game from './Pages/Game';

const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/game" element={<Game />} />
         </Routes>
      </>
   );
};
 
export default App;