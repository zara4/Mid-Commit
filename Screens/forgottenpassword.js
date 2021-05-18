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
class SignInScreen extends React.Component {

  state = { email: '', password: '', errorMessage: '', loading: false };

  onPasswordChangeSuccess() {
    this.props.navigation.navigate('Signin');
    console.log("Password changed " + User.email)
  }

  onPasswordChangeFailure(errorMessage) {
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
    await firebase
      .auth()
      .sendPasswordResetEmail(this.state.email, null)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          this.onLoginFailure.bind(this)('Weak Password!');
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });

  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1, alignContent: "center" }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">

            <View style={styles.form}>
              <Image source={require('./../assets/forgot.png')}
                style={{ marginTop: 60, height: 120, width: 120, alignSelf: "center" }} />
              <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Text
                  style={{ fontSize: 24, textAlign: "center" }}
                  onPress={() => {
                    this.props.navigation.navigate("Signup");
                  }}>
                  Forgot Password?
              </Text>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{ fontWeight: "200", fontSize: 13, textAlign: "center" }}>
                    Don't worry! we will send you an email to help you reset your password.
              </Text>
                </View>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            {this.renderLoading()}
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "red",
                width: "80%"
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithEmail()}>
              <View style={styles.emailbutton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#FFFFFF"
                  }}
                >
                  Recover Password
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Signup");
                }}>
                Don't have an Account?
              </Text>
            </View>
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
    backgroundColor: 'white',
    alignItems: "center",
    alignContent: "center"
  },
  form: {
    width: "80%",
    marginTop: 45
  },
  input: {
    fontSize: 15,
    borderColor: "#999",
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 6,
    paddingLeft: 15,
    marginTop: 15.5
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
export default SignInScreen;