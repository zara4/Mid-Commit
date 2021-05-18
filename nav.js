import * as React from 'react';
import { Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';

import Main from './Screens/main';
import Signin from './Screens/signin';
import Signup from './Screens/signup';
import Home from './Screens/Home';
import ForgotPassword from './Screens/forgottenpassword';
import Profile from './Screens/profile';
import EditProfile from './Screens/Editprofile';
import Dash from './Screens/Dash';
import Notification from './Screens/notification';
import Donate from './Screens/donate';
import AddDonation from './Screens/addDonation';
import MyDonations from './Screens/myDonations';
import DonationReq from './Screens/donationReq';
import Chat from './Screens/chat';
import Chatlist from './Screens/chatlist';
import Complaintcell from './Screens/complaintcell';
import Updatephoto from './Screens/updatephoto';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SigninStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        animationEnabled: false,
      }}
      headerMode="none">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: null }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animationEnabled: false,
      }}
      headerMode="none">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Complaintcell"
        component={Complaintcell}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: null }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: null }}
      />
      <Stack.Screen
        name="EditProfileStack"
        component={EditProfileStack}
        options={{ title: null }}
      />
      <Stack.Screen
        name="AddDonation"
        component={AddDonation}
        options={{ title: null }}
      />
      <Stack.Screen
        name="MyDonations"
        component={MyDonations}
        options={{ title: null }}
      />
      <Stack.Screen
        name="DonationReq"
        component={DonationReq}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
}
function EditProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditProfile"
      screenOptions={{
        animationEnabled: false,
      }}
      headerMode="none">
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: null }}
      />
      <Stack.Screen
        name="Updatephoto"
        component={Updatephoto}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Tab.Navigator
      initialRouteName="Dash"
      tabBarOptions={{
        activeTintColor: '#111',
      }}>
      <Tab.Screen
        name="Dash"
        component={Dash}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20 }} source={require('./assets/icon/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatlist"
        component={Chatlist}
        options={{
          tabBarLabel: 'Chatlist',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20 }} source={require('./assets/icon/chat.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={DonationReq}
        options={{
          title: 'Requests',
          tabBarLabel: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20 }} source={require('./assets/icon/user.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Donate"
        component={Donate}
        options={{
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, marginTop:5 }} source={require('./assets/icon/heart.png')} />

          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20 }} source={require('./assets/icon/user.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function MainStack() {
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signin"
      component={SigninStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={SigninStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
