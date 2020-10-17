import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SignupForm from "../screens/SignupForm";
import SignupConfirmation from "../screens/SignupConfirmation";
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Form: SignupForm,
    Confirmation: SignupConfirmation,
  },
  config
);

AuthStack.path = "";

export default AuthStack;
