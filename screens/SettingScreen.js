import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
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
} from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ScreenFooter from "../components/ScreenFooter";
import ScreenHeader from "../components/ScreenHeader";
import * as firebase from "firebase";
import "firebase/firestore";
import { GetUserData } from "../firebase/CRUD";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userData: [],
      renderEditProfileModal: false,
    };
    this.logout = this.logout.bind(this);
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

    // var user = firebase.auth().currentUser;
    // user
    //   .updateProfile({
    //     displayName: "Jane Q. User",
    //     photoURL:
    //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //   })
    //   .then(function () {
    //     // Update successful.
    //   })
    //   .catch(function (error) {
    //     // An error happened.
    //   });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      GetUserData().then((result) => {
        this.setState({
          userData: result,
        });
      });
    });
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
            <TouchableOpacity
              onPress={() => this.setState({ renderEditProfileModal: false })}
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Edit Profile</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.Verify()}>
              <Text style={{ fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content style={{ backgroundColor: "#f3f3f3" }}>
          <Text>test</Text>
        </Content>
      </Modal>
    );
  }
  render() {
    return (
      <Container>
        {/* <ScreenHeader navigation={this.props.navigation} /> */}
        {this.renderHeader()}
        <ImageBackground
          source={{
            uri:
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDRUNDQ8VFRUVFRUVFRUVFRUVFRUVFRUWFxUVFRUdHSggGB0lHRUVITEhJSktLi4uFx8/PT8sOigyNSsBCgoKDQ0NFQ0NFSsZHx0rKysrKysrLSsrKysrKysrKysrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARwAsQMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAFxABAQEBAAAAAAAAAAAAAAAAABHwQf/EABkBAQEBAAMAAAAAAAAAAAAAAAABAgMEBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDp4o9B2qgoFQUCoKBUFAqCgVBUCgAtAAoChUACkACqKIxUFAqCgVBRSoKBUFAqCgVBQKgoFQUCoKBUFAqiiMVBQKgoFQUCoKBUFAqCgVBQKhFAqQigVAAoKBQURioKBUFAqCgVBQKgoFQUFqCgVBQKgoFQUCoLAKQiiOOkRQWpCKBUhFAqCgVBQKkFAqEUCoKBUIoFQUCpBQKoojjqAoVBQKgoq1BUCgAUACgoFQVAoKgUACgAVRRGEFAqCgVBQKgoFQUCoKBUFAqCgIKBUFAqCgUFEYqCgVBQKgoFQUFqCgVBQKgoFQVAoKBUFAqCgUAGKABQAAAAAKABQAKABQAKABQAKAAAIyAAAACoFBUUBRCoAAKAgqKUFEEFAqAqlQQGVEAUQBRAFEAUQBRAFEUARRQAAAQCgICKiiAKIAogCggKCAogCgACCCiAVRAFABBBWVEAUQBRAFEAUQBRAFEAUQBQAABQEAKgrK0QBRAFKgClQBRAFEAUQBRAFEAUQBRNwBCpRWVolBVKgiKJVFFZBFVAFGQVoQBRAFEAUQBagAgzSqy0M0oNDNKDQgCiUBRAFEAqiAKJQKogCiUoKJQGRFaQEUAEBQAAAAAAAAAAEFQAUQAABKURUWlACiCiiCC0RQAQFEAUQBRAFEAUQBRKCv/Z",
          }}
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

                  <CardItem>
                    <Icon active name="person" style={{ color: "#aee4fc" }} />
                    <Text>Edit Profile</Text>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ renderEditProfileModal: true })
                        }
                      >
                        <Icon name="ios-arrow-forward" />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Icon active name="ios-key" style={{ color: "#aee4fc" }} />
                    <Text>Change Password</Text>
                    <Right style={{ alignItems: "flex-end" }}>
                      <Icon name="ios-arrow-forward" />
                    </Right>
                  </CardItem>
                </Card>
                <Card style={styles.settingCard}>
                  <Text style={styles.settingCardLabel}>PREFERENCE</Text>
                  <CardItem>
                    <Icon
                      active
                      name="notifications"
                      style={{ color: "#aee4fc" }}
                    />
                    <Text>Notification</Text>
                    <Right>
                      <Icon name="ios-arrow-forward" />
                    </Right>
                  </CardItem>
                  <CardItem header button onPress={() => this.logout()}>
                    <Icon
                      active
                      name="ios-log-out"
                      style={{ color: "#aee4fc" }}
                    />
                    <Text>Log-out</Text>
                    <Right>
                      <TouchableOpacity onPress={() => this.logout()}>
                        <Icon
                          active
                          name="ios-log-out"
                          style={{ color: "#aee4fc" }}
                        />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </Card>
              </Content>
            </View>
          </Content>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        </ImageBackground>
        <ScreenFooter navigation={this.props.navigation} />
        {this.renderEditProfile()}
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
          {/* <Image
            style={styles.logo}
            source={{
              uri:
                "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/gflxswksboo6xi1wpiwd",
            }}
          /> */}
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
    // justifyContent: "center",
    // alignItems: "center",
  },
  mblTxt: {
    fontWeight: "200",
    color: "#fff",
    fontSize: 13,
  },
  AddButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#aee4fc",
  },
  headerTab: {
    alignItems: "center",
  },
  smallImagesContainer: {
    flexDirection: "column",
    marginLeft: 30,
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    paddingLeft: 10,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  btnColor: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 3,
  },
  contentColors: {
    flexDirection: "row",
  },
  userName: {
    fontSize: 20,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: "#696969",
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  /******** card **************/

  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: "#00BFFF",
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
