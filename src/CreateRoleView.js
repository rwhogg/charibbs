import * as React from "react"
import {useState} from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import {useFirestore} from "reactfire"
import {useNavigate} from "react-router-dom"
import {getRoleDocRef} from "./FBUtils.js"
import {setDoc} from "firebase/firestore"
import {nanoid} from "nanoid"

const CreateRoleView = ({charityId}) => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [skillsNeeded, setSkillsNeeded] = useState("Comma separated values...")
    const firestore = useFirestore()
    const navigate = useNavigate()

    const createRole = () => {
        // FIXME make sure it doesn't exist first

        // This is the wrong way to do this,
        // but this isn't meant to be an exercise in React,
        // so I'm not nitpicking on that
        let skills = skillsNeeded
        if(skills === "Comma separated values") {
            skills = ""
        }

        setDoc(getRoleDocRef(firestore, charityId, nanoid()), {
            name,
            description,
            skillsNeeded: skills.split(","),
        }).then(() => {
            alert(`Successfully created role ${name}`)
            navigate(`/charities/${charityId}/roles`)
        })
    }

    const updateName = e => {
        setName(e.target.value)
    }

    const updateDescription = e => {
        setDescription(e.target.value)
    }

    const updateSkillsNeeded = e => {
        setSkillsNeeded(e.target.value)
    }

    return(
        <>
            <Typography variant="h5" component="div">
                Create New Role
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
                {/* Normally I would use fancy pills here but I'm being lazy */}
                <TextField
                    id="skillsNeeded"
                    label="Skills Needed"
                    variant="filled"
                    value={skillsNeeded}
                    onChange={updateSkillsNeeded}

                />
                <Button
                    type="button"
                    onClick={createRole}
                    sx={{backgroundColor: "primary.dark"}}
                >
                    Create
                </Button>
            </Box>
        </>
    )
}

export default CreateRoleView
