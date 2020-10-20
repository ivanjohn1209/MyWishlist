import { Button, Container, Footer, FooterTab, View, Text } from "native-base";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScreenWebView from "../components/ScreenWebView";
import * as firebase from "firebase";
import "firebase/firestore";
import { WebView } from "react-native-webview";

export default class ItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [],
      link: "",
      itemIsReady: false,
    };
    // this.getItemData = this.getItemData.bind(this);
    this.addWishList = this.addWishList.bind(this);
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
  }
  //   getItemData(e) {
  //     this.setState({
  //       itemData: e,
  //     });
  //   }
  _onNavigationStateChange(val) {
    if (val.url !== val.title) {
      console.log(val);
      this.setState({
        itemData: val,
        itemIsReady: true,
      });
    } else {
      this.setState({
        itemIsReady: false,
      });
    }
  }
  addWishList() {
    let itemData = {
      item_url: this.state.itemData.url,
      item_name: this.state.itemData.title,
    };

    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    if (user != null) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            var userData = doc.data();
            db.collection("users")
              .doc(userData.user_uid)
              .collection("wish_list")
              .add(itemData);
          } else {
            console.log("No such document!");
          }
        });
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      const { state } = this.props.navigation;
      console.log(state.params.link);
      this.setState({
        link: state.params.link,
      });
    });
  }
  onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }
  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          {/* <ScreenWebView
            getItemData={this.getItemData}
            link={this.state.link}
          /> */}
          <WebView
            source={{ uri: this.state.link }}
            onNavigationStateChange={(e) => this._onNavigationStateChange(e)}
            scalesPageToFit={true}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={this.onMessage}
            originWhitelist={["*"]}
            mixedContentMode="always"
          />
        </View>
        {this.state.itemIsReady ? (
          <Footer>
            <FooterTab style={{ backgroundColor: "#fff" }}>
              <Button
                style={{
                  backgroundColor: "#aee4fc",
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginHorizontal: 30,
                }}
                onPress={() => this.addWishList()}
              >
                <Text style={{ color: "#fff" }}>Add To WishList</Text>
              </Button>
            </FooterTab>
          </Footer>
        ) : (
          <Text />
        )}
      </Container>
    );
  }
}

ItemScreen.navigationOptions = {
  headerShown: false,
};
