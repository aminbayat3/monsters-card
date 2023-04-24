import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from './App';
// import App from './App2';


import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); //React StrictMode double re-render everything
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
