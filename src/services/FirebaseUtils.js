import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_6EMUy6h2kBM0qsTHCYli6IcVyvh4bnM",
  authDomain: "doorstepclasses-3634f.firebaseapp.com",
  databaseURL: "https://doorstepclasses-3634f.firebaseio.com",
  projectId: "doorstepclasses-3634f",
  storageBucket: "doorstepclasses-3634f.appspot.com",
  messagingSenderId: "862257826421",
  appId: "1:862257826421:web:e03091f1ed9212432f863c",
  measurementId: "G-B1DHRTY5G6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default {
  firebase() {
    return firebase;
  },
  database() {
    return firebase.database();
  },
  auth() {
    return firebase.auth();
  },
  googleAuth() {
    return new firebase.auth.GoogleAuthProvider();
  },
  storage() {
    return firebase.storage();
  },
  firestore() {
    return firebase.firestore();
  },
  async getUserData(email) {
    let userData = null;
    await firebase
      .firestore()
      .collection("users_info")
      .where("emailAddress", "==", email)
      .get()
      .then(function(doc) {
        doc.forEach(data => (userData = data.data()));
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    return userData;
  }
};
