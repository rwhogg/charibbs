import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"
import {FirebaseConfig} from "./FirebaseConfig.js"

import { FirebaseAppProvider } from "reactfire"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={FirebaseConfig}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>
)
