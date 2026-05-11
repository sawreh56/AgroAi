import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

// Yahan variable ka naam 'experts' hona chahiye jo aapne niche map mein use kiya hai
const experts = [
  { id: '1', name: 'Dr. Irfan Malik', image: require('../../assets/Images/Expert.jpeg'), status: 'online' },
];

const messages = [
  { id: '1', name: 'Dr. Irfan Malik', lastMsg: 'Hello there, please share...', time: '12:40 pm', image: require('../../assets/Images/Expert.jpeg') },
];

export default function ChatListScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Ali</Text>
        <Text style={styles.mainTitle}>Expert List</Text>
        
        {/* Expert Horizontal List */}
        <View style={styles.expertRow}>
          {experts.map(expert => (
            <TouchableOpacity key={expert.id} style={styles.expertItem}>
              <View>
                <Image source={expert.image} style={styles.expertDp} />
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.expertName}>{expert.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Messages Section */}
      <View style={styles.contentCard}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#ccc" />
          <TextInput 
            placeholder="search" 
            placeholderTextColor="#ccc"
            style={styles.searchInput} 
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Pinned Messages({messages.length})</Text>
          {messages.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.msgItem}
              onPress={() => navigation.navigate("ChatWithExpert", { userName: item.name, userImg: item.image })}
            >
              <Image source={item.image} style={styles.msgDp} />
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={styles.msgName}>{item.name}</Text>
                <Text style={styles.msgText} numberOfLines={1}>{item.lastMsg}</Text>
              </View>
              <Text style={styles.msgTime}>{item.time}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, {marginTop: 20}]}>All Messages({messages.length})</Text>
          {messages.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.msgItem}
              onPress={() => navigation.navigate("ChatWithExpert", { userName: item.name, userImg: item.image })}
            >
              <Image source={item.image} style={styles.msgDp} />
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={styles.msgName}>{item.name}</Text>
                <Text style={styles.msgText} numberOfLines={1}>{item.lastMsg}</Text>
              </View>
              <Text style={styles.msgTime}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#82E0AA" },
  header: { paddingHorizontal: 25, paddingTop: 50, paddingBottom: 20 },
  greeting: { color: "#fff", fontSize: 14, opacity: 0.9 },
  mainTitle: { color: "#fff", fontSize: 24, fontWeight: "bold", marginVertical: 15 },
  expertRow: { flexDirection: 'row' },
  expertItem: { alignItems: 'center', marginRight: 20 },
  expertDp: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#fff' },
  onlineDot: { 
    width: 14, 
    height: 14, 
    backgroundColor: '#2ECC71', 
    borderRadius: 7, 
    position: 'absolute', 
    bottom: 5, 
    right: 2, 
    borderWidth: 2, 
    borderColor: '#82E0AA' 
  },
  expertName: { color: "#fff", fontSize: 12, marginTop: 8, fontWeight: '500' },
  
  contentCard: { 
    flex: 1, 
    backgroundColor: "#fff", 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    paddingHorizontal: 20,
    paddingTop: 30
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F7F9F9', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 50, 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#eee'
  },
  searchInput: { flex: 1, marginLeft: 10, color: '#000' },
  sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#333", marginBottom: 15 },
  msgItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  msgDp: { width: 60, height: 60, borderRadius: 30 },
  msgName: { fontSize: 16, fontWeight: "bold", color: "#2ECC71" },
  msgText: { color: "#7F8C8D", fontSize: 13, marginTop: 2 },
  msgTime: { color: "#BDC3C7", fontSize: 12 }
});