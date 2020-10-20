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
import {
  addFriend,
  getFriendReq,
  GetNotFriendUsers,
  acceptFriend,
  getFriend,
} from "../firebase/CRUD";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      request: [],
      allFriends: [],
      usersLoading: true,
    };
    this.addFriend = this.addFriend.bind(this);
    this.acceptFriend = this.acceptFriend.bind(this);
    this.getListData = this.getListData.bind(this);
  }
  addFriend(val) {
    addFriend(val);
    this.getListData();
  }
  acceptFriend(val) {
    acceptFriend(val);
    this.getListData();
  }
  getListData() {
    const promise1 = new Promise((resolve, reject) => {
      return getFriendReq().then((res) => {
        resolve(res);
      });
    });

    const promise2 = new Promise((resolve, reject) => {
      return GetNotFriendUsers().then((res) => {
        resolve(res);
      });
    });
    const promise3 = new Promise((resolve, reject) => {
      return getFriend().then((res) => {
        resolve(res);
      });
    });

    Promise.all([promise1, promise2, promise3]).then((values) => {
      let alluser = values[1];
      let firends = values[2];
      let FriendFilter = firends.map((itemY) => {
        return itemY.user_uid;
      });
      let filteredUser = alluser.filter(
        (itemX) => !FriendFilter.includes(itemX.user_uid)
      );
      let request = values[0];
      let requestFilter = firends.map((itemY) => {
        return itemY.user_uid;
      });
      let requestFilterArr = request.filter(
        (itemX) => !requestFilter.includes(itemX.user_uid)
      );
      this.setState({
        request: requestFilterArr,
        allUser: filteredUser,
        allFriends: values[2],
        usersLoading: false,
      });
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getListData();
    });
  }

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
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {this.state.allFriends.length == 0 ? (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Icon name="people" style={{ color: "#1c1c1c" }} />
                      <Text style={{ color: "#1c1c1c", paddingHorizontal: 10 }}>
                        No Friends
                      </Text>
                    </View>
                  ) : (
                    this.state.allFriends.map((val, key) => {
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
                            <View style={styles.nameContainer}>
                              <Text style={styles.nameTxt} ellipsizeMode="tail">
                                {val.user_name}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
              )}
            </View>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Icon style={{ color: "#1c1c1c" }} name="ios-person-add" />
              </TabHeading>
            }
          >
            <ScrollView>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Friend Request
              </Text>
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
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {this.state.request.length == 0 ? (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        paddingVertical: 40,
                      }}
                    >
                      <Icon name="people" style={{ color: "#1c1c1c" }} />
                      <Text style={{ color: "#1c1c1c", paddingHorizontal: 10 }}>
                        No Friend Request
                      </Text>
                    </View>
                  ) : (
                    this.state.request.map((val, key) => {
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
                            <View style={styles.nameContainer}>
                              <Text style={styles.nameTxt} ellipsizeMode="tail">
                                {val.user_name}
                              </Text>
                              <TouchableOpacity
                                style={styles.AddButton}
                                onPress={() => this.acceptFriend(val)}
                              >
                                <Text style={styles.mblTxt}>Accept</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
              )}

              <View
                style={{
                  borderBottomColor: "#dddfe2",
                  borderBottomWidth: 1,
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Find Friends
              </Text>
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
                  {this.state.allUser.map((val, key) => {
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
                          <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} ellipsizeMode="tail">
                              {val.user_name}
                            </Text>
                            <TouchableOpacity
                              style={styles.AddButton}
                              onPress={() => this.addFriend(val)}
                            >
                              <Text style={styles.mblTxt}>Add Friend</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>
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
    backgroundColor: "#fff",
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
