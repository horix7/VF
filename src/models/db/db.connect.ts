import admin from 'firebase-admin'

import serviceAccount from '../../../env/vfitness-8a2c3-firebase-adminsdk-7ey7n-7720c2573a.json';

const parseObj = JSON.stringify(serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(parseObj))
});

const db = admin.firestore();

export default db