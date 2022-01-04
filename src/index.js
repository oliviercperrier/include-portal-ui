// Import css before everything to make sure it is applied correctly
import "./index.css";
import "style/themes/include/main.scss";
import "style/themes/include/dist/antd.css";

import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initUserSnap } from "services/initUsersnap";

initUserSnap();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
