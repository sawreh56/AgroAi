import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FarmerHome from '../screens/FarmerHome'; 
import DirectAgro from '../screens/DirectAgro';
import MarketPrice from '../screens/MarketPrice';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();
const EmptyScreen = () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />;

const FarmerTabs = () => {

  const inactiveColor = "rgba(0, 0, 0, 0.3)"; // White background ke liye ye behtar hai
  const activeColor = "#7ADAA5";
  const inactiveOpacity = 0.4; // Jo color aapne manga tha uska effect dene ke liye

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* 1. Home Icon */}
      <Tab.Screen 
        name="Home" 
        component={FarmerHome} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name={focused ? "home" : "home-outline"} 
              size={26} 
              margin={-15}
              color={focused ? activeColor : inactiveColor} 
            />
          ),
        }}
      />

      {/* 2. MARKET */}
      <Tab.Screen 
        name="MarketSpace" 
        component={MarketPrice} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require("../assets/Images/directagroicon.png")} 
              style={[styles.sideIcon, { tintColor: focused ? activeColor : undefined, opacity: focused ? 1 : inactiveOpacity }]} 
            />
          )
        }} 
      />

      {/* 3. CENTER CAMERA BUTTON */}
      <Tab.Screen 
        name="CameraSpace" 
        component={EmptyScreen} 
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => console.log("Camera Open")} 
              style={styles.centerBtnContainer}
            >
              <View style={styles.centerBtn}>
                <Icon name="camera" size={32} color={activeColor} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/* 4. COMMUNITY */}
      <Tab.Screen 
        name="Cart" 
        component={DirectAgro} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require("../assets/Images/carticon.png")} 
              style={[styles.cartIcon, { tintColor: focused ? activeColor : undefined, opacity: focused ? 1 : inactiveOpacity }]} 
            />
          )
        }} 
      />

      {/* 5. PROFILE */}
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require("../assets/Images/chatsicon.png")} 
              style={[styles.chatIcon, { tintColor: focused ? activeColor : undefined, opacity: focused ? 1 : inactiveOpacity }]} 
            />
          )
        }} 
      />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60, // Height thodi badha di taake icons ko space mile
    backgroundColor: '#ffffff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingBottom: 15, // Content ko thoda niche karne ke liye
    elevation: 15,
    borderWidth: 0,
  },
  sideIcon: {
    width: 27,
    height: 27,
    marginTop: 15, // Is se side wale icons thode niche ho jayenge
    resizeMode: 'contain',
  },
  centerBtnContainer: {
    top: -40,
    marginLeft: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  centerBtn: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#7ADAA5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cartIcon: {
    width: 29,
    height: 29,
    marginTop: 15,
  },
  chatIcon: {
    width: 32,
    height: 32,
    marginTop: 15,
  },
});

export default FarmerTabs;