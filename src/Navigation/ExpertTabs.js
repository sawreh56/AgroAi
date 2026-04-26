import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ExpetHome from '../screens/ExpetHome';
import ChatScreen from '../screens/ChatScreen';
import CommunityForum from '../screens/CommunityForum';

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
        name="ExpertCommunity"
        component={CommunityForum}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'people' : 'people-outline'}
              size={26}
              color={focused ? activeColor : inactiveColor}
              style={{ marginTop: 2, opacity: focused ? 1 : inactiveOpacity }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ExpertChat"
        component={ChatScreen}
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

