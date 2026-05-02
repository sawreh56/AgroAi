import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// screens
import ExpertTabs from './ExpertTabs';
import ChatScreen from '../screens/ChatScreen';
import CommunityForum from '../screens/CommunityForum';

// custom drawer
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const ExpertDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
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
          backgroundColor: '#7ADAA5', // Same as farmer for consistency
        },
        gestureEnabled: true,
        gestureResponseDistance: 100,
      })}
    >

      <Drawer.Screen 
        name="HomeTabs" 
        component={ExpertTabs}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ExpertCommunity" 
        component={CommunityForum}
        options={{
          title: 'Community',
          drawerLabel: 'Community',
          drawerIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ExpertChat" 
        component={ChatScreen}
        options={{
          title: 'Chat',
          drawerLabel: 'Chat',
          drawerIcon: ({ color, size }) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
};

export default ExpertDrawer;
