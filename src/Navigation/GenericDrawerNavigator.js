import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

/**
 * GenericDrawerNavigator - Reusable drawer component based on role configuration
 * @param {Array} screens - Array of screen configurations with name, component, and label
 * @param {Object} drawerStyle - Custom drawer styling options
 * @returns {JSX.Element} Configured drawer navigator
 * 
 * Usage:
 * const config = DRAWER_CONFIG[role];
 * <GenericDrawerNavigator screens={config.screens} drawerStyle={config.drawerStyle} />
 */
const GenericDrawerNavigator = ({ screens = [], drawerStyle = {} }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#7ADAA5',
          ...drawerStyle,
        },
      }}
    >
      {screens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            drawerLabel: screen.label || screen.name,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default GenericDrawerNavigator;
