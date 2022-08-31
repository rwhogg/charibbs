import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import {Link as RouterLink} from "react-router-dom"
import {deleteDoc} from "firebase/firestore"
import {useFirestore} from "reactfire"
import {useNavigate} from "react-router-dom"
import {getCharityDocRef} from "./FBUtils.js"
import DeleteIcon from "@mui/icons-material/Delete"

const CharityView = ({charity}) => {
    const {id, name, description, adminUid} = charity
    const firestore = useFirestore()
    const navigate = useNavigate()

    const unregister = () => {
        if(confirm(`Do you really want to unregister ${name}?`)) {
            const docRef = getCharityDocRef(firestore, id)
            deleteDoc(docRef)
                .then(
                    () => {
                        alert(`Charity ${name} was successfully unregistered`)
                        navigate("/charities")
                    },
                    () => {
                        alert("Deletion failed")
                    }
                )
        }
    }

    const charityUrl = `/charities/${id}`

    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Link
                        component={RouterLink}
                        to={charityUrl}
                    >
                        {name}
                    </Link>
                </Typography>
                <Typography component="div">
                    {description}
                </Typography>
                <Typography component="div">
                    Admin User: {adminUid}
                </Typography>
                <Typography component="div">
                    <Link
                        component={RouterLink}
                        to={`${charityUrl}/events`}
                    >
                        Events
                    </Link>
                </Typography>
                <Typography component="div">
                    <Link
                        component={RouterLink}
                        to={`${charityUrl}/roles`}
                    >
                        Roles
                    </Link>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    aria-label="Unregister This Charity"
                    onClick={unregister}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CharityView
