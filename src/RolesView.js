import {useFirestore, useFirestoreCollectionData, useFirestoreDocData} from "reactfire"
import {getRoleCollectionRef, getCharityDocRef} from "./FBUtils.js"
import RoleView from "./RoleView.js"
import {Loading} from "./ReactUtils.js"
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import {Link} from "react-router-dom"
import Typography from "@mui/material/Typography"

const CreateButton = ({charityId}) => {
    return(
        <Button
            variant="contained"
            endIcon={<AddIcon />}
            component={Link}
            to={`/charities/${charityId}/roles/create`}
        >
            Create New Role
        </Button>
    )
}

const RolesView = ({charityId}) => {
    const firestore = useFirestore()
    const charityDocRef = getCharityDocRef(firestore, charityId)
    const rolesRef = getRoleCollectionRef(firestore, charityId)
    const {status, data} = useFirestoreCollectionData(rolesRef, {idField: "id"})
    const showCreateButton = true
    const {status: charityLoadStatus, data: charityData} = useFirestoreDocData(charityDocRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    const roleComponents = data.map(r => {
        return <RoleView role={r} />
    })

    const charityName = charityLoadStatus === "success" ?
        `(${charityData.name})` :
        ""

    return(
        <div>
            <Typography variant="h5">
                All Roles {charityName}
            </Typography>
            {showCreateButton ? <CreateButton charityId={charityId} /> : ""}
            {roleComponents}
        </div>
    )
}

export default RolesView
