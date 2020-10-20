import * as firebase from "firebase";
import "firebase/firestore";

export {
  //user related query
  CreateUser,
  GetUserData,
  GetUsers,
  CreateEvent,
  addFriend,
  getFriendReq,
  acceptFriend,
  getFriend,
  getEvents,
  GetNotFriendUsers,
  getWishlist,
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
    const users = [];
    return db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          users.push(doc.data());
        });
        const newArr = [];

        users.map((val, key1) => {
          if (val.user_uid !== user.uid) {
            newArr.push(val);
          }
        });
        return newArr;
      });
  }
}
function GetNotFriendUsers() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;

  if (user != null) {
    const users = [];
    return db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          users.push(doc.data());
        });
        const newArr = [];

        users.map((val, key1) => {
          if (val.user_uid !== user.uid) {
            newArr.push(val);
          }
        });
        return newArr;
      });
  }
}
function addFriend(val) {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var userData = doc.data();
          db.collection("users")
            .doc(val.user_uid)
            .collection("request")
            .doc(user.uid)
            .set({
              ...userData,
              friend: false,
            });
        } else {
          console.log("No such document!");
        }
      });
  }
}
function CreateEvent(
  event_title,
  event_start_date,
  event_end_date,
  attendees_invited,
  wishlist
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
            event_wishlist: wishlist,
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
function getFriendReq() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    const request = [];
    return db
      .collection("users")
      .doc(user.uid)
      .collection("request")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          request.push(doc.data());
        });
        return request;
      })
      .catch((error) => {
        alert(error);
      });
  }
}
function acceptFriend(val) {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var userData = doc.data();
          db.collection("users")
            .doc(val.user_uid)
            .collection("friends")
            .doc(user.uid)
            .set({
              ...userData,
              friend: true,
            });
          db.collection("users")
            .doc(user.uid)
            .collection("friends")
            .doc(val.user_uid)
            .set({
              ...val,
              friend: true,
            });
        } else {
          console.log("No such document!");
        }
      });
  }
}
function getFriend() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    const friends = [];
    return db
      .collection("users")
      .doc(user.uid)
      .collection("friends")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          friends.push(doc.data());
        });
        return friends;
      })
      .catch((error) => {
        alert(error);
      });
  }
}
function getEvents() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    const events = [];
    return db
      .collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          events.push(doc.data());
        });
        return events;
      });
  }
}
function getWishlist() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  if (user != null) {
    const wish_list = [];
    return db
      .collection("users")
      .doc(user.uid)
      .collection("wish_list")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          wish_list.push(doc.data());
        });
        return wish_list;
      })
      .catch((error) => {
        alert(error);
      });
  }
}
