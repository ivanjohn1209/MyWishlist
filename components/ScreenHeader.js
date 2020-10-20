import React, { Component } from "react";
import { Header, Title, Button, Left, Body, Icon, Right } from "native-base";
import { Image, StyleSheet } from "react-native";

export default class ScreenHeader extends Component {
  constructor(props) {
    super(props);
    state = {};
    this.ChangeScreen = this.ChangeScreen.bind(this);
  }
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }
  render() {
    return (
      <Header
        hasTabs
        style={{
          backgroundColor: "#fff",
          borderBottomColor: "#dddfe2",
          borderBottomWidth: 1,
        }}
      >
        <Body>
          <Image style={styles.logo} source={require("../assets/logo2.png")} />
        </Body>
        <Right>
          {/* <Button transparent onPress={() => this.ChangeScreen("Search")}>
            <Icon name="search" style={{ color: "#1c1c1c" }} />
          </Button> */}
          <Button transparent onPress={() => this.ChangeScreen("Notification")}>
            <Icon name="notifications" style={{ color: "#1c1c1c" }} />
          </Button>
        </Right>
      </Header>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
});
