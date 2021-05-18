import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native'
import * as firebase from 'firebase';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Fire from './../FIre'
import database from '@react-native-firebase/database';
import Userprofile from '../Components/userProfile'
import FIre from './../FIre';
import User from '../Components/User';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native';

export default class chat extends React.Component {

  state = {
    messages: [],
    senderid: '',
  }

  get user() {
    return {
      _id: User.uid,
      name: User.name
    }
  }

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('senderid');
    this.setState({ senderid: value })
    Fire.get(message =>
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message)
      }))
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  send = messages => {
    messages.forEach(item => {
      const message = {
        sendTo: this.state.senderid,
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }

      this.db.push(message)
    })
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  goback = async () =>{
    await AsyncStorage.setItem('senderid', '');
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            width: "100%"
          }}>
            <TouchableOpacity onPress={()=> this.goback()} style={{ width: "20%" }}>
              <Image
                source={require('./../assets/backwhite.png')}
                style={{ height: 30, width: 30, marginTop:10}}
              />
            </TouchableOpacity>

          </View>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.user}
        />

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
    height: "14%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 20,
    color: "#FFF",
  },
  bodyText: {
    fontSize: 20,
    color: "#333",
    alignSelf: "center"
  },
});
