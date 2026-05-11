import { View, Text, StyleSheet ,Image} from "react-native";
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// screens
import FarmerTabs from './FarmerTabs';
import RewardsScreen from '../screens/RewardsScreen';
import Notification from '../screens/Notification';
import Crops from '../screens/Crops';
import DirectAgro from '../screens/DirectAgro';
import Help from '../screens/Help';
import Setting from '../screens/Setting';

// custom drawer
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const FarmerDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: '#7ADAA5',
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Icon name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#7ADAA5', // optional background color
        },
        gestureEnabled: true,
        gestureResponseDistance: 100,
      })}
    >

      <Drawer.Screen 
        name="HomeTabs" 
        component={FarmerTabs}
        options={{
          title: 'Home',
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
           <Image style={{ width:24, height:24 }} source={require('../assets/Images/homeDrawer.png')} />
          
          ),
        }}
      />


      <Drawer.Screen 
        name="Crops" 
        component={Crops}
        options={{
          title: 'Crops',
           drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
           <Image style={{ width:24, height:24 }} source={require('../assets/Images/CropDrawer.png')} />
            
          ),
        }}
      />

      <Drawer.Screen 
        name="RewardsScreen" 
        component={RewardsScreen}
        options={{
          title: 'Rewards',
           drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
           <Image style={{ width:24, height:24 }} source={require('../assets/Images/rewardDrawer.png')} />
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
           <Image style={{ width:24, height:24 }} source={require('../assets/Images/notificationdrawer.png')} />
            
          ),
        }}
      />

      <Drawer.Screen 
        name="DirectAgro" 
        component={DirectAgro}
        options={{
          title: 'DirectAgro',
           drawerLabelStyle: {
            color: "#fff",
            fontSize: 17,
          },
          drawerIcon: ({ color, size }) => (
           <Image style={{ width:23, height:23 }} source={require('../assets/Images/agrodirectDrawer.png')} />
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
           <Image style={{ width:14, height:22 }} source={require('../assets/Images/helpDrawer.png')} />
            
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
           <Image style={{ width:23, height:23 }} source={require('../assets/Images/settingDrawer.png')} />
            
          ),
        }}
      />

      

    </Drawer.Navigator>
  );
};

export default FarmerDrawer;