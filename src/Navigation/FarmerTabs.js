import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Maine PermissionsAndroid aur Platform yahan add kar diye hain
import { View, StyleSheet, TouchableOpacity, Image, Alert, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FarmerHome from '../screens/FarmerHome'; 
import DirectAgro from '../screens/DirectAgro';
import MarketPrice from '../screens/MarketPrice';
import ChatScreen from '../screens/ChatScreen';
import { launchCamera } from 'react-native-image-picker';

const Tab = createBottomTabNavigator();
const EmptyScreen = () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />;

const FarmerTabs = () => {
  const inactiveColor = "rgba(0, 0, 0, 0.3)";
  const activeColor = "#7ADAA5";
  const inactiveOpacity = 0.4;

  // --- SMART CAMERA FUNCTION START ---
  const openCamera = async () => {
    console.log("Camera Button Pressed!");

    // Android ke liye runtime permission check
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App ko photo khainchne ke liye ijazat chahiye",
            buttonNeutral: "Baad Mein",
            buttonNegative: "Mana Karein",
            buttonPositive: "Theek Hai",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Error", "Aap ne camera ki ijazat nahi di.");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert("Error", "Camera nahi khul saka. Permission check karein.");
      } else {
        const source = response.assets[0].uri;
        console.log("Photo URI: ", source);
        Alert.alert("Success", "Photo khainch li gayi!");
      }
    });
  };
  // --- SMART CAMERA FUNCTION END ---

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* 1. HOME */}
      <Tab.Screen 
        name="Home" 
        component={FarmerHome} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name={focused ? "home" : "home-outline"} 
              size={26} 
              color={focused ? activeColor : inactiveColor} 
              style={{ marginTop: 1, opacity: focused ? 1 : inactiveOpacity }}
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
          tabBarButton: () => (
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={openCamera} 
              style={styles.centerBtnContainer}
            >
              <View style={styles.centerBtn}>
                <Image 
                  source={require("../assets/Images/camera.png")} 
                  style={{ width: 28, height: 28, tintColor: '#7ADAA5' }} 
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* 4. CART */}
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

      {/* 5. CHAT */}
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
    height: 60,
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    elevation: 15,
    borderWidth: 0,
  },
  sideIcon: {
    width: 27,
    height: 27,
    marginTop: 15,
    resizeMode: 'contain',
  },
  centerBtnContainer: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBtn: {
    width: 65,
    height: 65,
    borderRadius: 35,
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