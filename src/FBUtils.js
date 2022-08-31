import {collection, doc} from "firebase/firestore"
import {CharityConverter} from "./Charity.js"
import {EventConverter} from "./VolEvent.js"
import {RoleConverter} from "./Role.js"
import {OpportunityConverter} from "./Opportunity.js"
import {UserConverter} from "./User.js"

const getCharityCollectionRef = (firestore) => {
    return collection(firestore, "charities")
        .withConverter(CharityConverter)
}

const getCharityDocRef = (firestore, id) => {
    return doc(firestore, "charities", id)
        .withConverter(CharityConverter)
}

const getEventCollectionRef = (firestore, charityId) => {
    return collection(firestore, "charities", charityId, "events")
        .withConverter(EventConverter)
}

const getEventDocRef = (firestore, charityId, id) => {
    return doc(firestore, "charities", charityId, "events", id)
        .withConverter(EventConverter)
}

const getRoleCollectionRef = (firestore, charityId) => {
    return collection(firestore, "charities", charityId, "roles")
        .withConverter(RoleConverter)
}

const getRoleDocRef = (firestore, charityId, id) => {
    return doc(firestore, "charities", charityId, "roles", id)
        .withConverter(RoleConverter)
}

const getOpportunityCollectionRef = (firestore, charityId, eventId) => {
    return collection(firestore, "charities", charityId, "events", eventId, "opportunities")
        .withConverter(OpportunityConverter)
}

const getOpportunityDocRef = (firestore, charityId, eventId, id) => {
    return doc(firestore, "charities", charityId, "events", eventId, "opportunities", id)
        .withConverter(OpportunityConverter)
}

const getSignupsDocRef = (firestore, charityId, eventId, opportunityId) => {
    // There's no need to specify a doc ID here, as it is always hardcoded to "DEFAULT_SIGNUPS"
    return doc(firestore, "charities", charityId, "events", eventId, "opportunities", opportunityId, "signups", "DEFAULT_SIGNUPS")
}

const getUsersDocRef = (firestore, userId) => {
    return doc(firestore, "users", userId)
        .withConverter(UserConverter)
}

export {
    getCharityCollectionRef,
    getCharityDocRef,
    getEventCollectionRef,
    getEventDocRef,
    getRoleCollectionRef,
    getRoleDocRef,
    getOpportunityCollectionRef,
    getOpportunityDocRef,
    getSignupsDocRef,
    getUsersDocRef,
}
