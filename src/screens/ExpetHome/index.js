import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; 
import SafeBlurView from "../../Components/SafeBlurView";

const ExpetHome = () => {
  const navigation = useNavigation(); 
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={require("../../assets/Images/BackGround.png")}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Header Section */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Image style={styles.bellIcon} source={require("../../assets/Images/bell.png")} />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcm}>Hello, Dr. Irfan!</Text>
            <Text style={styles.text1}>Ready to empower farmers today?</Text>
          </View>

          <View style={styles.searchBox}>
            <TextInput 
              placeholder="Search" 
              placeholderTextColor="#7f7f7f" 
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity>
              <Icon name="search-outline" size={20} color="#7ADAA5" />
            </TouchableOpacity>
          </View>

          {/* 1. New Farmer Queries Card */}
          <View style={styles.cardWrapper}>
            <SafeBlurView style={styles.blurFill} blurType="dark" blurAmount={10} />
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <Image source={require("../../assets/Images/expertChat.png")} style={styles.localIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>New Farmer Queries</Text>
                  <Text style={styles.cardText}>Farmers are waiting your valuable insights.</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('QueriesScreen')}
              >
                <Text style={styles.btnText}>View & Answer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 2. Your Impact Card (Stats) */}
          <View style={styles.cardWrapper}>
            <SafeBlurView style={styles.blurFill} blurType="dark" blurAmount={10} />
            <View style={styles.cardContent}>
              <TouchableOpacity 
                style={styles.row} 
                onPress={() => navigation.navigate('Impact1')}
              >
                <Image source={require("../../assets/Images/YourImpact.png")} style={styles.localIcon} />
                <Text style={styles.cardTitle}>Your Impact</Text>
              </TouchableOpacity>
              

              
              <View style={styles.statsContainer}>
                <View style={styles.statCol}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Rating: 4.8/5</Text>
                    <Icon name="chevron-down" size={14} color="#fff" />
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Answered</Text>
                    <Text style={styles.statValue}>150</Text>
                  </View>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.statCol}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Answered</Text>
                    <Text style={styles.statValue}>150</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Farmers Helped</Text>
                    <Text style={styles.statValue}>75</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>


          {/* 3. Market Advisory Card */}
          <View style={styles.cardWrapper}>
            <SafeBlurView style={styles.blurFill} blurType="dark" blurAmount={10} />
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <Image source={require("../../assets/Images/advisory.png")} style={styles.localIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Market Advisory</Text>
                  <Text style={styles.cardText}>Review crop listing and advice on market trends.</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('MarketAvisor1')}
              >
                <Text style={styles.btnText}>View Market Trends</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. Knowledge Hub Card */}
          <View style={styles.cardWrapper}>
            <SafeBlurView style={styles.blurFill} blurType="dark" blurAmount={10} />
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <Image source={require("../../assets/Images/HUB.png")} style={styles.localIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Knowledge Hub</Text>
                  <Text style={styles.cardText}>Share articles or create new guides for farmers.</Text>
                </View>
              </View>
              {/* Is button par KnowledgeHub screen ki navigation hai */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('KnowledgeHub')}
              >
                <Text style={styles.btnText}>+ New Articles</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "600" },
  bellIcon: { height: 25, width: 23 },
  welcomeSection: { alignItems: 'center', marginTop: 20 },
  welcm: { color: "#fff", fontSize: 22, fontWeight: "700" },
  text1: { color: "#fff", fontSize: 14, opacity: 0.9, marginLeft: 42 },
  searchBox: { marginTop: 20, backgroundColor: "#fff", height: 45, marginHorizontal: 25, borderRadius: 25, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchInput: { flex: 1, color: "black", fontSize: 14 },
  cardWrapper: { marginHorizontal: 20, marginTop: 15, borderRadius: 15, overflow: "hidden", borderWidth: 1, borderColor: "#7ADAA5" },
  blurFill: { ...StyleSheet.absoluteFillObject },
  cardContent: { padding: 15 },
  row: { flexDirection: "row", alignItems: 'flex-start', marginBottom: 12 },
  localIcon: { width: 28, height: 28, marginRight: 12, tintColor: '#7ADAA5' },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardText: { color: "#fff", fontSize: 12, marginTop: 4, width: '95%' },
  button: { backgroundColor: "#7ADAA5", paddingVertical: 10, borderRadius: 12, alignItems: "center", width: '60%', alignSelf: 'center', marginTop: 5 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  statsContainer: { flexDirection: 'row', paddingVertical: 10 },
  statCol: { flex: 1 },
  statItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingHorizontal: 5 },
  statLabel: { color: '#fff', fontSize: 12 },
  statValue: { color: '#fff', fontSize: 12, fontWeight: '700' },
  verticalDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.5)', height: '100%', marginHorizontal: 10 },
});

export default ExpetHome;