import { createRoot } from "react-dom/client"
import "./Css/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store/store"
import axios from "axios"
// API URL https://rapidapi.com/tg4-solutions-tg4-solutions-default/api/the-sneaker-database/
const container = document.getElementById("root")


axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App tab="home" />
    </Provider>
  </BrowserRouter>
)
reportWebVitals()
