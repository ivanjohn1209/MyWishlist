// import React, { Component } from 'react'

// export default class SignupScreen extends Component {
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
// import SignupHeader from "../components/SignupHeader";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.ChangeScreen = this.ChangeScreen.bind(this);
  }

  onClickListener = (viewId) => {
    // var firebaseConfig = {
    //   apiKey: "AIzaSyCaR_jm_RGy7WJrXxkSKu3NDNj3hDdz0Ro",
    //   authDomain: "my-wishlist-ec34f.firebaseapp.com",
    //   databaseURL: "https://my-wishlist-ec34f.firebaseio.com",
    //   projectId: "my-wishlist-ec34f",
    //   storageBucket: "my-wishlist-ec34f.appspot.com",
    //   messagingSenderId: "787163673588",
    //   appId: "1:787163673588:web:8e28eddcd03dd784f7bfa1",
    //   measurementId: "G-PDFYNLRDL8",
    // };
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseConfig);
    // }
    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope("profile");
    // provider.addScope("https://www.googleapis.com/auth/drive");
    // firebase.auth().signInWithRedirect(provider);
    // //add the code below to your previous lines
    // firebase
    //   .auth()
    //   .getRedirectResult()
    //   .then(function (authData) {
    //     console.log(authData);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        {/* <SignupHeader /> */}

        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri:
                "https://i.pinimg.com/originals/bc/98/f1/bc98f123765331e8cdd75ac3bb361b2e.gif",
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabel}>Join Gifting</Text>
            <View style={styles.contenTextContainer}>
              <Text style={styles.contentText}>
                We'll help you create a new account in a few easy steps.
              </Text>
            </View>
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.NextButton]}
            onPress={() => this.ChangeScreen("Form")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
SignupScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%",
  },
  screenContainer: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    justifyContent: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  contentLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 14,
    textAlign: "center",
    color: "#606770",
  },
  contenTextContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    marginTop: 50,
    borderRadius: 5,
  },
  NextButton: {
    backgroundColor: "#aee4fc",
  },
  buttonText: {
    color: "white",
  },
});
