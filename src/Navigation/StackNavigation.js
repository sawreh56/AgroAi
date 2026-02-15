import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import RoleSelect from '../screens/RoleSelect/index';
import OnbordingMain from '../screens/OnbordingMain'
import Onbording from '../screens/Onbording';
import Onbording2 from '../screens/Onbording2';
import Onbording3 from '../screens/Onbording3';
import Onbording4 from '../screens/Onbording4';
import Onbording5 from '../screens/Onbording5';
import Login from '../screens/Login';
import Otp from '../screens/Otp'
import Guest from '../screens/Guest'
import FarmerAccount from '../screens/FarmerAccount'
import ExpertAccount from '../screens/ExpertAccount'
import CongratulationFarmer from '../screens/CongratulationFarmer'
import CongratulationExprt from '../screens/CongratulationExprt'
import Home from '../screens/Home'
import ExpetHome from '../screens/ExpetHome'
import DiseaseDetection from '../screens/DiseaseDetection'
import DetectionResult from '../screens/DetectionResult'
import Recommedation from '../screens/Recommedation'
import CropRecommend from '../screens/CropRecommend'



const Stack = createNativeStackNavigator();
const StackNavigation = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>

        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelect} />
        <Stack.Screen name="OnbordingMain" component={OnbordingMain} />
        <Stack.Screen name="Onbording" component={Onbording} />
        <Stack.Screen name="Onbording2" component={Onbording2} />
        <Stack.Screen name="Onbording3" component={Onbording3} />
        <Stack.Screen name="Onbording4" component={Onbording4} />
        <Stack.Screen name="Onbording5" component={Onbording5} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Guest" component={Guest} />
        <Stack.Screen name="FarmerAccount" component={FarmerAccount} />
        <Stack.Screen name="ExpertAccount" component={ExpertAccount} />
        <Stack.Screen name="CongratulationFarmer" component={CongratulationFarmer} />
        <Stack.Screen name="CongratulationExprt" component={CongratulationExprt} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}
        <Stack.Screen name="ExpetHome" component={ExpetHome} />
        <Stack.Screen name="DiseaseDetection" component={DiseaseDetection} />
        <Stack.Screen name="DetectionResult" component={DetectionResult} />
        <Stack.Screen name="Recommedation" component={Recommedation} />
        <Stack.Screen name="CropRecommend" component={CropRecommend} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

