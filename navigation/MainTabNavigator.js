import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import EventScreen from "../screens/EventScreen";
import FamilyScreen from "../screens/FamilyScreen";
import FriendScreen from "../screens/FriendScreen";
import ItemScreen from "../screens/ItemScreen";
import MyScreen from "../screens/MyScreen";
import NotificationScreen from "../screens/NotificationScreen";
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
    Notification: NotificationScreen,
    Item: ItemScreen,
  },
  config
);
MainNavigator.path = "";

export default MainNavigator;
