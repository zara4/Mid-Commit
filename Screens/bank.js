import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Facebook from 'expo-facebook'
import * as GoogleSignIn from 'expo-google-sign-in';
import Firebase from '../Config/key'
import database from '@react-native-firebase/database';
import User from '../Components/User';

class SignUpScreen extends React.Component {
  state = { uid:'',displayName: '', email: '', password: '', errorMessage: '', loading: false };
 
 adduser(name,cnic,email,gender,country,city,phone,userImg,address,userid){
 try{
   firebase.database().ref('/users/'+userid)
   .set({
         name:name,
        cnic:cnic,
        email:email,
        gender:gender,
        city:city,
        country:country,
        phone:phone,
        address:address,
        userImg:userImg,
  })
    }catch(error){
      console.log(error)
    }
}
  setUser(){
  User.uid = this.state.uid
  User.name = this.state.displayName
  User.email= this.state.email;
  User.password= this.state.password;
  User.error= this.state.errorMessage;
  User.loading = this.state.loading;
}
  onLoginSuccess() {
    const uid = firebase.auth().currentUser.uid
    this.adduser(this.state.displayName,"",this.state.email,"","","","","","",uid)    
    this.props.navigation.navigate('SignUp');
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }
  
  async signInWithEmail() {
    console.log(this.state)
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .then(() => this.props.navigation.navigate('Signin'))
      .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
              this.onLoginFailure.bind(this)('Weak Password!');
          } else {
              this.onLoginFailure.bind(this)(errorMessage);
          }
      });
      console.log(this.state)
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.form}>
            <Image source={require('./../assets/money.jpg')}
             style={{marginTop: 20 ,height:150,width:150, alignSelf:"center"}} />
           <View style={{ marginTop: 20 , marginBottom: 16}}>
              <Text
                style={{fontSize: 24, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Signup");}}>
                Bank Donations
              </Text>
              </View>
            <View>
              <Text
                style={{ fontWeight: "200", fontSize: 13, textAlign: "center" }}>
              Input your Debit Card Details to get on with bank donations.
              </Text>
            </View>
              <TextInput
                style={styles.input}
                placeholder="Card No"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={displayName => this.setState({ displayName })}
              />
              <TextInput
                style={styles.input}
                placeholder="CW"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Cardholdername"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                style={styles.input}
                placeholder="Valid Thru"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                color: 'red',
                width: '80%'
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{ width: '86%', marginTop: 10 }}
              onPress={() => this.signInWithEmail()}>
              <View style={styles.emailbutton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: '#FFFFFF'
                  }}
                >
                  Proceed Payment
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'white',
    alignItems: "center"
  },
  form: {
    width: "80%",
    marginTop: 15
  },
  input: {
    fontSize: 15,
    borderColor: "#999",
    borderRadius:20,
    borderWidth: 0.5,
    padding:6,
    paddingLeft:15,
    marginTop: 15.5
  },
   emailbutton: {
    backgroundColor: "#222",
    height: 44,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  }
});
export default SignUpScreen;