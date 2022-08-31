import * as React from "react"
import {useState} from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import {setDoc} from "firebase/firestore"
import {useFirestore} from "reactfire"
import {useNavigate} from "react-router-dom"
import {nanoid} from "nanoid"
import {getCharityDocRef} from "./FBUtils.js"

const CreateCharityView = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [adminUid, setAdminUid] = useState()
    const firestore = useFirestore()
    const navigate = useNavigate()

    const createCharity = () => {
        // FIXME make sure it doesn't exist first
        setDoc(getCharityDocRef(firestore, nanoid()), {
            name,
            description,
            adminUid
        })
            .then(
                () => {
                    alert(`Successfully registered charity ${name}`)
                    navigate("/charities")
                },
                () => {
                    alert("Charity registration failed")
                }
            )
    }

    const updateName = e => {
        setName(e.target.value)
    }

    const updateDescription = e => {
        setDescription(e.target.value)
    }

    const updateAdminUid = e => {
        setAdminUid(e.target.value)
    }

    return(
        <>
            <Typography variant="h5" component="div">
                Register New Charity
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
                    id="description"
                    label="Description"
                    variant="filled"
                    value={description}
                    onChange={updateDescription}
                    multiline
                />
                <TextField
                    id="adminUid"
                    label="Charity Admin UID"
                    variant="filled"
                    value={adminUid}
                    onChange={updateAdminUid}
                    required
                />
                <Button
                    type="button"
                    onClick={createCharity}
                    sx={{backgroundColor: "primary.dark"}}
                >
                    Register
                </Button>
            </Box>
        </>
    )
}

export default CreateCharityView
