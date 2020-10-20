import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
export default class ScreenWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this);
  }
  _onNavigationStateChange(val) {
    if (val.url !== val.title) {
      console.log(val);
      this.props.getItemData(val);
    }
  }
  render() {
    console.log(this.props);
    return (
      <WebView
        source={{ uri: "https://www.amazon.com/" }}
        onNavigationStateChange={(e) => this._onNavigationStateChange(e)}
        scalesPageToFit={true}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => console.log("Received: ", event.nativeEvent.data)}
        originWhitelist={["*"]}
        mixedContentMode="always"
      />
    );
  }
}
