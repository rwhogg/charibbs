import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import {useUser} from "reactfire"
import {Link as RouterLink} from "react-router-dom"

const UserView = ({user}) => {
    const {id, opportunities, admin} = user
    const userInfo = useUser()
    const {displayName} = userInfo.data

    const adminInfo = admin ?
        <Typography component="div">
            Sysadmin
        </Typography> :
        ""
    const opportunityLinks = opportunities && opportunities.map(o => {
        return(
            <Link
                component={RouterLink}
                to={"/"/* FIXME */}
            >
                {o}
            </Link>
        )
    })
    const oppComponents = (opportunityLinks && opportunityLinks.length > 0) ?
        <>
            <Typography component="div" variant="h6">
                All opportunities
            </Typography>
            <ul>
                {opportunityLinks}
            </ul>
        </>:
        ""

    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {displayName}
                </Typography>
                <Typography component="div">
                    {adminInfo}
                    {oppComponents}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default UserView
