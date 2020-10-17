// // import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import AppNavigator from "./navigation/AppNavigator";

// export default function App() {
//   return <AppNavigator />;
// }

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: "#fff",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   // },
// });

import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
// import { CreateUserContext } from "./context/CreateUserContext";
import { StatusBar } from "react-native";
import { View } from "native-base";
import firebase from "firebase";
import { firebaseConfig } from "./firebase/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <AppNavigator />;
    // <View>
    // <StatusBar barStyle="dark-content" backgroundColor="#fff" />

    // </View>
  }
}
