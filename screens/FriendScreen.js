// import { Container, Content } from "native-base";
// import React, { Component } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import ScreenFooter from "../components/ScreenFooter";
// import ScreenHeader from "../components/ScreenHeader";

// export default class FriendScreen extends Component {
//   render() {
//     return (
//       <Container>
//         <ScreenHeader />
//         <Content></Content>
//         <ScreenFooter navigation={this.props.navigation} />
//       </Container>
//     );
//   }
// }
// FriendScreen.navigationOptions = {
//   headerShown: false,
// };
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//   },
// });
import { Container, Icon, Tab, TabHeading, Tabs } from "native-base";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import ScreenFooter from "../components/ScreenFooter";
import ScreenHeader from "../components/ScreenHeader";
import * as firebase from "firebase";
import "firebase/firestore";
import { addFriend } from "../firebase/CRUD";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: "Mark Doe",
          status: "active",
          image:
            "https://www.hashatit.com/images/uploads/users/74336/profile_picture/189315459.jpg",
        },
        {
          id: 2,
          name: "Clark Man",
          status: "active",
          image:
            "https://us.123rf.com/450wm/fizkes/fizkes1904/fizkes190400933/121256725-head-shot-portrait-of-smiling-middle-aged-businessman-sitting-at-work-desk-looking-in-camera-success.jpg?ver=6",
        },
        {
          id: 3,
          name: "Jaden Boor",
          status: "active",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2BaFDz6mMNbafjmCKlKbHosJDTkBoXVbXwg&usqp=CAU",
        },
        {
          id: 4,
          name: "Srick Tree",
          status: "active",
          image:
            "https://pbs.twimg.com/profile_images/901536975676723200/tx7cwcdZ_400x400.jpg",
        },
        {
          id: 5,
          name: "Erick Doe",
          status: "active",
          image:
            "https://pbs.twimg.com/profile_images/830082399308361730/nMCGQXS1_400x400.jpg",
        },
        {
          id: 6,
          name: "Francis Doe",
          status: "active",
          image:
            "https://media.glassdoor.com/people/sqll/547888/stock-development-ceo1541641646409.png",
        },
        {
          id: 8,
          name: "Matilde Doe",
          status: "active",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6HPnNzQuZypt_TKeaPlHGjj1WCBLTbAt98A&usqp=CAU",
        },
        {
          id: 9,
          name: "John Doe",
          status: "active",
          image:
            "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        },
        {
          id: 10,
          name: "Fermod Doe",
          status: "active",
          image:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        },
        {
          id: 11,
          name: "Danny Doe",
          status: "active",
          image:
            "https://i.pinimg.com/originals/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg",
        },
      ],
      allUser: [],
      usersLoading: true,
    };
    this.getUsers = this.getUsers.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }
  addFriend(val) {
    addFriend(val);
    this.setState({ addEventModal: false });
  }
  getUsers() {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;

    if (user != null) {
      const items = [];
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            items.push(doc.data());
          });
          // console.log(items);
          // const ListUsers = [];
          items.map((val, key1) => {
            if (val.user_uid !== user.uid) {
              const items = [val];

              this.setState({
                allUser: items,
                usersLoading: false,
              });
            }
          });
        });
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getUsers();
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderAddFamily = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <TouchableOpacity style={styles.AddButton}>
                <Text style={styles.mblTxt}>Add Friend</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>Birthday</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Container>
        <ScreenHeader navigation={this.props.navigation} />

        <Tabs
          tabContainerStyle={{
            elevation: 0,
          }}
          tabBarUnderlineStyle={{ borderBottomWidth: 2 }}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Icon name="people" style={{ color: "#1c1c1c" }} />
              </TabHeading>
            }
          >
            <View style={{ flex: 1 }}>
              <FlatList
                extraData={this.state}
                data={this.state.calls}
                keyExtractor={(item) => {
                  return item.id;
                }}
                renderItem={this.renderItem}
              />
            </View>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Icon style={{ color: "#1c1c1c" }} name="ios-person-add" />
              </TabHeading>
            }
          >
            {this.state.usersLoading ? (
              <View
                style={{
                  top: 30,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#aee4fc" />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                {/* <FlatList
                extraData={this.state}
                data={this.state.allUser}
                renderItem={this.renderAddFamily}
              /> */}
                {this.state.allUser.map((val, key) => {
                  console.log(val);
                  return (
                    <TouchableOpacity>
                      <View style={styles.row}>
                        <Image
                          source={{
                            uri:
                              "https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png",
                          }}
                          style={styles.pic}
                        />
                        <View>
                          <View style={styles.nameContainer}>
                            <Text
                              style={styles.nameTxt}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {val.user_name}
                            </Text>
                            <TouchableOpacity
                              style={styles.AddButton}
                              onPress={() => this.addFriend(val)}
                            >
                              <Text style={styles.mblTxt}>Add Friend</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>Birthday</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </Tab>
        </Tabs>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScreenFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
FriendScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
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
  familyHeader: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  FamilyLabel: {
    fontSize: 23,
    fontWeight: "bold",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#fff",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#EBEBEB",
    borderRadius: 100,
    padding: 5,
    alignItems: "flex-end",
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    textAlign: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
});
