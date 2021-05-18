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
import Textarea from 'react-native-textarea';
import DropDownPicker from 'react-native-dropdown-picker';

class Complaintcell extends React.Component {

  state = { name: '', email: '', date: '', reporttype: '', reportdesc: '' };

  async reportProblem() {
    if (this.state.reporttype == '') {
      alert('Please Select Report Problem Type');
      return;
    } else if (this.state.reportdesc == '') {
      alert('Please Write Your Report Description');
      return;
    } else {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var time = date + '-' + month + '-' + year;

      var username = Userprofile.name;
      var useremail = User.email;
      var posteddate = time;
      var reporttype = this.state.reporttype;
      var reportdesc = this.state.reportdesc;
      var useruid = +User.uid;
      try {
        var userRef = firebase.database().ref('/complain');
        userRef.push({
          name: username,
          email: useremail,
          date: posteddate,
          type: reporttype,
          desc: reportdesc
        });
        alert('Complaint Submit Successfully.');
        this.setState({ reporttype: '', reportdesc: '' })
      } catch (error) {
        console.log(error)
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
                    Complaint Cell
              </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ fontWeight: "200", fontSize: 13, textAlign: "center" }}>
                      Report your problem and we will deal with it out for you
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
                  <Picker style={{ backgroundColor: '#fff', width: '100%', alignSelf: 'center', color: '#000000', marginTop: 0, marginLeft: 0 }}
                    selectedValue={this.state.reporttype}
                    onValueChange={(itemValue) =>
                      this.setState({ reporttype: itemValue })}>
                    <Picker.Item label="Report a Problem" value="" />
                    <Picker.Item value="report abuse" label="Report an abuse" />
                    <Picker.Item value="need help" label="Need help..?" />
                    <Picker.Item value="report app" label="Report an application issue" />
                  </Picker>
                </View>
                {/* <DropDownPicker
                items={[
                  { label: 'Report an abuse', value: 'report abuse' },
                  { label: 'Need help..?', value: 'need help' },
                  { label: 'Report an application issue', value: 'report app' },
                ]}
                defaultValue={this.state.reporttype}
                containerStyle={{ height: 40 }}
                placeholder="Report a Problem"
                style={{ backgroundColor: 'white' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => this.setState({
                  reporttype: item.value
                })}
              /> */}
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  defaultValue={this.state.text}
                  maxLength={120}
                  placeholder="Description"
                  placeholderTextColor="#B1B1B1"
                  returnKeyType="next"
                  value={this.state.reportdesc}
                  onChangeText={reportdesc => this.setState({ reportdesc })}
                />
              </View>

              <TouchableOpacity
                style={{ width: "86%", marginTop: 10 }}
                onPress={() => this.reportProblem()}>
                <View style={styles.emailbutton}>
                  <Text
                    style={{
                      letterSpacing: 0.5,
                      fontSize: 16,
                      color: "#FFFFFF"
                    }}
                  >
                    Report Your Problem
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
export default Complaintcell;