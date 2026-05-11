import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const categories = ["All", "Grains", "Fruits", "Vegetables"];

// Data mein icons aur specific colors add kar diye hain
const marketData = [
  { name: "Wheat", category: "Grains", price: "3,200", unit: "Per 40kg bag", change: "+5.2%", up: true, market: "Lahore Market", time: "2 hours ago", icon: "🌾", iconColor: "#F1C40F" },
  { name: "Basmati Rice", category: "Grains", price: "280", unit: "Per kg", change: "-1.8%", up: false, market: "Karachi Market", time: "1 hour ago", icon: "🍚", iconColor: "#ECF0F1" },
  { name: "Tomato", category: "Vegetables", price: "120", unit: "Per kg", change: "+8.5%", up: true, market: "Islamabad Market", time: "30 min ago", icon: "🍅", iconColor: "#E74C3C" },
  { name: "Onion", category: "Vegetables", price: "85", unit: "Per kg", change: "-3.2%", up: false, market: "Faisalabad Market", time: "45 min ago", icon: "🧅", iconColor: "#D2B4DE" },
  { name: "Potato", category: "Vegetables", price: "60", unit: "Per kg", change: "+1.2%", up: true, market: "Lahore Market", time: "10 min ago", icon: "🥔", iconColor: "#D4AC0D" },
  { name: "Sugar", category: "Grains", price: "140", unit: "Per kg", change: "+2.1%", up: true, market: "Multan Market", time: "1 hour ago", icon: "🍬", iconColor: "#AED6F1" },
  { name: "Apple", category: "Fruits", price: "250", unit: "Per kg", change: "+4.0%", up: true, market: "Quetta Market", time: "5 hours ago", icon: "🍎", iconColor: "#FF5E5E" },
  { name: "Mango", category: "Fruits", price: "450", unit: "Per dozen", change: "-4.1%", up: false, market: "Sargodha Market", time: "20 min ago", icon: "🥭", iconColor: "#FFC300" },
  { name: "Corn", category: "Grains", price: "2,100", unit: "Per 40kg", change: "+0.5%", up: true, market: "Sahiwal Market", time: "3 hours ago", icon: "🌽", iconColor: "#F4D03F" },
];

export default function MarketPricesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const filteredData = marketData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} 
        style={styles.bgImage}
      >
        <View style={styles.darkOverlay}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
            
            {/* TOP NAVIGATION */}
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.navTitle}>Market Prices</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://maps.google.com")} style={styles.locIcon}>
                 <Icon name="location" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* HEADER TEXT */}
            <View style={styles.headerTextContainer}>
              <Text style={styles.mainHeading}>Price for RYK Mandi</Text>
              <Text style={styles.subHeading}>Real-time agricultural commodity rates</Text>
            </View>

            {/* SEARCH SECTION */}
            <View style={styles.searchWrapper}>
              <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#6E8C85" style={{marginLeft: 15}}/>
                <TextInput
                  placeholder="Search crops, fruits, vegetables..."
                  placeholderTextColor="#6E8C85"
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* STATS ROW */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Today's Average</Text>
                <Icon name="arrow-up-circle" size={20} color="#2ECC71" style={styles.arrowPos}/>
                <Text style={styles.statPrice}>PKR 2,450</Text>
                <Text style={styles.statPercent}>+2.4% Today</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Avg. Change</Text>
                <View style={styles.changeRow}>
                  <Text style={styles.changeValue}>+2.3%</Text>
                  <Icon name="trending-up" size={22} color="#2ECC71" />
                </View>
              </View>
            </View>

            {/* CATEGORY TABS */}
            <View style={styles.tabContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.tab, selectedCategory === cat && styles.activeTab]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={[styles.tabText, selectedCategory === cat && styles.activeTabText]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* DATA LISTING */}
            <View style={{paddingHorizontal: 18}}>
              {filteredData.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.cardTop}>
                    {/* Unique Icon Circle */}
                    <View style={[styles.iconSquare, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: item.iconColor, borderWidth: 1 }]}>
                       <Text style={{fontSize: 22}}>{item.icon}</Text>
                    </View>
                    
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemUnit}>{item.unit}</Text>
                    </View>
                    
                    <View style={styles.itemPriceInfo}>
                      <Text style={styles.itemPrice}>PKR {item.price}</Text>
                      <Text style={[styles.itemChange, {color: item.up ? '#2ECC71' : '#E74C3C'}]}>
                        {item.up ? '▲' : '▼'} {item.change}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardBottom}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="time-outline" size={12} color="#6E8C85" />
                        <Text style={styles.updateText}> {item.time}</Text>
                    </View>
                    <Text style={styles.marketText}>{item.market}</Text>
                  </View>
                </View>
              ))}
            </View>

          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#040D0B" },
  bgImage: { flex: 1 },
  darkOverlay: { flex: 1, backgroundColor: "rgba(4, 13, 11, 0.95)" }, // Mazeed dark overlay
  
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 },
  navTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  locIcon: { backgroundColor: '#2ECC71', padding: 8, borderRadius: 50 },

  headerTextContainer: { alignItems: 'center', marginTop: 20 },
  mainHeading: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  subHeading: { color: "#6E8C85", fontSize: 14, marginTop: 5 },

  searchWrapper: { paddingHorizontal: 18, marginTop: 25 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: "#0A1F1C", // Darker field
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#1B3D36',
    height: 55
  },
  searchInput: { flex: 1, color: "#fff", paddingHorizontal: 12, fontSize: 15 },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 20 },
  statCard: { 
    width: '48%', 
    backgroundColor: '#0A1F1C', 
    borderRadius: 15, 
    padding: 15, 
    borderWidth: 1.2, 
    borderColor: '#1B3D36' 
  },
  statLabel: { color: "#6E8C85", fontSize: 12 },
  statPrice: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 8 },
  statPercent: { color: "#2ECC71", fontSize: 11, marginTop: 2 },
  changeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  changeValue: { color: "#2ECC71", fontSize: 20, fontWeight: "bold" },
  arrowPos: { position: 'absolute', right: 12, top: 12 },

  tabContainer: { paddingLeft: 18, marginVertical: 25 },
  tab: { paddingVertical: 10, paddingHorizontal: 22, borderRadius: 30, backgroundColor: '#0A1F1C', marginRight: 12, borderWidth: 1, borderColor: '#1B3D36' },
  activeTab: { backgroundColor: '#1B3D36', borderColor: '#2ECC71' },
  tabText: { color: "#6E8C85", fontSize: 14 },
  activeTabText: { color: "#fff", fontWeight: "bold" },

  itemCard: { 
    backgroundColor: "#0A1F1C", // Pehle se dark card
    borderRadius: 18, 
    padding: 16, 
    marginBottom: 15, 
    borderWidth: 1.5, 
    borderColor: '#162E29', // Visible border
    elevation: 5
  },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  iconSquare: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  itemUnit: { color: "#6E8C85", fontSize: 13, marginTop: 2 },
  itemPriceInfo: { alignItems: 'flex-end' },
  itemPrice: { color: "#fff", fontSize: 19, fontWeight: "bold" },
  itemChange: { fontSize: 13, fontWeight: "bold", marginTop: 2 },
  
  cardBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#1B3D36' 
  },
  updateText: { color: "#6E8C85", fontSize: 11 },
  marketText: { color: "#6E8C85", fontSize: 11, fontWeight: '500' }
});