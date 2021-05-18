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
  Image
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import User from '../Components/User';
class Main extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1, alignContent:"center"}}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
          
            <View style={styles.form}>
           <Image source={require('./../assets/naiki.png')}
             style={{marginTop: 60 ,height:120,width:120, alignSelf:"center"}} />
           <View style={{ marginTop: 20 , marginBottom: 20}}>
              <Text
                style={{fontSize: 24, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Signup");}}>
                Welcome!
              </Text>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 13, textAlign: "center" }}>
                Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened.                
              </Text>
            </View>
            </View>
            </View>
            <TouchableOpacity 
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.props.navigation.navigate('Signin')}>
              <View style={styles.emailbutton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#FFFFFF"
                  }}
                >
                  Let's Get Started
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
    alignItems: "center",
    alignContent:"center"
  },
  form: {
    width: "80%",
    marginTop: 45
  },
   emailbutton: {
    backgroundColor: "#222",
    height: 44,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
});
export default Main;