import * as React from "react"
import {useState} from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import {useNavigate} from "react-router-dom"
import {nanoid} from "nanoid"
import {setDoc} from "firebase/firestore"
import {getOpportunityDocRef} from "./FBUtils.js"
import {useFirestore} from "reactfire"

const CreateOpportunityView = ({charityId, eventId}) => {
    const [roleId, setRoleId] = useState()
    const [numRequired, setNumRequired] = useState()
    const navigate = useNavigate()
    const firestore = useFirestore()


    const updateRoleId = e => {
        setRoleId(e.target.value)
    }

    const updateNumRequired = e => {
        setNumRequired(e.target.value)
    }

    const createOpportunity = () => {
        // FIXME make sure it doesn't exist first
        setDoc(getOpportunityDocRef(firestore, charityId, eventId, nanoid()), {
            roleId,
            numRequired,
            signedUp: [],
        }).then(() => {
            alert(`Successfully added opportunity for event ${eventId}`)
            navigate(`/charities/${charityId}/events/${eventId}`)
        })
    }

    return(
        <>
            <Typography variant="h5" component="div">
                Create New Opportunity
            </Typography>
            <Box
                component="form"
                sx={{backgroundColor: "primary.main"}}
            >
                {/* FIXME make this a <select> */}
                <TextField
                    id="roleId"
                    label="Role ID"
                    variant="filled"
                    value={roleId}
                    onChange={updateRoleId}
                    required
                />
                <TextField
                    id="numRequired"
                    label="Number Required"
                    variant="filled"
                    type="number"
                    value={numRequired}
                    onChange={updateNumRequired}
                    required
                />
                <Button
                    type="button"
                    onClick={createOpportunity}
                    sx={{backgroundColor: "primary.dark"}}
                >
                    Add
                </Button>
            </Box>
        </>
    )
}

export default CreateOpportunityView
