import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Picker,
  ScrollView
} from "react-native";
import firebase from "firebase";
import Userprofile from '../Components/userProfile';
import User from '../Components/User';
import database from '@react-native-firebase/database';
import * as ImagePicker from 'expo-image-picker';
import Textarea from 'react-native-textarea';
import DropDownPicker from 'react-native-dropdown-picker';

class AddDonation extends React.Component {

  state = { name: '', email: '', date: '', title: '', description: '', srcImg: '', uri: '', fileName: '', };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.uri,
          srcImg: { uri: result.uri },
          uri: result.uri,
        });

      }

    } catch (E) {
      console.log(E);
    }
  };

  async reportProblem(IMG) {
    if (this.state.title == '') {
      alert('Please Write Your Donation Title');
      return;
    } else if (this.state.description == '') {
      alert('Please Write Your Donation Description');
      return;
    }
    else if (IMG == '') {
      alert('Please Select Image');
      return;
    } else {
      console.log(IMG)
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var time = date + '-' + month + '-' + year;

      var username = Userprofile.name;
      var useremail = User.email;
      var posteddate = time;
      var title = this.state.title;
      var description = this.state.description;
      var useruid = +User.uid;
      try {
        var userRef = firebase.database().ref('/donationpost');
        userRef.push({
          uid: User.uid,
          image: IMG,
          name: username,
          email: useremail,
          date: posteddate,
          title: title,
          description: description
        });
        alert('Donation Post Submit Successfully.');
        this.setState({ title: '', description: '', uri:'' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  getImageValue() {
    let { image } = this.state;
    if (image == null) {
      return <Image source={require('../assets/placeholder.png')} style={{ width: 300, borderRadius: 25, marginTop: 20, height: 200, marginBottom: 0, marginTop: 0, alignSelf: 'center' }} />;
    } else {
      return <Image source={{ uri: image }} style={{ width: 300, borderRadius: 25, marginTop: 20, height: 200, marginBottom: 0, marginTop: 0, alignSelf: 'center' }} />;
    }

    return null;
  }

  uploadIMG = async () => {
    const url = this.state.uri;

    if (url == '') {
      alert('Please Select Image');
      return;
    } else {

      console.log(url)

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed')); // error occurred, rejecting
        };
        xhr.responseType = 'blob'; // use BlobModule's UriHandler
        xhr.open('GET', url, true); // fetch the blob from uri in async mode
        xhr.send(null); // no initial data
      });

      if ((blob.size / 1000000) > 10) {
        this.setState({ loading: false }, () => { alert('Image Size should not be greater than 2mb.') })
      }
      else {
        var timestamp = new Date().getTime()
        var imageRef = firebase.storage().ref().child(`users/` + timestamp + `/`);
        return imageRef.put(blob).then(() => {
          blob.close()
          return imageRef.getDownloadURL()
        }).then((dwnldurl) => {
          console.log(dwnldurl);
          this.reportProblem(dwnldurl);
        })
      }

    }

  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1, alignContent: "center" }}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.container} behavior="padding">

              <View style={styles.form}>
                <Image source={require('./../assets/complaint.jpg')}
                  style={{ marginTop: 1, height: 150, width: 150, alignSelf: "center" }} />
                <View style={{ marginTop: 1, marginBottom: 20 }}>
                  <Text
                    style={{ fontSize: 24, textAlign: "center" }}>
                    Donation Post
              </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ fontWeight: "200", fontSize: 13, textAlign: "center" }}>
                      Please fill the form for donate people
              </Text>
                  </View>
                </View>

                <View style={{
                  height: 60,
                  padding: 5,
                  fontSize: 15,
                  borderColor: "#999",
                  borderRadius: 20,
                  borderWidth: 0.5,
                  paddingLeft: 15,
                  marginTop: 15.5
                }}>
                  <TextInput
                    style={styles.input}
                    placeholder={'Title'}
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                  />
                </View>

                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  defaultValue={this.state.text}
                  maxLength={120}
                  placeholder="Description"
                  placeholderTextColor="#B1B1B1"
                  returnKeyType="next"
                  value={this.state.description}
                  onChangeText={description => this.setState({ description })}
                />
              </View>

              <TouchableOpacity onPress={this._pickImage}>
                {this.getImageValue()}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "86%", marginTop: 10 }}
                onPress={() => this.uploadIMG()}>
                <View style={styles.emailbutton}>
                  <Text
                    style={{
                      letterSpacing: 0.5,
                      fontSize: 16,
                      color: "#FFFFFF"
                    }}
                  >
                    Post Submit
                </Text>
                </View>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
    alignItems: "center",
    alignContent: "center"
  },
  input: {
    width: 250,
    height: 40,
    padding: 0,
    marginBottom: 0,
    marginTop: 5,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 15
  },
  form: {
    width: "80%",
    marginTop: 45
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    fontSize: 15,
    borderColor: "#999",
    borderRadius: 20,
    borderWidth: 0.5,
    paddingLeft: 15,
    marginTop: 15.5,
    marginBottom: 10
  },
  emailbutton: {
    backgroundColor: "#222",
    height: 44,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
});
export default AddDonation;