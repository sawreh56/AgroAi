import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ExpertTabs from './ExpertTabs';
import ChatScreen from '../screens/ChatScreen';
import CommunityForum from '../screens/CommunityForum';
import Notification from '../screens/Notification';
import Help from '../screens/Help';
import Setting from '../screens/Setting';

import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const ExpertDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#7ADAA5', 
        },
        gestureEnabled: true,
        gestureResponseDistance: 100,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#e0e0e0',
      }}
    >

      <Drawer.Screen 
        name="HomeTabs" 
        component={ExpertTabs}
        options={{
          title: 'Home',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Image style={{ width: 24, height: 24 }} source={require('../assets/Images/homeDrawer.png')} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ExpertCommunity" 
        component={CommunityForum}
        options={{
          title: 'Community',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={26} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ExpertChat" 
        component={ChatScreen}
        options={{
          title: 'Chat',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={26} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Notification" 
        component={Notification}
        options={{
          title: 'Notification',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Image style={{ width: 24, height: 24 }} source={require('../assets/Images/notificationdrawer.png')} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Help" 
        component={Help}
        options={{
          title: 'Help & Support',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Image style={{ width: 14, height: 22 }} source={require('../assets/Images/helpDrawer.png')} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Setting" 
        component={Setting}
        options={{
          title: 'Setting',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
            <Image style={{ width: 23, height: 23 }} source={require('../assets/Images/settingDrawer.png')} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
};

export default ExpertDrawer;