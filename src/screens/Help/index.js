import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  SafeAreaView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpAndFAQ({ navigation }) {
  // FAQ Data
  const initialData = [
    { id: '1', title: 'Getting started' },
    { id: '2', title: 'Troubleshoot Management' },
    { id: '3', title: 'How do create account?' },
    { id: '4', title: 'How do post first question?' },
    { id: '5', title: 'How do ask an expert directly?' },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  // Search Function logic
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredData(initialData);
    } else {
      const filtered = initialData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image - Yahan apna path dy dain */}
      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} 
        style={styles.bgImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.overlay}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Help & FAQ</Text>
            <View style={{ width: 24 }} /> 
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="search for help..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearch}
            />
            <Icon name="search-outline" size={20} color="#2ECC71" />
          </View>

          {/* FAQ Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Popular Topics</Text>
            
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Icon name="chevron-forward" size={18} color="#000" />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No results found</Text>
              }
            />
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Image ko thora dark karne ke liye
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    maxHeight: '70%', // List zyada lambi ho to scroll ho jaye
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999'
  }
});