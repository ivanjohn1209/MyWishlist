import { Body, DatePicker, Header, Icon, Left, Right } from "native-base";
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
  Modal,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CreateUser } from "../firebase/CRUD";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      birthday: "",
      reTypePassword: "",
      renderEmailPassForm: false,
      isLoading: false,
    };
    this.ChangeScreen = this.ChangeScreen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CreateAccount = this.CreateAccount.bind(this);
    this.signInGoogle = this.signInGoogle.bind(this);
  }
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  CreateAccount() {
    var username = this.state.username;
    var email = this.state.email;
    var password = this.state.password;
    var birthday = this.state.birthday;
    var reTypePassword = this.state.reTypePassword;
    var dateObj = new Date(birthday);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();

    var newdate = year + "-" + month + "-" + day;
    if (reTypePassword === password) {
      this.setState({ isLoading: true });
      CreateUser(email, password)
        .then((result) => {
          var db = firebase.firestore();
          var frankDocRef = db.collection("users").doc(result.user.uid);
          frankDocRef
            .set({
              user_name: username,
              user_birthday: newdate,
              user_email: email,
              user_uid: result.user.uid,
            })
            .then(function (docRef) {})
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
          this.setState({ isLoading: false, renderEmailPassForm: false });

          this.props.navigation.navigate("Confirmation");
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          alert(error);
        });
    } else {
      alert("Password is Incorrect");
    }
  }
  signInGoogle() {
    // Google provider object is created here.
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        console.log(error);

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          style={{
            backgroundColor: "#fff",
            borderBottomColor: "#dddfe2",
            borderBottomWidth: 1,
            elevation: 0,
          }}
        >
          <Left>
            <TouchableOpacity onPress={() => this.ChangeScreen("Login")}>
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Create Account</Text>
          </Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <View style={styles.formContainer}>
            <Text style={styles.nameTittle}>What's your Detail?</Text>
            <View style={styles.formInputContainer}>
              <Text style={styles.itemLabel}>Full Name*</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  // defaultValue={newUser.first_name}
                  style={styles.inputs}
                  placeholder="Full Name*"
                  // keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={(e) => this.handleChange(e, "username")}
                />
              </View>
              <Text style={styles.itemLabel}>Select Birthday*</Text>

              <View style={styles.inputContainer}>
                <DatePicker
                  style={{ width: 200 }}
                  mode="date"
                  date=""
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(e) => this.handleChange(e, "birthday")}
                />
              </View>
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.setState({ renderEmailPassForm: true })}
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.signInGoogle()}
          >
            <Text style={styles.loginText}>Sign-in With Google</Text>
          </TouchableHighlight> */}
          </View>
        </ScrollView>

        {this.renderEmailPassForm()}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </View>
    );
  }
  renderEmailPassForm() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.renderEmailPassForm}
        title=""
        onRequestClose={() => this.setState({ renderEmailPassForm: false })}
      >
        <Header
          style={{
            backgroundColor: "#fff",
            borderBottomColor: "#dddfe2",
            borderBottomWidth: 1,
          }}
        >
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Create Account</Text>
          </Body>
          <Right>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </TouchableHighlight>
          </Right>
        </Header>
        <ScrollView>
          <View style={emailSectionStyle.container}>
            {/* <SignupHeader /> */}
            <View style={emailSectionStyle.formContainer}>
              <Text style={emailSectionStyle.nameTittle}>
                What's your Email & Password?
              </Text>
              <View style={emailSectionStyle.formInputContainer}>
                <Text style={styles.itemLabel}>Email*</Text>
                <View style={emailSectionStyle.inputContainer}>
                  <TextInput
                    style={emailSectionStyle.inputs}
                    placeholder="Email*"
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => this.handleChange(e, "email")}
                  />
                </View>
                <Text style={styles.itemLabel}>Password*</Text>
                <View style={emailSectionStyle.inputContainer}>
                  <TextInput
                    style={emailSectionStyle.inputs}
                    placeholder="Password*"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(e) => this.handleChange(e, "password")}
                  />
                </View>
                <Text style={styles.itemLabel}>Re-type Password*</Text>
                <View style={emailSectionStyle.inputContainer}>
                  <TextInput
                    style={emailSectionStyle.inputs}
                    placeholder="Re-type Password*"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(e) => this.handleChange(e, "reTypePassword")}
                  />
                </View>
              </View>

              <TouchableHighlight
                style={[
                  emailSectionStyle.buttonContainer,
                  emailSectionStyle.loginButton,
                ]}
                onPress={() => this.CreateAccount()}
              >
                {this.state.isLoading == true ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={emailSectionStyle.loginText}>Create</Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
}
SignupForm.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  itemLabel: {
    fontWeight: "bold",
    fontSize: 15,
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
    backgroundColor: "#aee4fc",
  },
  loginText: {
    color: "white",
  },
});
const emailSectionStyle = StyleSheet.create({
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
    backgroundColor: "#aee4fc",
  },
  loginText: {
    color: "white",
  },
});
