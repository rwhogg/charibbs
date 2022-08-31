import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {NavLink as RouterLink} from "react-router-dom"
import {useAuth, useSigninCheck} from "reactfire"

const TopBar = () => {
    const auth = useAuth()
    const user = auth.currentUser
    const logout = async() => {
        await auth.signOut()
        alert("Signed out")
        location.reload()
    }

    const {status: loginStatus, data: loginData} = useSigninCheck()

    let logoutButton = ""
    let userLink = ""
    if(loginStatus !== "loading" && loginData && loginData.signedIn === true) {
        logoutButton =
        <Button
            onClick={logout}
            sx={{backgroundColor: "secondary.light"}}
        >
            Log Out ({user.displayName || user.email})
        </Button>
        userLink =
            <Link
                component={RouterLink}
                to={"/users"}
            >
                User Data
            </Link>
    }

    const margin = {marginX: "5px"}
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={margin}
                    >
                        <Link component={RouterLink} to="/">
                            ChariBB
                        </Link>
                    </Typography>
                    <Link
                        component={RouterLink}
                        to="/charities"
                        sx={margin}
                    >
                        All Charities
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/events"
                        sx={margin}
                    >
                        All Events
                    </Link>
                    {logoutButton}
                    {userLink}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar
