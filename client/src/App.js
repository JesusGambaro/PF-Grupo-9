import "./Css/app.scss";
import Shoes from "./Components/Shoes";
import LandingPage from "./Components/LandingPage/LandingPage";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Components/NotFound";
import NavBarOwn from "./Components/NavBarOwn"

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/home"
        element={[<NavBarOwn key={"nav"} />, <Shoes key={"shoes"} />]}
      />
      <Route
        exact
        path="/"
        element={[<NavBarOwn key={"nav"} />, <LandingPage />]}
      />
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
