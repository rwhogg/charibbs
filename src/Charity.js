class Charity {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

export default Charity

const CharityConverter = {
    toFirestore: charity => {
        const obj = {
            name: charity.name,
            description: charity.description,
            adminUid: charity.adminUid,
        }
        if(charity.id) {
            obj.id = charity.id
        }
        return obj
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        const charity = new Charity(data.id, data.name)
        charity.description = data.description
        charity.adminUid = data.adminUid
        return charity
    }
}

export {CharityConverter}