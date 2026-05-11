import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Experts = () => {
    const navigation=useNavigation()
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experts Screen</Text>
    </View>
  );
};

export default Experts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // ✅ white background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});