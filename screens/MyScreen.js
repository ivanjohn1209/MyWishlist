import { Container } from "native-base";
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
  Button,
  StatusBar,
} from "react-native";
import ScreenFooter from "../components/ScreenFooter";
import ScreenHeader from "../components/ScreenHeader";
import ScreenWebView from "../components/ScreenWebView";

export default class MyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "1",
          title: "Amazon",
          time: "1 days a go",
          image:
            "https://images.livemint.com/img/2019/07/12/600x338/2019-07-05T065821Z_1_LYNXNPEF640GO_RTROPTP_3_AMAZON-COM-LIABILITY_1562582596221_1562903237045.JPG",
          link: "https://www.amazon.com/",
        },
        {
          id: "2",
          title: "Ebay",
          time: "1 days a go",
          image:
            "https://www.logodesignlove.com/images/evolution/ebay-logo-01.jpg",
          link: "https://www.ebay.com/",
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <ScreenHeader navigation={this.props.navigation} />
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={this.state.data}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Item", item)}
                >
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.cardContent}>
                      <View>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScreenFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
MyScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 1,
  },
  /******** card **************/
  card: {
    margin: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    //overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: "absolute",
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 22,
    color: "#aee4fc",
    marginTop: 10,
    fontWeight: "bold",
  },
  time: {
    fontSize: 13,
    color: "#ffffff",
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-start",
    justifyContent: "center",
    color: "#ffffff",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
