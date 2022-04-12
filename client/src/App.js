import './App.css';
import { Route, Routes } from "react-router-dom"
import Details from './components/Details/Details';

function App() {
  return (
    <>
      <Routes>
        <Route path="home/:id" element={<Details/>}/>
      </Routes>
    </>
  );
}

export default App;
