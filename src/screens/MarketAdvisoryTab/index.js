import React, { useState } from 'react'; // useState add kiya
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MarketAdvisory({ navigation }) {
  // Search state aur static data (Example ke liye)
  const [search, setSearch] = useState('');
  
  // Example data list jo filter hogi
  const advisories = [
    "Wheat Price Forecast for Next Quaxt Quarter",
    "Maximing Profits in Vegetable Season",
    "Tips for Soil Health in Monsoon"
  ];

  // Search logic
  const filteredAdvisories = advisories.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.bg}>
        
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Market Advisory</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollPadding} // Padding yahan se set hogi
          showsVerticalScrollIndicator={false}
        >
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="search" 
              style={styles.searchInput} 
              placeholderTextColor="#888"
              value={search}
              onChangeText={(text) => setSearch(text)} // Search update
            />
            <Icon name="search-outline" size={20} color="#7ADAA5" />
          </View>

          {/* Crop Price Trends Card */}
          <View style={styles.glassCard}>
            <Text style={styles.cardHeading}>Crop Price Trends</Text>
            <View style={styles.priceItem}>
              <Text style={styles.cropText}>Wheat: <Text style={styles.valueText}>Current: PKR 3,700/Maund</Text> <Text style={styles.upTrend}>↑ 2%</Text></Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.cropText}>Rice: <Text style={styles.valueText}>Current prices shoving upward trend.</Text></Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.cropText}>Vegettoes</Text>
              <View style={styles.stableRow}>
                 <Text style={styles.cropText}>80 Kg </Text>
                 <View style={styles.dash} />
                 <Text style={styles.cropText}> Stable</Text>
              </View>
            </View>
          </View>

          {/* Share Price Insights */}
          <View style={[styles.glassCard, { marginTop: 20 }]}>
            <Text style={styles.cardHeading}>Share Price Insights</Text>
            <Text style={styles.subPara}>Write Your article to guide on ho pest control!</Text>
          </View>

          {/* Your Recent Advisories */}
          <View style={[styles.glassCard, { marginTop: 20 }]}>
            <Text style={styles.cardHeading}>Your Recent Advisories</Text>
            <View style={styles.listContainer}>
              {filteredAdvisories.length > 0 ? (
                filteredAdvisories.map((item, index) => (
                  <Text key={index} style={styles.listItem}>• {item}</Text>
                ))
              ) : (
                <Text style={styles.noResult}>No advisories found</Text>
              )}
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bg: { flex: 1 },
  header: { backgroundColor: '#7ADAA5', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  scrollPadding: { paddingHorizontal: 20, paddingVertical: 25, paddingBottom: 100 }, // Padding barha di
  searchContainer: { backgroundColor: '#fff', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 50, marginBottom: 25 },
  searchInput: { flex: 1, color: '#000', fontSize: 16 },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(122, 218, 165, 0.5)' },
  cardHeading: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  priceItem: { marginBottom: 15 },
  cropText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  valueText: { fontWeight: 'normal' },
  upTrend: { color: '#7ADAA5' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stableRow: { flexDirection: 'row', alignItems: 'center' },
  dash: { width: 10, height: 4, backgroundColor: '#fff', marginHorizontal: 5 },
  subPara: { color: '#fff', fontSize: 14, opacity: 0.9, lineHeight: 20 },
  listContainer: { marginTop: 10 },
  listItem: { color: '#fff', fontSize: 14, marginBottom: 18, opacity: 0.9 },
  noResult: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 10 },
});