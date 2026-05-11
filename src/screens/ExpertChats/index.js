import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpertChats = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greenHeader}>
        <Text style={styles.greeting}>Hello Dr. Irfan</Text>
        <Text style={styles.headerTitle}>Expert Chats</Text>
        
        {/* Horizontal Expert List */}
        <View style={styles.farmerAvatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper}>
            <Image source={require('../../assets/Images/manPic.png')} style={styles.avatar} />
            <View style={styles.onlineDot} />
            <Text style={styles.farmerNameSmall}>Farmer, Ali</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.whiteContent}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#ccc" style={{marginRight: 10}} />
          <TextInput placeholder="search" style={styles.searchInput} />
        </View>

        <Text style={styles.sectionTitle}>All Messages(1)</Text>
        <View style={styles.activeTabUnderline} />

        {/* Message Item */}
        <TouchableOpacity 
          style={styles.messageItem}
          onPress={() => navigation.navigate('ChatWithFarmers')}
        >
          <Image source={require('../../assets/Images/manPic.png')} style={styles.msgAvatar} />
          <View style={styles.msgTextContainer}>
            <Text style={styles.msgName}>Farmer, Ali</Text>
            <Text style={styles.msgPreview} numberOfLines={1}>Hello Dr. Irfan, I have...</Text>
          </View>
          <Text style={styles.msgTime}>12:40 pm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7ADAA5' },
  greenHeader: { padding: 20, paddingBottom: 40 },
  greeting: { color: '#fff', fontSize: 14 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 15 },
  farmerAvatarContainer: { marginTop: 15 },
  avatarWrapper: { alignItems: 'center', width: 80 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#fff' },
  onlineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50', position: 'absolute', bottom: 20, right: 15, borderWidth: 2, borderColor: '#fff' },
  farmerNameSmall: { color: '#fff', fontSize: 12, marginTop: 5 },
  whiteContent: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 25 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 15, paddingHorizontal: 15, height: 45 },
  searchInput: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  activeTabUnderline: { width: 130, height: 3, backgroundColor: '#2196F3', marginTop: 5, borderRadius: 2 },
  messageItem: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  msgAvatar: { width: 50, height: 50, borderRadius: 25 },
  msgTextContainer: { flex: 1, marginLeft: 15 },
  msgName: { fontSize: 16, fontWeight: 'bold', color: '#7ADAA5' },
  msgPreview: { color: '#666', fontSize: 13 },
  msgTime: { color: '#333', fontSize: 12 },
});

export default ExpertChats;