class User {
    constructor(userId) {
        this.id = userId
    }
}

const UserConverter = {
    toFirestore: user => {
        const obj = {
            opportunities: user.opportunities,
        }
        if(user.id) {
            obj.id = user.id
        }
        return obj
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const user = new User(data.id)
        user.opportunities = data.opportunities
        user.admin = data.admin
        return user
    }
}

export default User

export {UserConverter}
