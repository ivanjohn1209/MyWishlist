import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import EventScreen from "../screens/EventScreen";
import FamilyScreen from "../screens/FamilyScreen";
import FriendScreen from "../screens/FriendScreen";
import MyScreen from "../screens/MyScreen";
import SettingScreen from "../screens/SettingScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const MainNavigator = createStackNavigator(
  {
    Home: MyScreen,
    Family: FamilyScreen,
    Friend: FriendScreen,
    Event: EventScreen,
    Setting: SettingScreen,
  },
  config
);
MainNavigator.path = "";

export default MainNavigator;
