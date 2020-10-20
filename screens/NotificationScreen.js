import { Body, Container, Header, Icon, Left } from "native-base";
// import { View, Text } from "native-base";
// import React, { Component } from "react";

// export default class NotificationScreen extends Component {
//   render() {
//     return (
//       <View>
//         <Text>test</Text>
//       </View>
//     );
//   }
// }
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          name: "March SoulLaComa",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/FFB6C1/000000",
        },
        {
          id: 2,
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          name: "John DoeLink",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/20B2AA/000000",
        },
        {
          id: 4,
          image: "https://bootdey.com/img/Content/avatar/avatar2.png",
          name: "Finn DoRemiFaso",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 5,
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
          name: "Maria More More",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 1,
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          name: "Frank Odalthh",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/7B68EE/000000",
        },
        {
          id: 6,
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          name: "Clark June Boom!",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 7,
          image: "https://bootdey.com/img/Content/avatar/avatar5.png",
          name: "The googler",
          text:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
      ],
    };
  }
  //   componentDidMount() {
  //     const { navigation } = this.props;
  //     navigation.addListener("willFocus", () => {
  //       //   GetUserData().then((result) => {
  //       //     this.setState({
  //       //       userData: result,
  //       //     });
  //       //   });
  //     });
  //   }
  render() {
    return (
      <Container>
        {this.renderHeader()}
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;
            if (Notification.attachment) {
              mainContentStyle = styles.mainContent;
              attachment = (
                <Image
                  style={styles.attachment}
                  source={{ uri: Notification.attachment }}
                />
              );
            }
            return (
              <View style={styles.container}>
                <Image
                  source={{ uri: Notification.image }}
                  style={styles.avatar}
                />
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <View style={styles.text}>
                      <Text style={styles.name}>{Notification.name}</Text>
                      <Text>{Notification.text}</Text>
                    </View>
                    <Text style={styles.timeAgo}>2 hours ago</Text>
                  </View>
                  {attachment}
                </View>
              </View>
            );
          }}
        />
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
        <Left>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Setting")}
          >
            <Icon name="arrow-back" style={{ color: "#1c1c1c" }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={styles.headerLabel}>Notification</Text>
        </Body>
      </Header>
    );
  }
}
NotificationScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
  },

  headerLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: "absolute",
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  timeAgo: {
    fontSize: 12,
    color: "#696969",
  },
  name: {
    fontSize: 16,
    color: "#1E90FF",
  },
});
