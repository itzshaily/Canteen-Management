 // It’s a Firebase Cloud Function written in Node.js 
 // that verifies if a logged‑in user is an admin for your canteen management website.
// Imports the Firebase Functions SDK.
const functions = require('firebase-functions');
//  Imports the Firebase Admin SDK.
const admin = require('firebase-admin');  
// Initializes the Admin SDK so it knows which Firebase project to connect to.
admin.initializeApp();   

exports.isUserAdmin = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const uid = context.auth.uid;
  const userRef = admin.database().ref(`admins/${uid}`);
  const snapshot = await userRef.once('value');
  
  return { isAdmin: snapshot.exists() };
});

//User calls isUserAdmin from frontend.

//Cloud Function checks if the user is logged in.

//If logged in → fetches admins/{uid} from Firebase Realtime Database.

//Returns { isAdmin: true/false } depending on whether that record exists.
