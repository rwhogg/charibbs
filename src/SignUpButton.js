import {arrayUnion, runTransaction} from "firebase/firestore"
import Button from "@mui/material/Button"
import {Loading} from "./ReactUtils.js"
import {useFirestore, useUser} from "reactfire"
import {getUsersDocRef, getSignupsDocRef} from "./FBUtils.js"

const SignUpButton = ({charityId, eventId, opportunityId}) => {
    const firestore = useFirestore()
    const signupsDocRef = getSignupsDocRef(firestore, charityId, eventId, opportunityId)
    const user = useUser()
    const userId = user && user.data && user.data.uid
    const userDocRef = getUsersDocRef(firestore, userId)

    const signUp = () => {
        if(userId) {
            try {
                runTransaction(firestore, async(transaction) => {
                    const result = await transaction
                        .update(
                            signupsDocRef,
                            {users: arrayUnion(userId)},
                        )

                    const userResult = await transaction
                        .set(
                            userDocRef,
                            {opportunities: arrayUnion(opportunityId)},
                            {merge: true},
                        )
                    console.log(result)
                    console.log(userResult)
                    alert("You were successfully signed up!")
                    location.reload()
                })
            }
            catch(e) {
                alert("We were unable to sign you up")
                console.error(e)
            }
        }
    }

    if(status === "loading") {
        return Loading
    }

    return(
        <Button
            sx={{backgroundColor: "primary.dark"}}
            onClick={signUp}
        >
            Sign Up!
        </Button>
    )
}

export default SignUpButton
