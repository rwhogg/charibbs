import * as React from "react"
import {useState} from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import {setDoc} from "firebase/firestore"
import {useFirestore, useFirestoreDocData} from "reactfire"
import {useNavigate} from "react-router-dom"
import {nanoid} from "nanoid"
import {getEventDocRef, getCharityDocRef} from "./FBUtils.js"

const CreateEventView = ({charityId}) => {
    const [name, setName] = useState()
    const [location, setLocation] = useState()
    const [description, setDescription] = useState()
    const [startTime, setStartTime] = useState()
    const firestore = useFirestore()
    const navigate = useNavigate()

    const charityDocRef = getCharityDocRef(firestore, charityId)
    const {status: charityLoadStatus, data: charityData} = useFirestoreDocData(charityDocRef, {idField: "id"})

    const createEvent = () => {
        // FIXME make sure it doesn't exist first
        setDoc(getEventDocRef(firestore, charityId, nanoid()), {
            name,
            description,
            location,
            startTime: new Date(startTime),
        }).then(() => {
            alert(`Successfully scheduled event ${name}`)
            navigate(`/charities/${charityId}/events`)
        })
    }

    const updateName = e => {
        setName(e.target.value)
    }

    const updateLocation = e => {
        setLocation(e.target.value)
    }

    const updateDescription = e => {
        setDescription(e.target.value)
    }

    const updateStartTime = e => {
        setStartTime(e.target.value)
    }

    const charityName = charityLoadStatus === "success" ?
        `(${charityData.name})` :
        ""

    return(
        <>
            <Typography variant="h5" component="div">
                Schedule New Event {charityName}
            </Typography>
            <Box
                component="form"
                sx={{backgroundColor: "primary.main"}}
            >
                <TextField
                    id="name"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={updateName}
                    required
                />
                <TextField
                    id="location"
                    label="City"
                    variant="filled"
                    value={location}
                    onChange={updateLocation}
                    required
                />
                <TextField
                    id="startTime"
                    label="Start Time"
                    type="datetime-local"
                    variant="filled"
                    value={startTime}
                    onChange={updateStartTime}
                    required
                />
                <TextField
                    id="description"
                    label="Description"
                    variant="filled"
                    value={description}
                    onChange={updateDescription}
                    multiline
                />
                <Button
                    type="button"
                    onClick={createEvent}
                    sx={{backgroundColor: "primary.dark"}}
                >
                    Schedule
                </Button>
            </Box>
        </>
    )
}

export default CreateEventView
