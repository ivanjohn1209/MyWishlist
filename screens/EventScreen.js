import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  DatePicker,
  Fab,
  Header,
  Icon,
  Label,
  Left,
  List,
  ListItem,
  Right,
  Thumbnail,
  Button,
} from "native-base";
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
  Modal,
  TouchableHighlight,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ScreenFooter from "../components/ScreenFooter";
import ScreenHeader from "../components/ScreenHeader";
import { CreateEvent } from "../firebase/CRUD";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
import * as firebase from "firebase";
import "firebase/firestore";
import { getFriend, getEvents, getWishlist } from "../firebase/CRUD";
export default class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEventModal: false,
      attendeesModal: false,
      event_end_date: "",
      event_title: "",
      event_start_date: "",
      attendees_invited: [],
      eventList: [],
      eventLoading: true,
      eventDetailsModal: false,
      eventDetails: [],
      eventFriendList: [],
      wishlist: [],
      wishListModal: false,
      giftData: [],
    };
    this.CreateEvent = this.CreateEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.invite = this.invite.bind(this);
    this.remove_attendees = this.remove_attendees.bind(this);
    this.addGift = this.addGift.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.getListData = this.getListData.bind(this);
  }
  getListData() {
    const promise1 = new Promise((resolve, reject) => {
      return getFriend().then((res) => {
        resolve(res);
      });
    });

    const promise2 = new Promise((resolve, reject) => {
      return getEvents().then((res) => {
        resolve(res);
      });
    });
    const promise3 = new Promise((resolve, reject) => {
      return getWishlist().then((res) => {
        resolve(res);
      });
    });
    Promise.all([promise1, promise2, promise3]).then((values) => {
      this.setState({
        eventFriendList: values[0],
        eventList: values[1],
        wishlist: values[2],
        eventLoading: false,
      });
    });
  }
  CreateEvent() {
    var event_title = this.state.event_title;
    var event_start_date = this.dateChange(this.state.event_start_date);
    var event_end_date = this.dateChange(this.state.event_end_date);
    var wishlist = this.state.giftData;
    var attendees_invited = this.state.attendees_invited;
    CreateEvent(
      event_title,
      event_start_date,
      event_end_date,
      attendees_invited,
      wishlist
    );
    this.setState({ addEventModal: false });
    this.getListData();
  }
  handleChange(e, name) {
    this.setState({
      [name]: e,
    });
  }
  invite(e) {
    var x = this.state.attendees_invited;
    x.push(e);
    this.setState({
      attendees_invited: x,
    });
  }
  remove_attendees(val) {
    var removeIndex = this.state.attendees_invited;
    const index = removeIndex
      .map(function (item) {
        return item.id;
      })
      .indexOf(val.id);
    if (index > -1) {
      removeIndex.splice(index, 1);
    }
    this.setState({
      attendees_invited: removeIndex,
    });
  }
  addGift(val) {
    this.setState({
      giftData: new Array(val),
      wishListModal: false,
      addEventModal: true,
    });
  }
  dateChange(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
  }
  // getEvents() {
  //   var db = firebase.firestore();
  //   var user = firebase.auth().currentUser;

  //   if (user != null) {
  //     const items = [];
  //     db.collection("events")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach(function (doc) {
  //           items.push(doc.data());
  //         });
  //         this.setState({
  //           eventList: items,
  //           eventLoading: false,
  //         });
  //       });
  //   }
  // }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getListData();
    });
  }
  renderEventDetails() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.eventDetailsModal}
        title=""
        onRequestClose={() => this.setState({ eventDetailsModal: false })}
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
              onPress={() =>
                this.setState({
                  eventDetailsModal: false,
                  event_end_date: "",
                  event_title: "",
                  event_start_date: "",
                  attendees_invited: [],
                })
              }
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Event</Text>
          </Body>
          <Right></Right>
        </Header>

        <Content style={{ backgroundColor: "#f3f3f3" }}>
          <View style={Formstyles.container}>
            <View style={Formstyles.formContainer}>
              <CardItem cardBody>
                <Image
                  source={{
                    uri:
                      "https://lh3.googleusercontent.com/proxy/6Q2hRVs8z2KqjJrcjG5tMSYlqw2G01XS_PkKOgdaD-GzzTZ2NJRGDUDZYX8l1CppLRKRGm_OxjsWurWpiXWwuDMeKJjn9fQE7Jw8hW4QEi9NEohCZvTlApTxU7lpBM0ewQKwG4I",
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <Text style={Formstyles.nameTittle}>
                {this.state.eventDetails.event_title}
              </Text>

              <Content>
                <Card
                  transparent
                  style={{
                    elevation: 0,
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <CardItem style={Formstyles.cardItem}>
                    <Text style={Formstyles.itemLabel}>Event Name</Text>
                    <View style={Formstyles.inputContainer}>
                      <Text>{this.state.eventDetails.event_title}</Text>
                    </View>
                  </CardItem>
                  <CardItem style={Formstyles.cardItem}>
                    <Text style={Formstyles.itemLabel}>EVENT DATE & TIME</Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      START
                    </Text>

                    <View style={Formstyles.inputContainer}>
                      <Text>{this.state.eventDetails.event_start_date}</Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      END
                    </Text>

                    <View style={Formstyles.inputContainer}>
                      <Text>{this.state.eventDetails.event_end_date}</Text>
                    </View>
                  </CardItem>
                  <CardItem>
                    <Text style={Formstyles.itemLabel}>EVENT GIFT</Text>
                    <Text note>(Click to see the Gift)</Text>
                  </CardItem>
                  <ScrollView style={{ backgroundColor: "#fff" }}>
                    <List>
                      {this.state.eventDetails.event_wishlist === undefined ? (
                        <Text></Text>
                      ) : (
                        this.state.eventDetails.event_wishlist.map(
                          (val, key) => {
                            return (
                              <ListItem onPress={() => alert("Still Working")}>
                                <Body>
                                  <Text
                                    style={{ fontSize: 15, fontWeight: "bold" }}
                                  >
                                    {val.item_name}
                                  </Text>
                                </Body>
                                <Right></Right>
                              </ListItem>
                            );
                          }
                        )
                      )}
                    </List>
                  </ScrollView>
                  <CardItem>
                    <Text style={Formstyles.itemLabel}>All ATTENDEES</Text>
                  </CardItem>
                  <ScrollView style={{ backgroundColor: "#fff" }}>
                    <List>
                      {this.state.eventDetails.event_attendees === undefined ? (
                        <Text></Text>
                      ) : (
                        this.state.eventDetails.event_attendees.map(
                          (val, key) => {
                            return (
                              <ListItem avatar>
                                <Left>
                                  <Thumbnail
                                    source={{
                                      uri: val.image,
                                    }}
                                  />
                                </Left>
                                <Body>
                                  <Text
                                    style={{ fontSize: 15, fontWeight: "bold" }}
                                  >
                                    {val.user_name}
                                  </Text>
                                </Body>
                                <Right></Right>
                              </ListItem>
                            );
                          }
                        )
                      )}
                    </List>
                  </ScrollView>
                </Card>
              </Content>
            </View>
          </View>
        </Content>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  renderAddEventModal() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.addEventModal}
        title=""
        onRequestClose={() => this.setState({ addEventModal: false })}
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
              onPress={() =>
                this.setState({
                  addEventModal: false,
                  event_end_date: "",
                  event_title: "",
                  event_start_date: "",
                  attendees_invited: [],
                })
              }
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Create Event</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.CreateEvent()}>
              <Text style={{ fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content style={{ backgroundColor: "#f3f3f3" }}>
          <View style={Formstyles.container}>
            <View style={Formstyles.formContainer}>
              <Text style={Formstyles.nameTittle}>Create Event</Text>

              <Content>
                <Card
                  transparent
                  style={{
                    elevation: 0,
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <CardItem style={Formstyles.cardItem}>
                    <Text style={Formstyles.itemLabel}>EVENT TITLE:</Text>
                    <View style={Formstyles.inputContainer}>
                      <TextInput
                        value={this.state.event_title}
                        style={Formstyles.inputs}
                        placeholder="Event Name"
                        underlineColorAndroid="transparent"
                        onChangeText={(e) =>
                          this.handleChange(e, "event_title")
                        }
                      />
                    </View>
                  </CardItem>
                  <CardItem style={Formstyles.cardItem}>
                    <Text style={Formstyles.itemLabel}>EVENT DATE & TIME</Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      START
                    </Text>

                    <View style={Formstyles.inputContainer}>
                      <DatePicker
                        style={{ width: 200 }}
                        mode="date"
                        defaultDate={this.state.event_start_date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(e) =>
                          this.handleChange(e, "event_start_date")
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      END
                    </Text>

                    <View style={Formstyles.inputContainer}>
                      <DatePicker
                        style={{ width: 200 }}
                        mode="date"
                        date=""
                        defaultDate={this.state.event_end_date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(e) =>
                          this.handleChange(e, "event_end_date")
                        }
                      />
                    </View>
                  </CardItem>
                  <CardItem>
                    <Text style={Formstyles.itemLabel}>SELECT/ADD GIFT</Text>
                    <Right style={{ paddingLeft: 150 }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            wishListModal: true,
                            addEventModal: false,
                          })
                        }
                      >
                        <Icon name="add" style={{ color: "#1c1c1c" }} />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <ScrollView style={{ backgroundColor: "#fff" }}>
                    <List>
                      {this.state.giftData.length == 0 ? (
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            paddingVertical: 20,
                          }}
                        >
                          <Icon name="paper" style={{ color: "#1c1c1c" }} />
                          <Text
                            style={{ color: "#1c1c1c", paddingHorizontal: 10 }}
                          >
                            No Gift
                          </Text>
                        </View>
                      ) : (
                        this.state.giftData.map((val, key) => {
                          return (
                            <ListItem avatar>
                              <Body style={{ flexDirection: "row" }}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    paddingVertical: 20,
                                  }}
                                >
                                  {val.item_name}
                                </Text>
                                {/* <Right style={{ paddingHorizontal: 15 }}>
                                  <TouchableOpacity
                                    style={styles.AddButton}
                                    onPress={() => this.remove_attendees(val)}
                                  >
                                    <Text style={styles.mblTxt}>Remove</Text>
                                  </TouchableOpacity>
                                </Right> */}
                              </Body>
                            </ListItem>
                          );
                        })
                      )}
                    </List>
                  </ScrollView>
                  <CardItem>
                    <Text style={Formstyles.itemLabel}>ADD ATTENDEES</Text>
                    <Right style={{ paddingLeft: 150 }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            attendeesModal: true,
                            addEventModal: false,
                          })
                        }
                      >
                        <Icon name="add" style={{ color: "#1c1c1c" }} />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <ScrollView style={{ backgroundColor: "#fff" }}>
                    <List>
                      {this.state.attendees_invited.length == 0 ? (
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            paddingVertical: 20,
                          }}
                        >
                          <Icon name="people" style={{ color: "#1c1c1c" }} />
                          <Text
                            style={{ color: "#1c1c1c", paddingHorizontal: 10 }}
                          >
                            No Attendees
                          </Text>
                        </View>
                      ) : (
                        this.state.attendees_invited.map((val, key) => {
                          return (
                            <ListItem avatar>
                              <Left>
                                <Thumbnail
                                  source={{
                                    uri:
                                      "https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png",
                                  }}
                                />
                              </Left>
                              <Body style={{ flexDirection: "row" }}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    paddingVertical: 20,
                                  }}
                                >
                                  {val.user_name}
                                </Text>
                                <Right style={{ paddingHorizontal: 15 }}>
                                  <TouchableOpacity
                                    style={styles.AddButton}
                                    onPress={() => this.remove_attendees(val)}
                                  >
                                    <Text style={styles.mblTxt}>Remove</Text>
                                  </TouchableOpacity>
                                </Right>
                              </Body>
                            </ListItem>
                          );
                        })
                      )}
                    </List>
                  </ScrollView>
                </Card>
              </Content>
            </View>
          </View>
        </Content>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  renderAttendees() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.attendeesModal}
        title=""
        onRequestClose={() => this.setState({ attendeesModal: false })}
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
              onPress={() =>
                this.setState({ attendeesModal: false, addEventModal: true })
              }
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Attendees</Text>
          </Body>
          <Right></Right>
        </Header>

        <Content>
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <List>
              {this.state.eventFriendList.map((val, key) => {
                return (
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            "https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png",
                        }}
                      />
                    </Left>
                    <Body style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          paddingVertical: 20,
                        }}
                      >
                        {val.user_name}
                      </Text>
                      <Right style={{ paddingHorizontal: 15 }}>
                        <TouchableOpacity
                          style={styles.AddButton}
                          onPress={() => this.invite(val)}
                        >
                          <Text style={styles.mblTxt}>Invite</Text>
                        </TouchableOpacity>
                      </Right>
                    </Body>
                  </ListItem>
                );
              })}
            </List>
          </ScrollView>
        </Content>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  renderWishList() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.wishListModal}
        title=""
        onRequestClose={() => this.setState({ wishListModal: false })}
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
              onPress={() =>
                this.setState({ wishListModal: false, addEventModal: true })
              }
            >
              <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
            </TouchableOpacity>
          </Left>
          <Body
            style={{
              paddingTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Gift</Text>
          </Body>
          <Right></Right>
        </Header>

        <Content>
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <List>
              {this.state.wishlist.map((val, key) => {
                return (
                  <ListItem onPress={() => this.addGift(val)}>
                    <Body>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          paddingVertical: 20,
                        }}
                      >
                        {val.item_name}
                      </Text>
                      {/* <Right style={{ paddingHorizontal: 15 }}>
                        <TouchableOpacity
                          style={styles.AddButton}
                          onPress={() => this.invite(val)}
                        >
                          <Text style={styles.mblTxt}>Invite</Text>
                        </TouchableOpacity>
                      </Right> */}
                    </Body>
                  </ListItem>
                );
              })}
            </List>
          </ScrollView>
        </Content>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </Modal>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <ScreenHeader navigation={this.props.navigation} />
          <View style={styles.container}>
            {this.state.eventLoading ? (
              <View
                style={{
                  top: 15,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#aee4fc" />
              </View>
            ) : this.state.eventList.length === 0 ? (
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
                <Icon name="calendar" style={{ color: "#1c1c1c" }} />
                <Text style={{ color: "#1c1c1c", paddingHorizontal: 10 }}>
                  No Events
                </Text>
              </View>
            ) : (
              <ScrollView>
                {this.state.eventList.map((val, key) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          eventDetails: val,
                          eventDetailsModal: true,
                        })
                      }
                    >
                      <Card
                        style={{
                          elevation: 0,
                          marginRight: 0,
                          marginLeft: 0,
                        }}
                      >
                        <CardItem>
                          <Left>
                            <Thumbnail
                              source={{
                                uri:
                                  "https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png",
                              }}
                            />
                            <Body>
                              <Text
                                style={{ fontSize: 15, fontWeight: "bold" }}
                              >
                                {val.event_title}
                              </Text>
                              <Text note>{val.user_creator.user_name}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem cardBody>
                          <Image
                            source={{
                              uri:
                                "https://lh3.googleusercontent.com/proxy/6Q2hRVs8z2KqjJrcjG5tMSYlqw2G01XS_PkKOgdaD-GzzTZ2NJRGDUDZYX8l1CppLRKRGm_OxjsWurWpiXWwuDMeKJjn9fQE7Jw8hW4QEi9NEohCZvTlApTxU7lpBM0ewQKwG4I",
                            }}
                            style={{ height: 200, width: null, flex: 1 }}
                          />
                        </CardItem>
                      </Card>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
          <View>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#aee4fc" }}
              position="bottomRight"
              onPress={() => this.setState({ addEventModal: true })}
            >
              <Icon name="add" />
            </Fab>
          </View>
          <ScreenFooter navigation={this.props.navigation} />
        </Container>
        {this.renderAddEventModal()}
        {this.renderAttendees()}
        {this.renderEventDetails()}
        {this.renderWishList()}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </React.Fragment>
    );
  }
}
EventScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    // paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    borderColor: "#dddfe2",
    borderWidth: 1,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
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
  mblTxt: {
    color: "#ffff",
  },
});
const Formstyles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    borderBottomColor: "#dddfe2",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: "100%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  formContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    paddingVertical: 15,
  },
  loginButton: {
    backgroundColor: "#4300af",
  },
  loginText: {
    color: "white",
  },
  cardItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  itemLabel: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
