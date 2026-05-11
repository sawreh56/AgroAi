import { Image,  StyleSheet,} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ExpetHome from '../screens/ExpetHome';
import ExpertChats from '../screens/ExpertChats';
import CommunityForum from '../screens/CommunityForum';
import MarketAdvisoryTab from '../screens/MarketAdvisoryTab';

const Tab = createBottomTabNavigator();

const ExpertTabs = () => {
  const activeColor = '#7ADAA5';
  const inactiveOpacity = 0.45;
  const inactiveColor = 'rgba(0, 0, 0, 0.35)';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="ExpertHome"
        component={ExpetHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? activeColor : inactiveColor}
              style={{ marginTop: 2, opacity: focused ? 1 : inactiveOpacity }}
            />
          ),
        }}
      />



       <Tab.Screen
  name="MarketAdvisoryTab"
  component={MarketAdvisoryTab}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/Images/Article.png")} 
        style={{
          width: 26,
          height: 26,
          marginTop: 2,
          tintColor: focused ? activeColor : inactiveColor, 
          opacity: focused ? 1 : inactiveOpacity,
        }}
        resizeMode="contain"
      />
    ),
  }}
/>



      


     <Tab.Screen
  name="ExpertCommunity"
  component={CommunityForum}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/Images/profile.png")} 
        style={{
          width: 26,
          height: 26,
          marginTop: 2,
          tintColor: focused ? activeColor : inactiveColor, 
          opacity: focused ? 1 : inactiveOpacity,
        }}
        resizeMode="contain"
      />
    ),
  }}
/>

      <Tab.Screen
        name="ExpertChat"
        component={ExpertChats}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={26}
              color={focused ? activeColor : inactiveColor}
              style={{ marginTop: 2, opacity: focused ? 1 : inactiveOpacity }}
            />
          ),
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
});

export default ExpertTabs;

