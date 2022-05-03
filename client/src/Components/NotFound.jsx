import {NavLink} from "react-router-dom";
import "../Css/App.css"
const NotFound = () => {
    return <div className="not-found-container">
        <h1>404 - Not Found</h1>
        <NavLink to={"/"}>
            <h1>Redirect</h1>
        </NavLink>
    </div>
}

export default NotFound;