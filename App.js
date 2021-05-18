import React from 'react'
import Nav from './navigation'
import * as firebase from 'firebase';
import Keys from './Config/key';
import AppNav from './nav'
import User from './Components/User'
if (!firebase.apps.length) {
    firebase.initializeApp(Keys.firebaseConfig);
}

export default function App(){
return(
  <AppNav />
)
}
