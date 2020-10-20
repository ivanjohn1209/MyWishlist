import * as React from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePickers from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.isEmpty = this.isEmpty.bind(this);
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }
  render() {
    let { image } = this.state;
    return (
      <View style={styles.imageView}>
        <TouchableOpacity style={styles.Button} onPress={this._pickImage}>
          {this.isEmpty(this.state.image) ? (
            <Image
              source={{ uri: this.props.PokemonImage }}
              style={styles.image}
            />
          ) : (
            image && <Image source={{ uri: image }} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePickers.launchImageLibraryAsync({
        mediaTypes: ImagePickers.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let data = { uri: localUri, name: filename, type };

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.props.getImageFile(data);
      }
    } catch (E) {}
  };
}
const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 20,
    borderColor: "#ebf0f7",
  },
  Icon: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#333",
    textAlign: "center",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#333",
    letterSpacing: 1,
    textAlign: "center",
  },
  Button: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 30,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
