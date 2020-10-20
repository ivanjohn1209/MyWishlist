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
  StatusBar,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";

export default class SignupConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
    this.ChangeScreen = this.ChangeScreen.bind(this);
    this.CreateAccount = this.CreateAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  CreateAccount() {
    this.setState({ isLoading: true });
    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        alert(error);
        // An error happened.
      });
    this.setState({ isLoading: false });
    this.props.navigation.navigate("Login");
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.nameTittle}>Verify your Account</Text>
          <View style={styles.formInputContainer}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https://cdn.snov.io/img/pages/email-verifier/postmansmnew.png?684c64f8902b377725a247d9fd5b2e31",
              }}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.CreateAccount()}
          >
            {this.state.isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Verify Email</Text>
            )}
          </TouchableHighlight>
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </View>
    );
  }
}
SignupConfirmation.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    borderBottomColor: "#dddfe2",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  formContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  formInputContainer: {
    marginTop: 30,
  },
  inputs: {
    height: 45,
    marginLeft: 10,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    justifyContent: "center",
    marginBottom: 20,
    resizeMode: "contain",
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
    borderRadius: 5,
  },
  nameTittle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#4300af",
  },
  loginText: {
    color: "white",
  },
});
