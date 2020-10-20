import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  DatePicker,
  Header,
  Icon,
  Left,
  Right,
} from "native-base";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ScreenFooter from "../components/ScreenFooter";
import ScreenHeader from "../components/ScreenHeader";
import * as firebase from "firebase";
import "firebase/firestore";
import { GetUserData } from "../firebase/CRUD";
import { YellowBox } from "react-native";
import ImageUploader from "../components/ImageUploader";
YellowBox.ignoreWarnings(["Setting a timer"]);
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userData: [],
      renderEditProfileModal: false,
      renderChangePassModal: false,
      current_pass: "",
      new_pass: "",
      retype_new_pass: "",
      isLoading: false,
      image: [],
      settingLoading: true,
    };
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.getImageFile = this.getImageFile.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  logout() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          this.props.navigation.navigate("Login");
        }.bind(this)
      )
      .catch(function (error) {
        alert(error);
        // An error happened.
      });
  }
  getImageFile(e) {
    console.log(e);
    this.setState({
      image: e,
    });
  }
  editProfile() {
    // // Create a root reference
    // var storageRef = firebase.storage().ref();
    // // Create a reference to 'mountains.jpg'
    // var mountainsRef = storageRef.child("mountains.jpg");
    // // Create a reference to 'images/mountains.jpg'
    // var mountainImagesRef = storageRef.child("images/mountains.jpg");
    // // While the file names are the same, the references point to different files
    // mountainsRef.name === mountainImagesRef.name; // true
    // mountainsRef.fullPath === mountainImagesRef.fullPath; // false
    // var file = this.state.image.uri;
    // storageRef.put(file).then(function (snapshot) {
    //   console.log("Uploaded a blob or file!");
    // });
    alert("still Working");
  }

  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      GetUserData().then((result) => {
        this.setState({
          userData: result,
          settingLoading: false,
        });
      });
    });
  }
  updatePassword() {
    var newpass = this.state.new_pass;
    var retypeNewpass = this.state.retype_new_pass;
    this.setState({ isLoading: true });

    if (newpass == retypeNewpass) {
      firebase
        .auth()
        .currentUser.updatePassword(newpass)
        .then(function () {
          //Do something
          this.setState({ isLoading: false, renderChangePassModal: false });
          alert("Change Password Successfully");
        })
        .catch(function (err) {
          alert(err);
          //Do something
        });
    } else {
      alert("Incorrect Password");
    }
  }
  renderEditProfile() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.renderEditProfileModal}
        title=""
        onRequestClose={() => this.setState({ renderEditProfileModal: false })}
      >
        <Header
          style={{
            backgroundColor: "#f3f3f3",
            borderBottomColor: "#dddfe2",
            borderBottomWidth: 1,
          }}
        >
          <Left>
            <Button
              transparent
              onPress={() => this.setState({ renderEditProfileModal: false })}
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </Button>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Edit Profile</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.editProfile()}>
              <Text style={{ fontWeight: "bold" }}>Save</Text>
            </Button>
          </Right>
        </Header>

        <ScrollView>
          <View style={passModalStyle.container}>
            <View style={passModalStyle.formContainer}>
              <ImageUploader
                PokemonImage="https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                getImageFile={this.getImageFile}
              />
              <View style={passModalStyle.formInputContainer}>
                <Text style={styles.itemLabel}>Name</Text>
                <View style={passModalStyle.inputContainer}>
                  <TextInput
                    style={passModalStyle.inputs}
                    placeholder="Name"
                    defaultValue={this.state.userData.user_name}
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => this.handleChange(e, "new_pass")}
                  />
                </View>
                <Text style={styles.itemLabel}>Birthday</Text>
                <View style={passModalStyle.inputContainer}>
                  <DatePicker />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
  renderChangePass() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.renderChangePassModal}
        title=""
        onRequestClose={() => this.setState({ renderChangePassModal: false })}
      >
        <Header
          style={{
            backgroundColor: "#fff",
            borderBottomColor: "#dddfe2",
            borderBottomWidth: 1,
          }}
        >
          <Left>
            <TouchableOpacity
              onPress={() => this.setState({ renderChangePassModal: false })}
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Change Password</Text>
          </Body>
          <Right></Right>
        </Header>

        <ScrollView>
          <View style={passModalStyle.container}>
            <View style={passModalStyle.formContainer}>
              <Text style={passModalStyle.nameTittle}>Change Password</Text>
              <View style={passModalStyle.formInputContainer}>
                <Text style={styles.itemLabel}>New Password*</Text>
                <View style={passModalStyle.inputContainer}>
                  <TextInput
                    style={passModalStyle.inputs}
                    placeholder="New Password*"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(e) => this.handleChange(e, "new_pass")}
                  />
                </View>
                <Text style={styles.itemLabel}>Re-type New Password*</Text>
                <View style={passModalStyle.inputContainer}>
                  <TextInput
                    style={passModalStyle.inputs}
                    placeholder="Re-type New Password*"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(e) =>
                      this.handleChange(e, "retype_new_pass")
                    }
                  />
                </View>
              </View>
              <Button
                style={[
                  passModalStyle.buttonContainer,
                  passModalStyle.loginButton,
                ]}
                onPress={() => this.updatePassword()}
              >
                {this.state.isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={passModalStyle.loginText}>Update Password</Text>
                )}
              </Button>
            </View>
          </View>
        </ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.state.settingLoading ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ActivityIndicator size="large" color="#aee4fc" />
          </View>
        ) : (
          <ImageBackground
            source={require("../assets/img/background1.jpg")}
            style={styles.backgroundImg}
          >
            <Content>
              <View>
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <View style={styles.header}>
                      <View style={styles.mainImageContainer}>
                        <Image
                          style={styles.mainImage}
                          source={{
                            uri:
                              this.state.user.photoURL == null ||
                              this.state.user.photoURL == ""
                                ? "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                                : this.state.user.photoURL,
                          }}
                        />
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View style={styles.activity}>
                          <Text style={styles.userName}>
                            {this.state.userData.user_name}
                          </Text>
                        </View>
                        <View style={styles.activity}>
                          <Text>
                            Birthday: {this.state.userData.user_birthday}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <Content>
                  <Card style={styles.settingCard}>
                    <Text style={styles.settingCardLabel}>ACCOUNT</Text>
                    <CardItem
                      button
                      onPress={() =>
                        this.setState({ renderEditProfileModal: true })
                      }
                    >
                      <Icon active name="person" style={{ color: "#aee4fc" }} />
                      <Text>Edit Profile</Text>
                    </CardItem>
                    <CardItem
                      button
                      onPress={() =>
                        this.setState({ renderChangePassModal: true })
                      }
                    >
                      <Icon
                        active
                        name="ios-key"
                        style={{ color: "#aee4fc" }}
                      />
                      <Text>Change Password</Text>
                    </CardItem>
                  </Card>
                  <Card style={styles.settingCard}>
                    <Text style={styles.settingCardLabel}>PREFERENCE</Text>
                    <CardItem
                      button
                      onPress={() =>
                        this.props.navigation.navigate("Notification")
                      }
                    >
                      <Icon
                        active
                        name="notifications"
                        style={{ color: "#aee4fc" }}
                      />
                      <Text>Notification</Text>
                    </CardItem>
                    <CardItem header button onPress={() => this.logout()}>
                      <Icon
                        active
                        name="ios-log-out"
                        style={{ color: "#aee4fc" }}
                      />
                      <Text>Log-out</Text>
                    </CardItem>
                  </Card>
                </Content>
              </View>
            </Content>
          </ImageBackground>
        )}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScreenFooter navigation={this.props.navigation} />
        {this.renderEditProfile()}
        {this.renderChangePass()}
      </Container>
    );
  }

  renderHeader() {
    return (
      <Header
        hasTabs
        style={{
          backgroundColor: "#fff",
          borderBottomColor: "#dddfe2",
          borderBottomWidth: 1,
        }}
      >
        <Body style={styles.headerTab}>
          <Text style={styles.headerLabel}>Settings</Text>
        </Body>
      </Header>
    );
  }
}
SettingScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  mainImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 100,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
  },
  headerTab: {
    alignItems: "center",
  },

  headerLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    paddingLeft: 10,
  },
  userName: {
    fontSize: 20,
    color: "#1c1c1c",
    fontWeight: "bold",
  },

  /******** card **************/

  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 10,
  },
  settingCard: {
    elevation: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  settingCardLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#aee4fc",
    marginLeft: 30,
    marginTop: 20,
  },
});
const passModalStyle = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    borderRadius: 5,
    alignSelf: "center",
    elevation: 0,
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
    textAlign: "center",
  },
});
