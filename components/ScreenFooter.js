import React, { Component } from "react";
import { Button, Icon, Footer, FooterTab, Badge } from "native-base";

import { StyleSheet } from "react-native";

// import config from "../config";

export default class ScreenFooter extends Component {
  constructor(props) {
    super(props);
    state = {};
    this.ChangeScreen = this.ChangeScreen.bind(this);
  }
  ChangeScreen(e) {
    this.props.navigation.navigate(e);
  }
  render() {
    let routeName = this.props.navigation.state.routeName;
    return (
      <React.Fragment>
        <Footer>
          <FooterTab style={{ backgroundColor: "#fff" }}>
            <Button vertical onPress={() => this.ChangeScreen("Home")}>
              <Icon
                active
                name="card"
                style={{
                  color: routeName === "Home" ? "#aee4fc" : "#1c1c1c",
                }}
              />
            </Button>
            <Button vertical onPress={() => this.ChangeScreen("Family")}>
              <Icon
                active
                name="ios-people"
                style={{
                  color: routeName === "Family" ? "#aee4fc" : "#1c1c1c",
                }}
              />
            </Button>

            <Button vertical onPress={() => this.ChangeScreen("Friend")}>
              <Icon
                active
                name="people"
                style={{
                  color: routeName === "Friend" ? "#aee4fc" : "#1c1c1c",
                }}
              />
            </Button>

            <Button vertical onPress={() => this.ChangeScreen("Event")}>
              <Icon
                name="calendar"
                style={{
                  color: routeName === "Event" ? "#aee4fc" : "#1c1c1c",
                }}
              />
            </Button>

            <Button vertical onPress={() => this.ChangeScreen("Setting")}>
              <Icon
                name="settings"
                style={{
                  color: routeName === "Setting" ? "#aee4fc" : "#1c1c1c",
                }}
              />
            </Button>
          </FooterTab>
        </Footer>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  listBackground: {
    backgroundColor: "#000",
  },
  Reserved: {
    color: "yellow",
  },
  Vecant: {
    color: "#f39c12",
  },
  Occupied: {
    color: "green",
  },
  Reserved: {
    color: "#529ff3",
  },
  ReservedText: {
    color: "#529ff3",
    fontSize: 10,
  },
  defaultText: {
    color: "#000",
  },
  defaultTextSize: {
    fontSize: 9,
  },
  createPostText: {
    fontSize: 17,
    padding: 10,
    marginBottom: 10,
    marginTop: 15,
    color: "#404040",
    borderRadius: 5,
    fontWeight: "bold",
  },
  checkboxText: {
    padding: 5,
    fontSize: 10,
  },
});
