import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  StatusBar,
  Modal,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase";
import { Body, Header, Right } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      email: "",
      password: "",
      ResetemailPass: "",
      isLoading: false,
      isLoadingScreen: true,
      forgotPasswordModal: false,
    };
    this.ChangeScreen = this.ChangeScreen.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.ResetemailPass = this.ResetemailPass.bind(this);
  }
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }
  async saveData(data) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      this.props.navigation.navigate("Home");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  handleLogin(e) {
    this.setState({
      isLoading: true,
    });
    var email = this.state.email;
    var password = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.props.navigation.navigate("Home");
        this.setState({
          isLoading: false,
        });
      })
      .catch(
        function (error) {
          // Handle Errors here.
          if (error) {
            alert(error);
          }
          this.setState({
            isLoading: false,
          });
          // ...
        }.bind(this)
      );
  }
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  componentDidMount() {
    this.mounted = true;
    if (this.mounted == true) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.emailVerified);
          const { currentUser } = firebase.auth();
          if (user.emailVerified) {
            this.props.navigation.navigate("Home");
            this.setState({ isLoadingScreen: false });
          } else {
            this.props.navigation.navigate("Confirmation");
            this.setState({ isLoadingScreen: false });
          }
          // store.dispatch(userLoggedIn(currentUser.uid));

          // this.props.navigation.navigate("Home");
          // save the current user's uid to redux store.
        } else {
          this.setState({ isLoadingScreen: false });
          // this.props.navigation.navigate("Login");
          // delete the current user's uid from the redux store.
        }
      });
    }
  }
  ResetemailPass() {
    var auth = firebase.auth();
    var emailAddress = this.state.ResetemailPass;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  forgotPasswordModal() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.forgotPasswordModal}
        title=""
        onRequestClose={() => this.setState({ forgotPasswordModal: false })}
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
            <Text style={{ fontWeight: "bold" }}>Reset Password</Text>
          </Body>
          <Right>
            <TouchableHighlight
              onPress={() => this.setState({ forgotPasswordModal: false })}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </TouchableHighlight>
          </Right>
        </Header>

        <ScrollView>
          <View style={forgotpasswordStyle.container}>
            {/* <SignupHeader /> */}
            <View style={forgotpasswordStyle.formContainer}>
              <Text style={forgotpasswordStyle.nameTittle}>
                Forgot Password
              </Text>
              <View style={forgotpasswordStyle.formInputContainer}>
                <Text style={styles.itemLabel}>Enter Email*</Text>
                <View style={forgotpasswordStyle.inputContainer}>
                  <TextInput
                    style={forgotpasswordStyle.inputs}
                    placeholder="example@gmail.com*"
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => this.handleChange(e, "ResetemailPass")}
                  />
                </View>
              </View>

              <TouchableHighlight
                style={[
                  forgotpasswordStyle.buttonContainer,
                  forgotpasswordStyle.loginButton,
                ]}
                onPress={() => this.ResetemailPass()}
              >
                {this.state.isLoadingVerify == true ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={forgotpasswordStyle.loginText}>
                    Reset Password
                  </Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoadingScreen == true ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.logoLoading}
              source={{
                uri:
                  "https://i.pinimg.com/originals/bc/98/f1/bc98f123765331e8cdd75ac3bb361b2e.gif",
              }}
            />
          </View>
        ) : (
          <ImageBackground
            source={require("../assets/img/background1.jpg")}
            style={styles.backgroundImg}
          >
            <Image
              style={styles.logo}
              source={require("../assets/logo2.png")}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({ email })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Forgot Password?</Text>
              <TouchableOpacity
                onPress={() => this.setState({ forgotPasswordModal: true })}
              >
                <Text
                  style={{
                    color: "#3676e1",
                    fontWeight: "bold",
                    paddingHorizontal: 5,
                  }}
                >
                  Recover here
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.handleLogin()}
            >
              {this.state.isLoading == true ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.buttonSignup}>
              <Text>Don't have account?</Text>
              <TouchableOpacity onPress={() => this.ChangeScreen("Signup")}>
                <Text
                  style={{
                    color: "#3676e1",
                    fontWeight: "bold",
                    paddingHorizontal: 5,
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonSignup}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.ChangeScreen("Signup")}
              >
                <Text style={styles.buttonText}>CREATE NEW ACCOUNT</Text>
              </TouchableOpacity>
            </View> */}
          </ImageBackground>
        )}
        {this.forgotPasswordModal()}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </View>
    );
  }
}
LoginScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    color: "#3676e1",
    fontWeight: "bold",
  },
  logo: {
    height: 90,
    width: 90,
    resizeMode: "contain",
    marginBottom: 20,
  },
  logoLoading: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSignup: {
    paddingVertical: 30,
    flexDirection: "row",
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
    width: 250,
    backgroundColor: "#aee4fc",
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#aee4fc",
  },
});
const forgotpasswordStyle = StyleSheet.create({
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
