const RoleConverter = {
    toFirestore: role => {
        const obj = {
            name: role.name,
            description: role.description
        }
        if(role.id) {
            obj.id = role.id
        }
        return obj
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const parentCharity = (
            snapshot.ref &&
                snapshot.ref.parent &&
                snapshot.ref.parent.parent &&
                snapshot.ref.parent.parent.id
        ) || null
        const role = new Role(data.id, data.name, parentCharity)
        role.description = data.description
        role.skillsNeeded = data.skillsNeeded
        return role
    },
}

// Roles are independent of specific events, but are tied to a charity
// Specific events have a mapping of roles needed to number needed and to signup lists
class Role {
    constructor(id, name, charityId) {
        this.id = id
        this.name = name
        this.charityId = charityId
    }
}

export default Role

export {RoleConverter}
