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

export default class EventScreen extends Component {
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
    };
    this.CreateEvent = this.CreateEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.invite = this.invite.bind(this);
    this.remove_attendees = this.remove_attendees.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }
  CreateEvent() {
    var event_title = this.state.event_title;
    var event_start_date = this.dateChange(this.state.event_start_date);
    var event_end_date = this.dateChange(this.state.event_end_date);
    var attendees_invited = this.state.attendees_invited;
    CreateEvent(
      event_title,
      event_start_date,
      event_end_date,
      attendees_invited
    );
    this.setState({ addEventModal: false });
    this.getEvents();
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
  dateChange(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 1;
    var year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
  }
  getEvents() {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;

    if (user != null) {
      const items = [];
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            items.push(doc.data());
          });
          this.setState({
            eventList: items,
            eventLoading: false,
          });
        });
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getEvents();
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
                                    {val.name}
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
              <Text style={{ fontWeight: "bold" }}>Save</Text>
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
                      {this.state.attendees_invited.map((val, key) => {
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
                              <Text>{val.name}</Text>
                              <Text note>always keep you happy . .</Text>
                            </Body>
                            <Right>
                              <TouchableOpacity
                                style={styles.AddButton}
                                onPress={() => this.remove_attendees(val)}
                              >
                                <Text style={styles.mblTxt}>Remove</Text>
                              </TouchableOpacity>
                            </Right>
                          </ListItem>
                        );
                      })}
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
              {this.state.calls.map((val, key) => {
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
                      <Text>{val.name}</Text>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        style={styles.AddButton}
                        onPress={() => this.invite(val)}
                      >
                        <Text style={styles.mblTxt}>Invite</Text>
                      </TouchableOpacity>
                    </Right>
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
                        {/* <CardItem>
                        <Left>
                          <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12 Likes</Text>
                          </Button>
                        </Left>
                        <Body>
                          <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                          </Button>
                        </Body>
                        <Right>
                          <Text>11h ago</Text>
                        </Right>
                      </CardItem> */}
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
              style={{ backgroundColor: "#5067FF" }}
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
    // alignItems: "center",
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
