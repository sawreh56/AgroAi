// import React from "react";
// import { View, Image } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Home from "../screens/Home";

// const Tab = createBottomTabNavigator();

// export default function TabNavigation() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           height: 70,
//           backgroundColor: "#fff",
//           borderTopLeftRadius: 25,
//           borderTopRightRadius: 25,
//           position: "absolute",
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: () => (
//             <View
//               style={{
//                 width: 70,
//                 height: 70,
//                 borderRadius: 35,
//                 backgroundColor: "#fff",
//                 top: -20, // LIFT BUTTON UP
//                 justifyContent: "center",
//                 alignItems: "center",
//                 elevation: 5,
//               }}
//             >
//               <Image
//                 source={require("../assets/Images/home.png")}
//                 style={{
//                   width: 38,
//                   height: 38,
//                   resizeMode: "contain",
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
