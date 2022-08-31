const EventConverter = {
    toFirestore: event => {
        const obj = {
            name: event.name,
            startTime: event.startTime,
            description: event.description,
            location: event.location,
        }
        if(event.id) {
            obj.id = event.id
        }
        return obj
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const parentCharityId = (snapshot.ref &&
            snapshot.ref.parent &&
            snapshot.ref.parent.parent &&
            snapshot.ref.parent.parent.id) || null
        const event = new VolEvent(
            data.id,
            data.name,
            parentCharityId,
            (data.startTime && new Date(data.startTime.seconds * 1000))
        )
        event.description = data.description
        event.location = data.location
        return event
    },
}

class VolEvent {
    // not calling it "Event" to avoid naming conflict
    constructor(id, name, charityId, startTime) {
        this.id = id
        this.charityId = charityId
        this.name = name
        this.startTime = startTime
    }
}

export default VolEvent

export {EventConverter}
