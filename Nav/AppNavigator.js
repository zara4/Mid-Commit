import 'react-native-gesture-handler';
import * as React from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Screens/Home';
import Dash from '../Screens/Dash';
import Notification from '../Screens/notification';
import Donation from '../Screens/Donations';
import Complaintcell from '../Screens/complaintcell';
import AddDonation from '../Screens/addDonation';
import Settings from '../Screens/settings';
import Chat from '../Screens/chat';
import Chatlist from '../Screens/chatlist';
import Profile from '../Screens/profile';
import Editprofile from '../Screens/Editprofile';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ActionBarIcon(navigation) {
  return (<MaterialCommunityIcons name="menu" color={'white'} size={30} onPress={() => navigation.openDrawer()} />);
}
function openDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Setting Page' }} />
      <Drawer.Screen
        name="Donation"
        component={Donation}
        options={{ title: 'Donation' }} />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'About' }} />
    </Drawer.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dash"
      screenOptions={{
        animationEnabled: false
      }}
      headerMode='none'>
      <Stack.Screen
        name="Dash"
        component={Home}
        options={{ title: null }} />
      <Stack.Screen
        name="Donation"
        component={Donation}
        options={{ title: 'Donation' }} />
      <Stack.Screen
        name="AddDonation"
        component={AddDonation}
        options={{ title: 'AddDonation' }} />
        <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'Chat' }} />
        <Stack.Screen
        name="Chatlist"
        component={Chatlist}
        options={{ title: 'Chatlist' }} />
         <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: 'Notification' }} />


    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animationEnabled: false
      }}
      headerMode='none'>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: null }} />
      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{ title: 'Edit Profile' }} />
      <Stack.Screen
        name="Complaintcell"
        component={Complaintcell}
        options={{ title: 'Complaintcell' }} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'About' }} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'About' }} />
      <Stack.Screen
        name="Chatlist"
        component={Chatlist}
        options={{ title: 'Chatlist' }} />
        <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: 'Notification' }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#111',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (

              <Image style={{ width: 25, height: 25 }} source={require('./../assets/icon/home.png')} />
            ),
          }} />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Image style={{ width: 25, height: 25 }} source={require('./../assets/icon/home.png')} />
            ),
          }} />
          
        <Tab.Screen
          name="Donation"
          component={Donation}
          options={{
            tabBarLabel: 'Donation',
            tabBarIcon: ({ color, size }) => (
              <Image style={{ width: 25, height: 25 }} source={require('./../assets/icon/home.png')} />
            ),
          }} />
        <Tab.Screen
          name="Profile"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Image style={{ width: 25, height: 25 }} source={require('./../assets/icon/home.png')} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;