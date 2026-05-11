import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';

const BuyCrops = () => {
  const navigation = useNavigation();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default "All" rakha hai

  // Complete Data with all your specific types
  const allCrops = [
    // WHEAT Category
    { id: 'w1', name: 'Hard Wheat', category: 'Wheat', price: 'PKR 110/KG', weight: '500kg', seller: 'Khan Traders', loc: 'Punjab', img: require('../../assets/Images/HardWhete.jpeg') },
    { id: 'w2', name: 'Hard Red Wheat', category: 'Wheat', price: 'PKR 130/KG', weight: '300kg', seller: 'Zaman Farm', loc: 'Sahiwal', img: require('../../assets/Images/HardRed.jpeg') },
    { id: 'w3', name: 'Soft White', category: 'Wheat', price: 'PKR 105/KG', weight: '400kg', seller: 'Ali Agriculture', loc: 'Okara', img: require('../../assets/Images/shortRice.jpeg') },
    { id: 'w4', name: 'Enikorn', category: 'Wheat', price: 'PKR 150/KG', weight: '100kg', seller: 'Bio Seeds', loc: 'Peshawar', img: require('../../assets/Images/enikornwhete.jpeg') },
    { id: 'w5', name: 'Rye', category: 'Wheat', price: 'PKR 140/KG', weight: '200kg', seller: 'Modern Grain', loc: 'Multan', img: require('../../assets/Images/Ryewhete.jpeg') },

    // RICE Category
    { id: 'r1', name: 'Basmati', category: 'Rice', price: 'PKR 350/KG', weight: '1000kg', seller: 'Super Rice Mills', loc: 'Gujranwala', img: require('../../assets/Images/basmatiRice.jpeg') },
    { id: 'r2', name: 'Long Grain', category: 'Rice', price: 'PKR 280/KG', weight: '800kg', seller: 'Sethi & Co', loc: 'Sheikhupura', img: require('../../assets/Images/LongRice.jpeg') },
    { id: 'r3', name: 'Brown Rice', category: 'Rice', price: 'PKR 320/KG', weight: '200kg', seller: 'Organic Hub', loc: 'Lahore', img: require('../../assets/Images/brownRice.jpeg') },
    { id: 'r4', name: 'Black Rice', category: 'Rice', price: 'PKR 500/KG', weight: '50kg', seller: 'Elite Grains', loc: 'Islamabad', img: require('../../assets/Images/blackRice.jpeg') },
    { id: 'r5', name: 'Short Grain', category: 'Rice', price: 'PKR 240/KG', weight: '600kg', seller: 'Local Mill', loc: 'Sialkot', img: require('../../assets/Images/shortRice.jpeg') },

    // VEGETABLES
    { id: 'v1', name: 'Redish', category: 'Vegetables', price: 'PKR 60/KG', weight: '100kg', seller: 'Aslam Khan', loc: 'Lahore', img: require('../../assets/Images/radish.jpeg') },
    { id: 'v2', name: 'Cauliflower', category: 'Vegetables', price: 'PKR 80/KG', weight: '200kg', seller: 'Irfan Ali', loc: 'Faisalabad', img: require('../../assets/Images/Couliflower.jpeg') },
    { id: 'v3', name: 'Lady Finger', category: 'Vegetables', price: 'PKR 120/KG', weight: '150kg', seller: 'Bashir Ahmed', loc: 'Multan', img: require('../../assets/Images/ladyFinger.jpeg') },
    { id: 'v4', name: 'Onion', category: 'Vegetables', price: 'PKR 200/KG', weight: '500kg', seller: 'Zafar Iqbal', loc: 'Sahiwal', img: require('../../assets/Images/Onion.png') },
    { id: 'v5', name: 'Brinjal', category: 'Vegetables', price: 'PKR 70/KG', weight: '120kg', seller: 'Ali Raza', loc: 'Okara', img: require('../../assets/Images/bringel.jpeg') },
    { id: 'v6', name: 'Capsicum', category: 'Vegetables', price: 'PKR 180/KG', weight: '80kg', seller: 'Hamza', loc: 'Gujranwala', img: require('../../assets/Images/BellPePPer.jpeg') },
    
    // FRUITS
    { id: 'f1', name: 'Mango', category: 'Fruits', price: 'PKR 250/KG', weight: '300kg', seller: 'Malik Farm', loc: 'Rahim Yar Khan', img: require('../../assets/Images/mango.png') },
    { id: 'f2', name: 'Strawberry', category: 'Fruits', price: 'PKR 400/KG', weight: '50kg', seller: 'Sajid Ali', loc: 'Islamabad', img: require('../../assets/Images/stawebery.jpeg') },
    { id: 'f3', name: 'Guava', category: 'Fruits', price: 'PKR 100/KG', weight: '200kg', seller: 'Nawaz Khan', loc: 'Kohat', img: require('../../assets/Images/Gava.jpeg') },
    { id: 'f4', name: 'Watermelon', category: 'Fruits', price: 'PKR 50/KG', weight: '1000kg', seller: 'Gul Khan', loc: 'Sindh', img: require('../../assets/Images/watermilon.jpeg') },
    { id: 'f5', name: 'Mulberry', category: 'Fruits', price: 'PKR 300/KG', weight: '40kg', seller: 'Yousaf', loc: 'Swat', img: require('../../assets/Images/Mulberry.jpeg') },
  ];

  // Logic: "All" handle karne ke liye filter ko update kiya hai
  const filteredCrops = allCrops.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Wheat', 'Vegetables', 'Fruits', 'Rice'];

  return (
    <ImageBackground 
      source={require('../../assets/Images/BackGround.png')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Image source={require('../../assets/Images/backarrow.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buy Crops</Text>
          <TouchableOpacity style={styles.headerBtn}>
             <Image source={require('../../assets/Images/cart.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Image style={styles.innerSearchIcon} source={require('../../assets/Images/search.png')} />
            <TextInput
              style={styles.input}
              placeholder="Search crops, prices..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <Image style={styles.locationIcon} source={require('../../assets/Images/location.png')} />
          </View>
        </View>

        {/* Categories Tabs - "All" option included */}
        <View style={styles.tabWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.tabButton,
                  selectedCategory === cat ? styles.activeTab : styles.inactiveTab
                ]}
              >
                <Text style={[
                  styles.tabText,
                  { color: selectedCategory === cat ? '#FFFFFF' : '#333333' }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Crops List - Dynamic Rendering */}
        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredCrops.map((item) => (
            <View key={item.id} style={styles.cropCard}>
              <Image source={item.img} style={styles.cropImage} />
              <View style={styles.cropDetails}>
                <View style={styles.topRow}>
                  <View>
                    <Text style={styles.cropNameText}>{item.name}</Text>
                    <Text style={styles.weightText}>Available, {item.weight}</Text>
                  </View>
                  <Text style={styles.priceTag}>{item.price}</Text>
                </View>
                
                <View style={styles.bottomRow}>
                  <Text style={styles.sellerInfo}>by: {item.seller}{"\n"}{item.loc}</Text>
                  <TouchableOpacity style={styles.detailsBtn}>
                    <Text style={styles.detailsBtnText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          {filteredCrops.length === 0 && (
            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { flex: 1, backgroundColor: 'rgba(10, 18, 26, 0.92)' },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  headerIcon: { color: '#FFF', height: 26, width: 26 },
  searchSection: { paddingHorizontal: 20, marginBottom: 15 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#263238',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#7ADAA5'
  },
  innerSearchIcon: { width: 20, height: 20, marginRight: 8 },
  input: { flex: 1, color: '#FFF', height: 45, fontSize: 14 },
  locationIcon: { width: 14, height: 18, marginRight: 8 },
  tabWrapper: { paddingLeft: 20, marginBottom: 15 },
  tabButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 12,
    elevation: 2,
  },
  activeTab: { backgroundColor: '#7ADAA5' },
  inactiveTab: { backgroundColor: '#FFFFFF' },
  tabText: { fontWeight: 'bold', fontSize: 13 },
  listContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  cropCard: {
    backgroundColor: '#7ADAA5', // Green translucent cards
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 15,
  },
  cropImage: { width: 105, height: 105, borderRadius: 12 },
  cropDetails: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cropNameText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  weightText: { color: '#EEE', fontSize: 11, marginTop: 2 },
  priceTag: { color: '#ff5252', fontWeight: 'bold', fontSize: 13 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sellerInfo: { color: '#FFF', fontSize: 10, opacity: 0.9, lineHeight: 14 },
  detailsBtn: { backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  detailsBtnText: { color: '#7ADAA5', fontWeight: 'bold', fontSize: 11 },
  emptyText: { color: '#999', textAlign: 'center', marginTop: 50, fontSize: 16 },
});

export default BuyCrops;