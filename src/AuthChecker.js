import {Loading} from "./ReactUtils.js"
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import Button from "@mui/material/Button"
import {useSigninCheck, useAuth} from "reactfire"
import RoutesComponent from "./RoutesComponent.js"
import {useNavigate} from "react-router-dom"
import LoginWithEmailView from "./LoginWithEmailView"

const AuthChecker = () => {
    const {status, data: loginData} = useSigninCheck()
    const auth = useAuth()
    const navigate = useNavigate()

    const logInGoogle = async() => {
        await signInWithPopup(auth, new GoogleAuthProvider())
        location.reload()
    }

    const logInEmail = async() => {
        navigate("/loginWithEmail")
    }

    if(status === "loading") {
        return <Loading />
    }
    if(!loginData || loginData.signedIn !== true) {
        return(
            <>
                <Button onClick={logInGoogle}>Log In (Google)</Button>
                <LoginWithEmailView />
            </>
        )
    }

    return  <RoutesComponent />
}

export default AuthChecker
