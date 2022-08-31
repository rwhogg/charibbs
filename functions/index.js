const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

exports.countSignups = functions.firestore
    .document("charities/{charityId}/events/{eventId}/opportunities/{opportunityId}/signups/DEFAULT_SIGNUPS")
    .onWrite(async (change, context) => {
        functions.logger.warn("STARTING")
        const {charityId, eventId, opportunityId} = context.params
        const parentOppRef = db.doc(`charities/${charityId}/events/${eventId}/opportunities/${opportunityId}`)
        const newData = change.after.data()
        const numSignedUp = Math.max((newData.users && newData.users.length) || 0, 0)
        try {
            const data = await parentOppRef.set({ numSignedUp }, {merge: true})
            functions.logger.warn("There are " + numSignedUp + " signups")
            return data
        }
        catch(e) {
            functions.logger.warn("There was an error while counting signups")
            functions.logger.error(e)
        }
    })

exports.createSignups = functions.firestore
    .document("charities/{charityId}/events/{eventId}/opportunities/{opportunityId}")
    .onCreate(async (change, context) => {
        const {charityId, eventId, opportunityId} = context.params
        const childRef = db.doc(`charities/${charityId}/events/${eventId}/opportunities/${opportunityId}/signups/DEFAULT_SIGNUPS`)
        return childRef.create({users: []})
    })
