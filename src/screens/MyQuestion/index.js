import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyQuestion = () => {
    const navigation=useNavigation()
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Question Screen</Text>
    </View>
  );
};

export default MyQuestion;

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