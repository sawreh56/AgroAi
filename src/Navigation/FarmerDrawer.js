import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import FarmerTabs from './FarmerTabs';
import MarketPrice from '../screens/MarketPrice';
import ChatScreen from '../screens/ChatScreen';
import Crops from '../screens/Crops';

const Drawer = createDrawerNavigator();

const FarmerDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#7ADAA5', // optional background color
        },
      }}
    >

      <Drawer.Screen 
        name="HomeTabs" 
        component={FarmerTabs} 
      />

      <Drawer.Screen 
        name="MarketPrice" 
        component={MarketPrice} 
      />

      <Drawer.Screen 
        name="Chat" 
        component={ChatScreen} 
      />

      <Drawer.Screen 
        name="Crops" 
        component={Crops} 
      />

    </Drawer.Navigator>
  );
};

export default FarmerDrawer;