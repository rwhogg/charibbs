import * as React from "react"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import {Link as RouterLink} from "react-router-dom"
import {useFirestore, useFirestoreDocData} from "reactfire"
import Link from "@mui/material/Link"
import IconButton from "@mui/material/IconButton"
import {getCharityDocRef, getEventDocRef} from "./FBUtils.js"
import DeleteIcon from "@mui/icons-material/Delete"
import VolunteerIcon from "@mui/icons-material/VolunteerActivism"
import {deleteDoc} from "firebase/firestore"
import {useNavigate} from "react-router-dom"

const EventView = ({event}) => {
    const {id, name, description, location, charityId, startTime} = event
    const eventTime = startTime instanceof Date ?
        `Starting at ${startTime.toLocaleString()}` :
        "No start time defined"
    const firestore = useFirestore()
    const charityRef = getCharityDocRef(firestore, charityId)
    const {status, data: charity} = useFirestoreDocData(charityRef, {idField: "id"})
    // const rolesCollectionRef = getRoleCollectionRef(firestore, charityId)
    // const {status: roleLoadStatus, data: roleSnapshot} = useFirestoreCollection(rolesCollectionRef)
    const navigate = useNavigate()

    const charityRoute = `/charities/${charityId}`

    const charityData = status === "success" ?
        <Typography component="div">
            Organized by {" "}
            <Link
                component={RouterLink}
                to={charityRoute}
            >
                {charity.name}
            </Link>
        </Typography> :
        ""

    const unschedule = () => {
        if(confirm(`Do you really want to unschedule ${name}?`)) {
            const docRef = getEventDocRef(firestore, charityId, id)
            deleteDoc(docRef)
                .then(
                    () => {
                        alert(`Event ${name} was successfully unregistered`)
                        navigate(`${charityRoute}/events`)
                    },
                    () => {
                        alert(`Event ${name} was not successfully unregistered`)
                    }
                )
        }
    }

    const eventUrl = `${charityRoute}/events/${id}`

    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Link
                        component={RouterLink}
                        to={eventUrl}
                    >
                        {name}
                    </Link>
                </Typography>
                {charityData}
                <Typography component="div">
                    {location ? `In ${location}` : ""}
                </Typography>
                <Typography component="div">
                    {eventTime}
                </Typography>
                <Typography component="div">
                    {description}
                </Typography>
                <Typography component="div">
                    <Link
                        component={RouterLink}
                        to={`${eventUrl}/opportunities`}
                    >
                        Opportunities
                    </Link>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    aria-label="Add Opportunity"
                    onClick={() => navigate(`${eventUrl}/opportunities/create`)}
                >
                    <VolunteerIcon/>
                </IconButton>
                <IconButton
                    aria-label="Unschedule event"
                    onClick={unschedule}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default EventView
