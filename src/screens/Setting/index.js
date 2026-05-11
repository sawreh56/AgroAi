import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert // Alert add kiya
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Setting = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={22} color="#000" />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#000" />
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {

  // Logout Function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes", 
          onPress: () => navigation.replace("Login") // Yahan apni Login screen ka naam likhein
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} 
        style={styles.bgImage}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{ width: 30 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <View style={styles.card}>
              <Setting icon="pencil-outline" title="Edit Profile" />
              <View style={styles.separator} />
              <Setting icon="shield-lock-outline" title="Privacy Settings" />
              <View style={styles.separator} />
              <Setting icon="trash-can-outline" title="Delete Account" />
            </View>

            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.card}>
              <Setting icon="email-outline" title="Email Notifications" />
              <View style={styles.separator} />
              <Setting icon="bell-ring-outline" title="Push Notifications For Answers" />
            </View>

            <Text style={styles.sectionTitle}>Support & Info</Text>
            <View style={styles.card}>
              {/* Help & FAQ Navigation */}
              <Setting 
                icon="chat-question-outline" 
                title="Help & FAQ" 
                onPress={() => navigation.navigate('Help')} // Help screen ka path
              />
              <View style={styles.separator} />
              <Setting icon="file-document-outline" title="Terms & Conditions" />
              <View style={styles.separator} />
              <Setting icon="information-outline" title="About Agro AI" />
            </View>

            {/* Logout Button Logic */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 30 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 10, marginTop: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemText: { fontSize: 15, color: '#000', marginLeft: 12, fontWeight: '500' },
  separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 15 },
  logoutBtn: { backgroundColor: '#82E0AA', height: 55, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 30, elevation: 3 },
  logoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});