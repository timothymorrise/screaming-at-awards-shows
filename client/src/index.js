// SRC 
// ==============================

// IMPORT FROM PACKAGES
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
 
// IMPORT FROM FILES -- COMPONENTS
import App from "./App";
import store from "./redux/index.js"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById("root")
)
