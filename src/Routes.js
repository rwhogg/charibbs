import {useFirestore, useFirestoreDocData, useUser} from "reactfire"
import {useParams} from "react-router-dom"
import CharityView from "./CharityView.js"
import CharitiesView from "./CharitiesView.js"
import CreateCharityView from "./CreateCharityView.js"
import EventView from "./EventView.js"
import EventsView from "./EventsView.js"
import CreateEventView from "./CreateEventView.js"
import RoleView from "./RoleView.js"
import RolesView from "./RolesView.js"
import CreateRoleView from "./CreateRoleView.js"
import OpportunityView from "./OpportunityView.js"
import OpportunitiesView from "./OpportunitiesView.js"
import CreateOpportunityView from "./CreateOpportunityView.js"
import UserView from "./UserView.js"
import LoginWithEmailView from "./LoginWithEmailView.js"
import {Loading} from "./ReactUtils.js"
import {
    getEventDocRef,
    getCharityDocRef,
    getRoleDocRef,
    getOpportunityDocRef,
    getUsersDocRef,
} from "./FBUtils.js"

const CharitiesRoute = () => {
    return <CharitiesView />
}

const CharityRoute = () => {
    const {charityId} = useParams()
    const charityRef = getCharityDocRef(useFirestore(), charityId)
    const {status, data} = useFirestoreDocData(charityRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    return(
        <CharityView charity={data} />
    )
}

const CreateCharityRoute = () => {
    return(
        <CreateCharityView />
    )
}

const EventRoute = () => {
    const {charityId, eventId} = useParams()
    const eventRef = getEventDocRef(useFirestore(), charityId, eventId)
    const {status, data} = useFirestoreDocData(eventRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    return(
        <EventView event={data} />
    )
}

const CreateEventRoute = () => {
    const {charityId} = useParams()
    return(
        <CreateEventView charityId={charityId} />
    )
}

const EventsRoute = () => {
    const {charityId} = useParams()
    if(charityId) {
        return <EventsView charityId={charityId} />
    }

    return <EventsView />
}

const CreateRoleRoute = () => {
    const {charityId} = useParams()
    return(
        <CreateRoleView charityId={charityId} />
    )
}

const RolesRoute = () => {
    const {charityId} = useParams()
    return <RolesView charityId={charityId} />
}

const RoleRoute = () => {
    const {charityId, roleId} = useParams()
    const roleRef = getRoleDocRef(useFirestore(), charityId, roleId)
    const {status, data} = useFirestoreDocData(roleRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    return(
        <RoleView role={data} />
    )
}

const OpportunityRoute = () => {
    const {charityId, eventId, opportunityId} = useParams()
    const opportunityRef = getOpportunityDocRef(useFirestore(), charityId, eventId, opportunityId)
    const {status, data} = useFirestoreDocData(opportunityRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    return(
        <OpportunityView opportunity={data} />
    )
}

const OpportunitiesRoute = () => {
    const {charityId, eventId} = useParams()
    return <OpportunitiesView eventId={eventId} charityId={charityId} />
}

const CreateOpportunityRoute = () => {
    const {charityId, eventId} = useParams()
    return <CreateOpportunityView eventId={eventId} charityId={charityId} />
}

const UserRoute = () => {
    const user = useUser()
    const userId = user && user.data && user.data.uid
    const userDocRef = getUsersDocRef(useFirestore(), userId)
    const {status, data: userObj} = useFirestoreDocData(userDocRef, {idField: "id"})

    if(status === "loading") {
        return <Loading />
    }

    return(
        <UserView user={userObj} />
    )
}

const LoginWithEmailRoute = () => {
    return(
        <LoginWithEmailView />
    )
}

export {
    CharitiesRoute,
    CharityRoute,
    CreateCharityRoute,
    EventRoute,
    EventsRoute,
    CreateEventRoute,
    RoleRoute,
    RolesRoute,
    CreateRoleRoute,
    OpportunityRoute,
    OpportunitiesRoute,
    CreateOpportunityRoute,
    UserRoute,
    LoginWithEmailRoute
}
