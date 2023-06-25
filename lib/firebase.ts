import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);
// console.log(admin.app.length);

if (!admin.apps.length) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
   });
}
const firebase = admin.firestore();
export { firebase };
