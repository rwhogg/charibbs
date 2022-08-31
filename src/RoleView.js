import * as React from "react"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import {Link} from "react-router-dom"

const RoleView = ({role}) => {
    const {id, name, description, charityId} = role
    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Link to={`/charities/${charityId}/roles/${id}`}>{name}</Link>
                </Typography>
                <Typography component="span">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoleView
