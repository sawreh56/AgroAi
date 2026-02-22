import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from "@react-native-community/blur";


const FarmerHome = () => {
    const navigation= useNavigation()
  return (
   
  <View style={styles.container}>
    <ImageBackground
      style={styles.bg}
      source={require("../../assets/Images/bg2.png")}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        // contentContainerStyle={{ paddingBottom: 80 }}
      >

        {/* TOP BAR */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity>
            <Image style={styles.menuu} source={require("../../assets/Images/menu.png")} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={styles.iconn} source={require("../../assets/Images/icon.png")} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={styles.pointt} source={require("../../assets/Images/point.png")} />
          </TouchableOpacity>

          <Text style={styles.point250}>Points: 250</Text>

          <Text style={styles.tittle}>Home</Text>

          <TouchableOpacity>
            <Image style={styles.belll} source={require("../../assets/Images/bell.png")} />
          </TouchableOpacity>
        </View>

        {/* TEXT */}
        <Text style={styles.welcm}>Welcome</Text>
        <Text style={styles.text1}>Ready to grow today?</Text>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput placeholder="Search" placeholderTextColor="#7f7f7f" style={styles.searchInput} />
          <Image source={require("../../assets/Images/search.png")} style={styles.searchIcon} />
        </View>

        {/* ALL CARDS */}
      
        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
           <View style={styles.cardRow}>
              <Image source={require("../../assets/Images/leaf.png")} style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Crop Recommendation</Text>
                <Text style={styles.cardSub}>Find the best crops for your land & season.</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Recommedation")}>
            <Text style={styles.btnText}>Get Recommendation</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}></View>
        </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
            <View style= {styles.cardRow}>
              <Image source={require("../../assets/Images/pest.png")} style={styles.cardIcon} />
              <TouchableOpacity  onPress={() => navigation.navigate("DiseaseDetection")}>
                <View>
                <Text style={styles.cardTitle}>Pest & Disease Detection</Text>
                <Text style={styles.cardSub}>Quickly scan plants for diseases & pests.</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContent}></View>
        </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
            <View style={styles.cardRow}>
              <Image source={require("../../assets/Images/market.png")} style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Market Prices</Text>
                <Text style={styles.cardSub}>Check real-time local mandi rates.</Text>
              </View>
            </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 50 }}>
                  <Image source={require("../../assets/Images/marketarrow.png")} style={styles.marketarrow} />
                    <TouchableOpacity style={styles.btnSmall}>
                      <Text style={styles.btnSmallText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                  <View style={styles.cardContent}></View>
                </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
            <View style={styles.cardRow}>
              <Image source={require("../../assets/Images/cart.png")} style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>AgroDirect</Text>
                <Text style={styles.cardSub}>Buy or Sell crops directly, no middlemen.</Text>
              </View>
            </View>
            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.btnSmall} onPress={() => navigation.navigate("SellCrop")}>
                <Text style={styles.btnSmallText}>Sell Crop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSmall}>
                <Text style={styles.btnSmallText}>Buy Crop</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContent}></View>
        </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
            <View style={styles.cardRow}>
              <Image source={require("../../assets/Images/forum.png")} style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Community Forum</Text>
                <Text style={styles.cardSub}>Connect with experts and other farmers.</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btnSmall}>
              <Text style={styles.btnSmallText}>Join Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}></View>
        </View>



      </ScrollView>
    </ImageBackground>
  </View>
);

}

export default FarmerHome

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg:{
    flex:1,
    resizeMode:"cover"
    
  },
  menuu:{
    height:17,
    width:17,
    marginLeft:15,
    marginTop:8
  },
  iconn:{
    height:18,
    width:18,
    marginLeft:5,
    marginTop:8
    
  },
  pointt:{
    height:16,
    width:16,
    marginLeft:5,
    marginTop:8
  },
  point250:{
    color:"#fff",
    margin:4,
    fontSize:9,
    marginTop:9
  },
  tittle:{
    color:"#fff",
    fontSize:18,
    fontWeight:"600",
    marginLeft:45,
    marginTop:2
  },
  belll:{
    height:20,
    width:20,
    marginLeft:100,
    marginTop:12
    
  },
  welcm:{
    color:"#fff",
    fontSize:23,
    fontWeight:"600",
    marginLeft:138,
    marginTop:20
  },
  text1:{
    color:"#fff",
    fontSize:15,
    fontWeight:"600",
    marginLeft:120,
    marginTop:2
  },
  searchBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    height: 45,
    width:310,
    borderRadius: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft:22
  },
  searchInput: {
    flex: 1,
    color:"black"
  },
  searchIcon: {
    width: 22,
    height: 22
  },
  cardWrapper: {
    width: 300,
    alignSelf: "center",
    marginTop: 20,
  },

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
  ...StyleSheet.absoluteFillObject,
},

cardContent: {
  flex: 1,
  borderRadius: 15,
  padding: 20,
  
},

  cardRow: {
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 10
  },
  marketarrow: {
    width: 35,
    height: 35,},

  cardIcon: {
    width: 23, 
    height: 23,
    marginLeft: 15 ,
    marginTop:10
  },
  cardTitle: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600", 
    marginTop:10,
    marginLeft:20
  },
  cardSub: { 
    color: "#d0d0d0",
    fontSize: 12, 
    marginLeft:20
  },

  btn: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    marginLeft:80,
    width:150,
    height:35
  },
  btnText: { 
    color: "#fff",
    fontWeight: "600", 
    fontSize:10
  },

  btnSmall: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight:20
  },
  btnSmallText: { 
    color: "#fff",
    fontWeight: "600",
    fontSize: 12
  },

  rowButtons: { flexDirection: "row", justifyContent: "space-between",marginLeft :90},




  
  
})