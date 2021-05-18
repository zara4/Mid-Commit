import React from 'react'
import {Text,View,Image,StyleSheet,TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons,Ionicons,FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase'
import database from '@react-native-firebase/database';
import User from '../Components/User'

export default class profile extends React.Component{
  componentDidMount() {
     const uid = firebase.auth().currentUser.uid
    var ref = firebase.database().ref("users/"+uid);
    ref.once("value")
    .then(function(snapshot) {
    var childKey = snapshot.child("name").val();
    User.uid= uid
    User.name= childKey
  });
console.log(User.name) 
    }
  render(){
    return(
  <View style={styles.main}>
  <View style={styles.mainContainer}>
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:19,
                   width:"100%"
               }}>
                   <TouchableOpacity style={{width:"40%"}}    
                   onPress={() => this.props.navigation.navigate('EditProfile')}
                        >
                        <Image
                            source={require('./../assets/user.jpg')}
                            style={{height:120,width:120,borderRadius:"50%",borderColor:'#fff',borderWidth:2}}
                        />
                   </TouchableOpacity>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        <Text style={styles.headText}> Welcome {User.name}!</Text>
                   </View>
               </View>
               <TouchableOpacity 
              style={{ width: "100%", marginTop: 10 }}
              onPress={() => this.signInWithFacebook()}>
              <View style={styles.btn}>
              <FontAwesome name="history" size={24} color="black"  style={styles.btnicon} />
                <Text style={styles.btntxt}>
                  Donation History
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: "100%", marginTop: 10 }}
              onPress={() => this.signInWithGoogle()}>
              <View style={styles.btn}>
              <Ionicons name="settings" size={24} color="black" style={styles.btnicon} />
                <Text style={styles.btntxt}>
                  Settings
                </Text>
              </View>
            </TouchableOpacity><TouchableOpacity 
              style={{ width: "100%", marginTop: 10 }}
              onPress={() => this.signInWithFacebook()}>
              <View style={styles.btn}>
              <MaterialIcons name="contact-support" size={24} color="black" style={styles.btnicon} />
                <Text style={styles.btntxt}>
                  Help and Support
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: "100%", marginTop: 10 }}
              onPress={() => this.signInWithGoogle()}>
              <View style={styles.btn}>
              <MaterialIcons name="feedback" size={24} color="black" style={styles.btnicon} />
                <Text style={styles.btntxt}>
                  Complaint Cell
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
        backgroundColor:"#FFF",
            flex:1,
            alignItems: "center",
            alignContent:"center",
            alignSelf: "center"
  },
  mainContainer:{
    backgroundColor:"#111",
               height:"17%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
  },
  headText:{
              fontSize:20,
              color:"#FFF",
  },
  
  btn: {
    backgroundColor: "#fff",
    height: 44,
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor:'#999',
    borderBottomWidth:0.1
  },
  btntxt:{
      letterSpacing: 0.5,
      fontSize: 16,
      color: "black"
  },
  btnicon:{
    margin:15,
    marginLeft:10
  }
});
