const OpportunityConverter = {
    toFirestore: opportunity => {
        const obj = {
            roleId: opportunity.roleId,
            numRequired: opportunity.numRequired,
        }
        if(event.id) {
            obj.id = event.id
        }
        return obj
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const parentEventId = (snapshot.ref &&
            snapshot.ref.parent &&
            snapshot.ref.parent.parent &&
            snapshot.ref.parent.parent.id) || null
        const grandParentCharityId = (snapshot.ref &&
            snapshot.ref.parent &&
            snapshot.ref.parent.parent &&
            snapshot.ref.parent.parent.parent &&
            snapshot.ref.parent.parent.parent.parent &&
            snapshot.ref.parent.parent.parent.parent.id) || null
        const opp = new Opportunity(data.roleId, parentEventId, grandParentCharityId, data.numRequired)
        if(data.numSignedUp) {
            opp.numSignedUp = data.numSignedUp
        }
        return opp
    }
}

class Opportunity {
    constructor(roleId, eventId, charityId, numRequired) {
        this.roleId = roleId
        this.eventId = eventId
        this.charityId = charityId
        this.numRequired = numRequired
    }
}

export default Opportunity

export {OpportunityConverter}
