import React from 'react'
import {View,AsyncStorage,ActivityIndicator,StatusBar} from 'react-native'
import User from '../Components/User'

export default class AuthLoading extends React.Component{
  constructor(props){
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async() =>{
    User.email = await AsyncStorage.getItem('email');
    this.props.navigation.navigate(User.email ? 'navigation' : 'Auth'); 
  };
  render(){
    return(
      <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" /> 
      </View>
    )
  }
} 