import { Image, ImageBackground, StyleSheet, Text,TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeBlurView from "../../Components/SafeBlurView";
import Icon from 'react-native-vector-icons/Ionicons';

const FarmerHome = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');


  const allCards = [
    {id: '1',title: 'Crop Recommendation',sub: 'Find the best crops for your land & season.', icon: require("../../assets/Images/leaf.png"),navigateTo: 'Recommedation',type: 'recommendation'},
    {id: '2',title: 'Pest & Disease Detection',sub: 'Quickly scan plants for diseases & pests.',icon: require("../../assets/Images/pest.png"),navigateTo: 'DiseaseDetection',type: 'detection'},
    {id: '3',title: 'Market Prices', sub: 'Check real-time local mandi rates.',icon: require("../../assets/Images/market.png"),type: 'market'},
    {id: '4',title: 'AgroDirect',sub: 'Buy or Sell crops directly, no middlemen.',icon: require("../../assets/Images/cart.png"), type: 'agroDirect'},
    {id: '5',title: 'Community Forum', sub: 'Connect with experts and other farmers.',icon: require("../../assets/Images/forum.png"),navigateTo: 'CommunityForum',type: 'forum' }
  ];

  const filteredCards = allCards.filter(card => 
    card.title.toLowerCase().includes(searchText.toLowerCase()) ||
    card.sub.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("../../assets/Images/bg2.png")}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 18, marginTop: 4 }}
            >
              <Icon name="menu" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image style={styles.iconn} source={require("../../assets/Images/icon.png")} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate("RewardsScreen")}>
              <Image style={styles.pointt} source={require("../../assets/Images/point.png")} />
            </TouchableOpacity>

            <Text style={styles.point250}>Points: 250</Text>

            <Text style={styles.tittle}>Home</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
              <Image style={styles.belll} source={require("../../assets/Images/bell.png")} />
            </TouchableOpacity>
          </View>

          <Text style={styles.welcm}>Welcome</Text>
          <Text style={styles.text1}>Ready to grow today?</Text>

          <View style={styles.searchBox}>
            <TextInput 
              placeholder="Search services..." 
              placeholderTextColor="#7f7f7f" 
              style={styles.searchInput}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <Image source={require("../../assets/Images/search.png")} style={styles.searchIcon} />
          </View>

        
          {filteredCards.length > 0 ? (
            filteredCards.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <View style={styles.blurBox}>
                  <SafeBlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
                  
                  
                  <View style={styles.cardRow}>
                    <Image source={item.icon} style={styles.cardIcon} />
                    <View>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardSub}>{item.sub}</Text>
                    </View>
                  </View>

                  
                  {item.type === 'recommendation' && (
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(item.navigateTo)}>
                      <Text style={styles.btnText}>Get Recommendation</Text>
                    </TouchableOpacity>
                  )}

                  {item.type === 'detection' && (
                    <TouchableOpacity 
                      style={[styles.btn, { width: 180 }]} 
                      onPress={() => navigation.navigate(item.navigateTo)}
                    >
                      <Text style={styles.btnText}>Scan Plant Now</Text>
                    </TouchableOpacity>
                  )}

                  {item.type === 'market' && (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 50 }}>
                      <Image source={require("../../assets/Images/marketarrow.png")} style={styles.marketarrow} />
                      <TouchableOpacity style={styles.btnSmall}  onPress={() => navigation.navigate("MarketPrice")}>
                        <Text style={styles.btnSmallText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {item.type === 'agroDirect' && (
                    <View style={styles.rowButtons}>
                      <TouchableOpacity style={styles.btnSmall} onPress={() => navigation.navigate("SellCrop")}>
                        <Text style={styles.btnSmallText}>Sell Crop</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnSmall} onPress={() => navigation.navigate("BuyCrops")}>
                        <Text style={styles.btnSmallText}>Buy Crop</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {item.type === 'forum' && (
                    <TouchableOpacity style={styles.btnSmall} onPress={() => navigation.navigate(item.navigateTo)}>
                      <Text style={styles.btnSmallText}>Join Now</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, opacity: 0.7 }}>No services found for "{searchText}"</Text>
            </View>
          )}

        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default FarmerHome;

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },

  bg: { 
    flex: 1, 
    resizeMode: "cover" 
  },

  iconn: { 
    height: 22, 
    width: 22, 
    marginLeft: 5, 
    marginTop: 8 
  },

  pointt: { 
    height: 20, 
    width: 20, 
    marginLeft: 8, 
    marginTop: 9 
  },

  point250: {
    color: "#fff", 
    marginLeft: 6, 
    fontSize: 9, 
    marginTop: 9 
  },
  tittle: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "900", 
    marginLeft: 18, 
    marginTop: 10 
  },

  belll: {
    height: 22, 
    width: 22, 
    marginLeft: 127, 
    marginTop: 15 
  },

  welcm: { 
    color: "#fff", 
    fontSize: 23, 
    fontWeight: "600", 
    marginLeft: 138, 
    marginTop: 20 
  },

  text1: { 
    color: "#fff", 
    fontSize: 15, 
    fontWeight: "600", 
    marginLeft: 120, 
    marginTop: 2 
  },

  searchBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    height: 45,
    width: 310,
    borderRadius: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 35,
    marginBottom: 10
  },

  searchInput: { 
    flex: 1, 
    color: "black" 
  },

  searchIcon: {
    width: 22, 
    height: 22 
  }
  ,
  cardWrapper: {
    width: 310,
    height: 110,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  blurBox: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff50",
  },
  blurFill: { 
    ...StyleSheet.absoluteFillObject 
  },

  cardRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 5 
  },
  marketarrow: { 
    width: 35, 
    height: 35 
  },
  cardIcon: { 
    width: 23, 
    height: 23, 
    marginLeft: 15, 
    marginTop: 10 
  },
  cardTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600", 
    marginTop: 10, 
    marginLeft: 20 
  },

  cardSub: { 
    color: "#d0d0d0", 
    fontSize: 12, 
    marginLeft: 20 
  },

  btn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    marginLeft: 80,
    width: 150,
    height: 35
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 10 
  },

  btnSmall: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginTop: 5,
    marginRight: 20
  },
  btnSmallText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 12 
  },
  rowButtons: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginLeft: 90 
  },
});