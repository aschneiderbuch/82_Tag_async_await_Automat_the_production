// ! import
import { BrowserRouter, Routes, Route} from 'react-router-dom';



// ! import Datein
import './App.scss';
import { HomePage } from './pages/HomePage.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
    <Route path="/" element= { <HomePage></HomePage> } > </Route>
    <Route path="*" element= { <HomePage></HomePage>} ></Route>
      </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
