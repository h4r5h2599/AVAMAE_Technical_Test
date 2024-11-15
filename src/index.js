import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { APIProvider } from "./Context/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <APIProvider>
    <App />
  </APIProvider>
);
