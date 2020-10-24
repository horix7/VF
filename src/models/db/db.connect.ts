import admin from 'firebase-admin'

import serviceAccount from './adminsdk.json';

const parseObj = JSON.stringify(serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(parseObj)),
  storageBucket: "gs://vfitness-8a2c3.appspot.com"
});

const db = admin.firestore();


export default db