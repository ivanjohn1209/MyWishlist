import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator.js";
import AuthNavigator from "./AuthNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthNavigator,
    Main: MainTabNavigator,
  })
);
