import {useState} from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import {signInWithEmailAndPassword} from "firebase/auth"
import {useAuth} from "reactfire"

const LogInWithEmailView = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const auth = useAuth()

    const logInEmail = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        location.reload()
    }

    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updatePassword = e => {
        setPassword(e.target.value)
    }

    return(
        <>
            <Typography variant="h5" component="div">
                Log In With Email
            </Typography>
            <Box
                component="form"
                sx={{backgroundColor: "primary.main"}}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    value={email}
                    onChange={updateEmail}
                    required
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={updatePassword}
                />
                <Button
                    type="button"
                    onClick={logInEmail}
                    sx={{backgroundColor: "primary.dark"}}
                >
                    Log In
                </Button>
            </Box>
        </>
    )
}

export default LogInWithEmailView
