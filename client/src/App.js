// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Setup from './Pages/Setup';

const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
         </Routes>
      </>
   );
};
 
export default App;