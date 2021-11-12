import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAAO_2S6To-Yv-9-wSm8K20y8jPFh_DM4w",
  authDomain: "broxford-school.firebaseapp.com",
  projectId: "broxford-school",
  storageBucket: "broxford-school.appspot.com",
  messagingSenderId: "614930562233",
  appId: "1:614930562233:web:5626b4a469f4286d1cef68",
  measurementId: "G-BB25XW1VF7"
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
      .collection("user_data")
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
