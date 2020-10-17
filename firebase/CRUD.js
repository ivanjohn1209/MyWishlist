// import
// var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });
import * as firebase from "firebase";
import "firebase/firestore";

export {
  //user related query
  CreateUser,
  GetUserData,
  GetUsers,
  CreateEvent,
  addFriend,
  //   CreateUserinDatabase,
};
function CreateUser(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
}
function GetUserData() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("No such document!");
        }
      });
  }
}
function GetUsers() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    return db
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          return doc.data();
        });
      });
  }
}
function addFriend(val) {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    var data = {
      ...val,
      friend: false,
    };
    var db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .collection("friendRequest")
      .add(data)
      .then(function (res) {})
      .catch(function (error) {
        alert(error);
      });
  }
}
function CreateEvent(
  event_title,
  event_start_date,
  event_end_date,
  attendees_invited
) {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var data = {
            event_title: event_title,
            event_start_date: event_start_date,
            event_end_date: event_end_date,
            user_creator: doc.data(),
            event_attendees: attendees_invited,
          };
          var db = firebase.firestore();
          db.collection("events")
            .add(data)
            .then(function (res) {})
            .catch(function (error) {
              alert(error);
            });
        } else {
          console.log("No such document!");
        }
      });
  }
}
