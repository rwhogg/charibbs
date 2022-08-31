import "./App.css"
import {BrowserRouter} from "react-router-dom"
import {getFirestore} from "firebase/firestore"
import {AuthProvider, FirestoreProvider, useFirebaseApp} from "reactfire"
import {ThemeProvider} from "@mui/material/styles"
import TopBar from "./TopBar.js"
import {DarkTheme} from "./Theme.js"
import MainApp from "./AuthChecker.js"
import {getAuth} from "firebase/auth"

function App() {
    const firebase = useFirebaseApp()
    const firestoreInstance = getFirestore(firebase)
    const auth = getAuth(firebase)
    return(
        <FirestoreProvider sdk={firestoreInstance}>
            <ThemeProvider theme={DarkTheme}>
                <AuthProvider sdk={auth}>
                    <BrowserRouter basename="/static/index.html">
                        <TopBar />
                        <MainApp />
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </FirestoreProvider>
    )
}

export default App
