import {useFirestore, useFirestoreCollectionData} from "reactfire"
import CharityView from "./CharityView.js"
import Typography from "@mui/material/Typography"
import {Loading} from "./ReactUtils.js"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import {Link} from "react-router-dom"
import {getCharityCollectionRef} from "./FBUtils.js"

const CreateCharityButton = () => {
    return(
        <Button
            variant="contained"
            endIcon={<AddIcon />}
            component={Link}
            to="/charities/create"
        >
            Register New Charity
        </Button>
    )
}

const CharitiesView = () => {
    const charitiesRef = getCharityCollectionRef(useFirestore())
    const {status, data} = useFirestoreCollectionData(charitiesRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    const charityComponents = data.map(c => {
        return <CharityView charity={c} />
    })
    const disclaimer =
        <Typography component="div">
            Disclaimer: All charity names are created for demo purposes.
            The use of any real charity name is unintentional.
        </Typography>
    return(
        <div>
            <Typography variant="h5" component="span">
                All Charities
            </Typography>
            <CreateCharityButton />
            {charityComponents}
            {disclaimer}
        </div>
    )
}

export default CharitiesView
