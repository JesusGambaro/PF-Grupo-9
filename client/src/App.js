import "./Css/app.scss";
import Shoes from "./Components/Shoes";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Components/NotFound";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/home"
        element={[<NavBar key={"nav"} />, <Shoes key={"shoes"} />]}
      />
      <Route path="*" exact={true} element={<NotFound />} />
      <Route
        exact
        path="/"
        element={[<NavBar key={"nav"} />, <LandingPage key={"landing"} />]}
      />
    </Routes>
  );
}

export default App;
