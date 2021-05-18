import React, { useEffect } from 'react';
import { Button, Platform, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Userprofile from '../Components/userProfile'
import User from '../Components/User'
import firebase from "firebase";
import database from '@react-native-firebase/database';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default class edit extends React.Component {
  state = { name: '', cnic: '', gender: '', phone: '', country: '', city: '', address: '', img: '', srcImg: '', uri: '', fileName: '' };

  onLoginSuccess() {
    console.log("Information Changed " + this.state.name)
  }

  onLoginFailure(errorMessage) {
    console.log("Error: " + errorMessage)
  }

  async updateProfile(userimg) {

    var username = this.state.name;
    var usercnic = this.state.cnic;
    var usergender = this.state.gender
    var userphone = this.state.phone
    var usercountry = this.state.country
    var usercity = this.state.city
    var useraddress = this.state.address
 
    // console.log('username:' + username, 'cnic:' + usercnic, 'gender:' + usergender, 'phone:' + userphone, 'counter:' + usercountry,
    //   'city:' + usercity, 'address:' + useraddress);
    // console.log('UID: ' + User.uid )
    // return;
    firebase.database().ref('users/' + User.uid)
      .update({
        name: username,
        cnic: usercnic,
        gender: usergender,
        phone: userphone,
        country: usercountry,
        city: usercity,
        address: useraddress,
        image: userimg
      }).then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorMessage = error.message;
        this.onLoginFailure.bind(this)(errorMessage);
      });
  }
  async viewProfile() {
    console.log('USERNAME:' + Userprofile.img)
    await this.setState({
      name: Userprofile.name,
      cnic: Userprofile.cnic,
      gender: Userprofile.gender,
      phone: Userprofile.phone,
      country: Userprofile.country,
      city: Userprofile.city,
      address: Userprofile.address,
      img: Userprofile.img
    });
  }

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

  getImageValue() {
    let { image } = this.state;
    if (image == null) {
      return <Image
      source={{uri: Userprofile.img}}
      style={{ height: 90, width: 90, borderRadius: 50, padding: 10, borderColor: '#fff', borderWidth: 2, marginRight:20 }}
    />;
    } else {
      return <Image
      source={{ uri: image }}
      style={{ height: 90, width: 90, borderRadius: 50, padding: 10, borderColor: '#fff', borderWidth: 2, marginRight:20 }}
    />
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
          this.updateProfile(dwnldurl);
        })
      }

    }

  }

  componentDidMount() {
    this.viewProfile()
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            width: "100%"
          }}>

            <TouchableOpacity onPress={this._pickImage}>
              {this.getImageValue()}
            </TouchableOpacity>

            {/* <TouchableOpacity style={{ width: "40%" }}
              onPress={() => this._pickImage()}
            >
              <Image
                source={Userprofile.img}
                style={{ height: 90, width: 90, borderRadius: 50, padding: 10, borderColor: '#fff', borderWidth: 2 }}
              />
            </TouchableOpacity> */}

            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.headText}>Welcome {Userprofile.name}</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="name"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
            <TextInput
              style={styles.input}
              placeholder="CNIC Number"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="cnic"
              value={this.state.cnic}
              onChangeText={cnic => this.setState({ cnic })}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="gender"
              value={this.state.gender}
              onChangeText={gender => this.setState({ gender })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="phone"
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="country"
              value={this.state.country}
              onChangeText={country => this.setState({ country })}
            />
            <TextInput
              style={styles.input}
              placeholder="State, City"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="city"
              value={this.state.city}
              onChangeText={city => this.setState({ city })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="city"
              value={this.state.address}
              onChangeText={address => this.setState({ address })}
            />
            <View style={styles.inputemail}>
              <Text >{User.email}</Text>
            </View>
            <TouchableOpacity
              style={{ width: '80%', marginTop: 10 }}
              onPress={() => this.uploadIMG()}>
              <View style={styles.emailbutton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: '#FFFFFF'
                  }}
                >
                  Update Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF",
    flex: 1
  },
  mainContainer: {
    backgroundColor: "#222",
    height: "22%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 20,
    color: "#FFFF",
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 15,
    borderColor: "#999",
    borderBottomWidth: 0.5,
    padding: 6,
    paddingLeft: 15,
    marginTop: 15.5
  },
  inputemail: {
    fontSize: 15,
    borderColor: "#999",
    borderBottomWidth: 0.5,
    width: "65%",
    padding: 6,
    paddingLeft: 15,
    marginTop: 15.5
  },
  emailbutton: {
    backgroundColor: "#222",
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  }
});
