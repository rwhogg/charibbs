import * as React from "react"
import {useState} from "react"
import {Loading} from "./ReactUtils.js"
import {collection, collectionGroup, orderBy, query, where} from "firebase/firestore"
import {useFirestore, useFirestoreCollectionData} from "reactfire"
import EventView from "./EventView.js"
import {EventConverter} from "./VolEvent.js"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"
import {Link} from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch"

const ScheduleButton = ({charityId}) => {
    return(
        <Button
            variant="contained"
            endIcon={<AddIcon />}
            component={Link}
            to={`/charities/${charityId}/events/create`}
        >
            Schedule New Event
        </Button>
    )
}

const today = () => {
    return new Date(new Date(Date.now()).setHours(0, 0, 0, 0))
}

const EventsView = ({charityId}) => {
    const firestore = useFirestore()
    const [showOnlyFuture, setShowOnlyFuture] = useState(true)
    const [currentTime, setCurrentTime] = useState(today())
    const [location, setLocation] = useState("")

    const updateShowOnlyFuture = () => {
        setShowOnlyFuture(!showOnlyFuture)
    }

    const updateLocation = e => {
        setLocation(e.target.value)
    }

    // if a charityId is specified, only fetch events related to that charity
    // Otherwise, fetch all events
    let eventsRef
    let showScheduleButton
    if(charityId) {
        eventsRef = collection(firestore, "charities", charityId, "events")
        showScheduleButton = true
    }
    else {
        eventsRef = collectionGroup(firestore, "events")
        showScheduleButton = false
    }

    if(location) {
        eventsRef = query(
            eventsRef,
            where("location", "==", location)
        )
    }
    if(showOnlyFuture) {
        eventsRef = query(
            eventsRef,
            where("startTime", ">=", currentTime),
            orderBy("startTime")
        )
    }

    eventsRef = eventsRef.withConverter(EventConverter)

    const {status, data} = useFirestoreCollectionData(eventsRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    const eventComponents = data.map(e => {
        return <EventView event={e} />
    })
    return(
        <div>
            <Typography variant="h5">
                All Events
            </Typography>
            {showScheduleButton ? <ScheduleButton charityId={charityId} /> : ""}
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={showOnlyFuture} onChange={updateShowOnlyFuture} />}
                    label="Show only events in the future"
                />
                <FormControlLabel
                    control={
                        <TextField
                            id="location"
                            value={location}
                            onChange={updateLocation}
                            variant="filled"
                            sx={{backgroundColor: "primary.main"}}
                        />
                    }
                    label="Show only in city"
                />
            </FormGroup>
            {eventComponents}
        </div>
    )
}

export default EventsView
