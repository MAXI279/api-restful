
const admin = require('firebase-admin')

const firebaseConnection = () => {
  const serviceAccount = require('./basefirebase-ee436-firebase-adminsdk-pum5q-08c571dbf4.json')

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://basefirebase-ee436.firebaseio.com'
    })
    console.info('[firebase] Firestore conectado')
  }
  return admin.firestore()
}

module.exports = firebaseConnection
