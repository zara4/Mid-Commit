import React from 'react'
import { View, FlatList, StyleSheet, Text, Image, ImageBackground, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Userprofile from '../Components/userProfile'
import firebase from "firebase";
import User from './../Components/User';
import GradientButton from 'react-native-gradient-buttons';
import database from '@react-native-firebase/database';
import { categories } from '../Data/Dataarray'
export default class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrData: []
    };
  }

  getdonations() {
    var ref = firebase.database().ref("donationpost");

    ref.once('value').then(snapshot => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          uid: child.val().uid,
          image: child.val().image,
          name: child.val().name,
          email: child.val().email,
          title: child.val().title,
          description: child.val().description,
          postedBy: child.val().name,
          postedOn: child.val().date,
        });
      });
      this.setState({ arrData: items });
      console.log(items)
    });
    console.log(this.state)
  }

  timeout = 0;
  componentDidMount() {

    this.getdonations();
  }

  async reportProblem(uid, image, name, email, title, description, postedby, postedon) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var time = date + '-' + month + '-' + year;
    try {
      var userRef = firebase.database().ref('/requests');
      userRef.push({
        senderid: User.uid,
        uid: uid,
        image: image,
        name: name,
        email: email,
        title: title,
        date: postedon,
        description: description
      });
      alert('A chat has been initiated.');
      // this.setState({ title: '', description: '' })
    } catch (error) {
      console.log(error)
    }

  }

  renderCategory = ({ item }) => (
    <View>
      <View
        style={{ margin: 10, borderWidth: 0.5, borderColor: "#999" }}>
        <Image source={{ uri: item.image }} style={{ margin: 10, width: 265, height: 160, alignSelf: "center" }} />
        <View>
          <Text style={{
            marginTop: 7,
            marginLeft: 10,
            fontSize: 18,
            fontWeight: "bold"
            , alignSelf: "center"
          }}>{item.name}</Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%"
          }}>
            <View style={{ width: "50%" }}>
              <Text style={{ marginLeft: 10 }}>Posted By {item.postedBy}</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={{ marginRight: 10, textAlign: "right" }}>{item.postedOn}</Text>
            </View>
          </View>
          <Text style={{ marginBottom: 10, alignSelf: "center" }}>{item.description}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View style={{ width: '100%' }}>
            <GradientButton
              style={{ marginVertical: 8., marginTop: 0, alignSelf: 'center' }}
              text="Apply For Donation"
              textStyle={{ fontSize: 17, color: 'black' }}
              gradientBegin="#f3f3f3"
              gradientEnd="#f3f3f3"
              gradientDirection="diagonal"
              height={40}
              width={300}
              radius={10}
              impact
              impactStyle='Light'
              onPressAction={() => this.reportProblem(item.uid, item.image, item.name, item.email, item.title, item.description, item.postedBy, item.postedOn)}
            />
          </View>
        </View>

      </View>

      {/* <TouchableOpacity style={{ borderBottomColor: '#f1f2f3', borderBottomWidth: 1, paddingBottom: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '30%' }}>
                <Image style={styles.profile} source={require('./../assets/box.png')} />
              </View>
              <View style={{ width: '50%', marginTop: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
                <View style={{ marginTop: 3, marginLeft: -5 }}>
                  <View style={{ width: '100%' }}>
                    <Text style={{ marginTop: 0, color: '#8f92a1', marginLeft: 5 }}>{item.description}</Text>
                    <Text style={{ marginTop: 0, color: '#000000', marginLeft: 5, fontWeight: 'bold' }}>Post By: {item.name}</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '20%', marginTop: 0 }}>
                <Text style={{ fontSize: 13, marginTop: 10 }}>5-5-2021</Text>
              </View>
            </View>
          </TouchableOpacity> */}
    </View>

  );

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
            width: "100%"
          }}>
            <View style={{ width: "50%" }}>
              <Text style={styles.headText}>Welcome Back!</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notification')}>
                <Image
                  source={require('./../assets/notification.png')}
                  style={{ height: 40, width: 40, borderRadius: 50 }}
                />
              </TouchableOpacity>
              {/* <Image
                                source={require('./../assets/profileimg.png')}
                                style={{ height: 60, width: 60, borderRadius: 50 }}
                            /> */}
              {/* <Text style={{ size: 35, color: "#ffffff", marginRight: 10 }}>{User.name}</Text> */}
            </View>
          </View>
        </View>
        <ScrollView>

          <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
              opacity: 0.6,
              left: 0,
              right: 0,
              height: 90,
              marginTop: -13
            }}
          >
            <View style={styles.searchCont}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#b1e5d3"
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  width: 260
                }}
              />
              <Image style={{ width: 20, height: 20 }} source={require('./../assets/icon/search.png')} />
            </View>

          </LinearGradient>
          <View style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center"
          }}>
            <View style={{ width: "50%" }}>
              <Text style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
                marginBottom: 6
              }}>Recommended</Text>
              <View style={{
                height: 1,
                backgroundColor: "#b1e5d3",
                width: 145,
                marginTop: -5
              }}>

              </View>

            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <TouchableOpacity style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15
              }}
                onPress={this.props.navigation.navigate('Donation')}>
                <Text style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF"
                }}>More</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: 100,
                            marginTop: 220,
                            top: 0
                        }}
                    /> */}
          {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Detail")}
                        style={styles.imgcont}>
                        <Image
                            source={require('./../assets/food.jpg')} style={{ width: 160, height: 160 }} />
                        <View style={styles.imgtext}>
                            <Text style={{ fontWeight: "bold" }}>Food Donation</Text>
                            <Text style={styles.imgloc}>4km</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Detail")}
                        style={styles.imgcont}>
                        <Image
                            source={require('./../assets/med.jpg')} style={{ width: 160, height: 160 }} />
                        <View style={styles.imgtext}>
                            <Text style={{ fontWeight: "bold" }}>Donate</Text>
                            <Text style={styles.imgloc}>3km</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Detail")}
                        style={styles.imgcont}>
                        <Image
                            source={require('./../assets/house.jpg')} style={{ width: 160, height: 160 }} />
                        <View style={styles.imgtext}>
                            <Text style={{ fontWeight: "bold" }}>Donate</Text>
                            <Text style={styles.imgloc}>3km</Text>
                        </View>
                    </TouchableOpacity> */}

          <View>
            <FlatList
              data={this.state.arrData}
              renderItem={this.renderCategory}
              keyExtractor={item => `${item.id}`} />
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
    backgroundColor: "black",
    height: "23%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  searchCont: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  imgcont: {
    height: 220,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: 160,
  },
  imgtext: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10

  },
  imgloc: {
    fontWeight: "bold",
    color: "#00a46c",
    paddingLeft: 35
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 30,
    backgroundColor: '#111',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  }
});