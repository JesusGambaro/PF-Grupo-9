import "./Css/app.scss";
import Shoes from "./Components/Shoes";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Components/NotFound";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={[<NavBar key={"nav"} />, <Shoes key={"shoes"} />]}
      />
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
