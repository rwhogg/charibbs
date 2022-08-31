// FIXME: make this like the "events" view where you can optionally have a
// global search

import * as React from "react"
import {Loading} from "./ReactUtils.js"
import {useFirestore, useFirestoreCollectionData, useFirestoreDocData} from "reactfire"
import Typography from "@mui/material/Typography"
import {getOpportunityCollectionRef, getEventDocRef} from "./FBUtils.js"
import OpportunityView from "./OpportunityView.js"

const OpportunitiesView = ({charityId, eventId}) => {
    const firestore = useFirestore()
    const opportunitiesCollectionRef = getOpportunityCollectionRef(firestore, charityId, eventId)
    const eventDocRef = getEventDocRef(firestore, charityId, eventId)
    const {status, data} = useFirestoreCollectionData(opportunitiesCollectionRef, {idField: "id"})
    const {status: eventLoadStatus, data: eventData} = useFirestoreDocData(eventDocRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    const oppComponents = data.map(o => {
        return <OpportunityView opportunity={o} />
    })

    const eventName = eventLoadStatus === "success" ?
        `(${eventData.name})` :
        ""

    return(
        <div>
            <Typography variant="h5">
                All Opportunities {eventName}
            </Typography>
            {oppComponents}
        </div>
    )
}

export default OpportunitiesView
