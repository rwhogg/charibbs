import {arrayRemove, runTransaction} from "firebase/firestore"
import {Link as RouterLink} from "react-router-dom"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import {useFirestore, useFirestoreDocData, useUser} from "reactfire"
import {getRoleDocRef, getUsersDocRef, getSignupsDocRef} from "./FBUtils"
import SignUpButton from "./SignUpButton.js"
import {Loading} from "./ReactUtils.js"

const OpportunityView = ({opportunity}) => {
    const {id, roleId, numRequired, numSignedUp, eventId, charityId} = opportunity
    const firestore = useFirestore()
    const user = useUser()
    const userId = user && user.data && user.data.uid
    const roleDocRef = getRoleDocRef(firestore, charityId, roleId)
    const signupsDocRef = getSignupsDocRef(firestore, charityId, eventId, id)
    const userDocRef = getUsersDocRef(firestore, userId)
    const {status: roleFetchStatus, data: roleData, error} = useFirestoreDocData(roleDocRef, {idField: "id"})
    const {status: userFetchStatus, data: userData} = useFirestoreDocData(userDocRef, {idField: "id"})

    const unregister = () => {
        if(userId) {
            try {
                runTransaction(firestore, async(transaction) => {
                    const result = await transaction
                        .update(
                            signupsDocRef,
                            {users: arrayRemove(userId)},
                        )

                    const userResult = await transaction
                        .set(
                            userDocRef,
                            {opportunities: arrayRemove(id)},
                            {merge: true},
                        )
                    console.log(result)
                    console.log(userResult)
                    alert("You were successfully unregistered!")
                    location.reload()
                })
            }
            catch(e) {
                alert("We were unable to sign you up")
                console.error(e)
            }
        }
    }

    let roleName, roleDescription
    if(roleFetchStatus === "loading") {
        roleName = "Role data loading..."
    }
    else if(error) {
        console.error("Error is", error)
    }
    else {
        roleName = roleData.name
        roleDescription = roleData.description
    }

    const numStillNeeded = Math.max(numRequired - (numSignedUp || 0), 0)
    let signupButton = ""
    if(roleId && numStillNeeded > 0) {
        if(userFetchStatus === "loading") {
            signupButton = <Loading />
        }
        else if(userData.opportunities && !userData.opportunities.includes(id)) {
            signupButton =
                <SignUpButton
                    charityId={charityId}
                    eventId={eventId}
                    opportunityId={id}
                />
        }
    }

    let unregisterButton = ""
    if(userFetchStatus === "loading") {
        unregisterButton = <Loading />
    }
    else if(userFetchStatus === "success") {
        if(userData.opportunities && userData.opportunities.includes(id)) {
            unregisterButton = <Button sx={{backgroundColor: "primary.dark"}} onClick={unregister}>
                Unregister
            </Button>
        }
    }

    const roleUrl = `/charities/${charityId}/roles/${roleId}`

    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Link
                        component={RouterLink}
                        to={roleUrl}
                    >
                        {roleName}
                    </Link>
                </Typography>
                <Typography component="span">
                    <p>
                        {roleDescription}
                    </p>
                    <p>
                        {numStillNeeded} slots available
                    </p>
                    {signupButton}
                    {unregisterButton}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default OpportunityView
