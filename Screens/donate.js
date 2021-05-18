import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import * as firebase from 'firebase';
import User from '../Components/User';
import GradientButton from 'react-native-gradient-buttons';
import database from '@react-native-firebase/database';
import Userprofile from '../Components/userProfile'
export default class donate extends React.Component {
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



  renderCategory = ({ item }) => (

    <View>
      <TouchableOpacity
        style={{ margin: 10, borderWidth: 0.5, borderColor: "#999" }}>
        <Image source={{uri: item.image}} style={{ margin: 10, width: 265, height: 160, alignSelf: "center" }} />
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

          {/* <View style={{ width: '100%' }}>
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
              onPressAction={() => this.reportProblem(item.uid, item.name, item.email, item.title, item.description, item.postedBy, item.postedOn)}
            />
          </View> */}
        </View>

      </TouchableOpacity>

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
            marginTop: 40,
            width: "100%"
          }}>
            <TouchableOpacity style={{ width: "20%" }}>
              <Image
                source={{uri:Userprofile.img}}
                style={{ height: 70, width: 70, borderRadius: 50, borderColor: '#fff', borderWidth: 2 }}
              />
            </TouchableOpacity>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.headText}>Welcome {Userprofile.name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddDonation")
              }}
              style={{ width: "30%", alignItems: "flex-end" }}>
              <Image
                source={require('./../assets/add.png')}
                style={{ height: 30, width: 30, borderRadius: 50, borderColor: '#fff', borderWidth: 2 }}
              />
            </TouchableOpacity>

          </View>
        </View>



        {this.state.arrData == '' ?
          <View>
            <Image source={require('./../assets/money.jpg')}
              style={{ marginTop: 40, height: 150, width: 150, alignSelf: "center" }} />
            <Text style={styles.bodyText}>No Donations Available</Text>
          </View>
          :
          <View style={{ marginTop: 20, margin: 10 }}>
            <ScrollView style={{ marginBottom: 100 }}>
              <FlatList
                data={this.state.arrData}
                renderItem={this.renderCategory}
                keyExtractor={item => `${item.id}`} />
            </ScrollView>


          </View>

        }




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
    backgroundColor: "#111",
    height: "17%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 17,
    color: "#FFF",
  },
  bodyText: {
    fontSize: 20,
    color: "#333",
    alignSelf: "center"
  },

  profile: {
    width: 75,
    height: 75,
    marginBottom: 0,
    marginTop: 0
  },
});
