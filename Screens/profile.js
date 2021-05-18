import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase'
import database from '@react-native-firebase/database';
import User from '../Components/User'
import Userprofile from '../Components/userProfile'

export default class profile extends React.Component {
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid
    var ref = firebase.database().ref("users/" + uid);
    ref.once("value")
      .then(function (snapshot) {
        var username = snapshot.child("name").val();
        var usercnic = snapshot.child("cnic").val();
        var usergender = snapshot.child("gender").val();
        var userphone = snapshot.child("phone").val();
        var usercountry = snapshot.child("country").val();
        var usercity = snapshot.child("city").val();
        var useraddress = snapshot.child("address").val();
        var userimg = snapshot.child("image").val();
        User.uid = uid
        User.name = username
        Userprofile.name = username
        Userprofile.cnic = usercnic
        Userprofile.gender = usergender
        Userprofile.phone = userphone
        Userprofile.country = usercountry
        Userprofile.city = usercity
        Userprofile.address = useraddress
        Userprofile.img = userimg
      });
  }


  onDeleteSuccess() {
    console.log("User Profile Deleted " + this.state.name)
  }

  onDeleteFailure(errorMessage) {
    console.log("Error: " + errorMessage)
  }

  deleteProfile() {
    firebase.database().ref('users/' + User.uid).set(null);
    this.emptyuser();
    this.deleteauthProfile();
  }

  emptyuser() {
    Userprofile.name = null;
    Userprofile.cnic = null;
    Userprofile.gender = null;
    Userprofile.country = null;
    Userprofile.city = null;
    Userprofile.phone = null;
    Userprofile.name = null;
    Userprofile.name = null;
    User.email = null;
    User.name = null;
    User.password = null;
  }

  async signOut() {
    this.emptyuser();
    firebase.auth().signOut();
    this.props.navigation.navigate('Signin');
    return;
    this.emptyuser();
    firebase.auth().signOut()
      .then(function () {
        this.props.navigation.navigate('Signin');
        console.log("signed out")
      })
      .catch(function (error) {
        let errorMessage = error.message
        console.log("Error : " + errorMessage)
      });
  }

  async deleteauthProfile() {
    var user = firebase.auth().currentUser
      .delete();
    this.onDeleteSuccess();
    this.signOut();
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 45,
            width: "100%"
          }}>
            <TouchableOpacity style={{ width: "40%" }}
              onPress={() => this.props.navigation.navigate('EditProfileStack')}
            >
              <Image
                source={{uri: Userprofile.img}}
                style={{ height: 90, width: 90, borderRadius: 50, padding: 10, borderColor: '#fff', borderWidth: 2 }}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{ width: "100%", marginTop: 10 }}
              onPress={() => this.props.navigation.navigate('Complaintcell')}>
              <View style={styles.btn}>
                <MaterialIcons name="feedback" size={24} color="black" style={styles.btnicon} />
                <Text style={styles.btntxt}>
                Complaint Cell
                </Text>
                </View>
              </TouchableOpacity> */}

            <View style={{ width: "55%", alignItems: "flex-end" }}>
              <Text style={styles.headText}> Welcome {User.name}!</Text>
            </View>
          </View>
        </View>


        <View style={{ margin: 10 }}>


          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('addDonation')}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/heart.png')} />
              <Text style={styles.btntxt}>
                Donation History
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('MyDonations')}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/heart.png')} />
              <Text style={styles.btntxt}>
                My Donations
                </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('DonationReq')}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/heart.png')} />
              <Text style={styles.btntxt}>
                Donations Requests
                </Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('Settings')}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/setting.png')} />
              <Text style={styles.btntxt}>
                Settings
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.signInWithFacebook()}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/help.png')} />
              <Text style={styles.btntxt}>
                Help and Support
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => {
              this.props.navigation.navigate("Complaintcell");
            }}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/complaint.png')} />
              <Text style={styles.btntxt}>
                Complaint Cell
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.deleteProfile()}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/delete.png')} />
              <Text style={styles.btntxt}>
                Delete Profile
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => this.signOut()}>
            <View style={styles.btn}>
              <Image style={{ width: 25, height: 25, margin: 20 }} source={require('./../assets/icon/logout.png')} />
              <Text style={styles.btntxt}>
                Sign Out
                </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  mainContainer: {
    backgroundColor: "#111",
    height: "22%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 17,
    color: "#FFF",
  },

  btn: {
    backgroundColor: "#fff",
    height: 44,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: '#999',
    borderBottomWidth: 0.1
  },
  btntxt: {
    letterSpacing: 0.5,
    fontSize: 16,
    color: "black"
  },
  btnicon: {
    margin: 15,
    marginLeft: 10
  }
});
