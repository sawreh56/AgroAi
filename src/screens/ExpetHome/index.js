import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from "@react-native-community/blur";


const ExpetHome = () => {
    const NavigationContainer= useNavigation()
  return (
   
  <View style={styles.container}>
    <ImageBackground
      style={styles.bg}
      source={require("../../assets/Images/bg2.png")}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >

        {/* TOP BAR */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity>
            <Image style={styles.menuu} source={require("../../assets/Images/menu.png")} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image style={styles.iconn} source={require("../../assets/Images/icon.png")} />
          </TouchableOpacity>


          <Text style={styles.tittle}>Home</Text>

          <TouchableOpacity>
            <Image style={styles.belll} source={require("../../assets/Images/bell.png")} />
          </TouchableOpacity>
        </View>

        {/* TEXT */}
        <Text style={styles.welcm}>Hello, Dr. Irfan!</Text>
        <Text style={styles.text1}>Ready to empower farmers today?</Text>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput placeholder="Search" placeholderTextColor="#7f7f7f" style={styles.searchInput} />
          <Image source={require("../../assets/Images/search.png")} style={styles.searchIcon} />
        </View>

        {/* ALL CARDS */}
      
        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
                <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
                <View style={styles.row}>
                    <Image
                        source={require("../../assets/Images/chats.png")}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardTitle}>New Farmer Queries</Text>
                </View>

                <Text style={styles.cardText}>
                Farmers are waiting your valuable insights.
                </Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>View & Answer</Text>
                </TouchableOpacity>   
          </View>
        </View>
        <View style={styles.cardContent}>
        </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />


            <View style={styles.row}>
            <Image
              source={require("../../assets/Images/states.png")}
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Your Impact</Text>
          </View>

            <View style={{flexDirection:"row"}}>

            <View style={{flexDirection:"column",marginLeft:30,marginTop:10}}>
            <Text style={{color:'#fff',fontSize:12,}}>Rating: 4.8/5</Text>
            <Text style={{color:'#fff',fontSize:12,marginTop:10}}>Answered: 150</Text>
            </View>

            <View style={{height:60,width:1,backgroundColor:"#fff",marginLeft:40}}></View>

            <View style={{flexDirection:"column",marginLeft:30,marginTop:10}}>
            <Text style={{color:'#fff',fontSize:12,}}>Answered              150</Text>
            <Text style={{color:'#fff',fontSize:12,marginTop:10}}>Farmers Helped:    75</Text>
            </View>

            </View>
          
        </View>
        <View style={styles.cardContent}></View>
        </View>




        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />
             <View style={styles.row}>
            <Image
              source={require("../../assets/Images/market.png")}
              style={styles.cardIcon1}
            />
            <Text style={styles.cardTitle}>Market Advisory</Text>
          </View>

          <Text style={styles.cardText}>
            Review crop listing and advice on market trends.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>View Market Trends</Text>
          </TouchableOpacity>
          </View>
                    <View style={styles.cardContent}></View>
        </View>







        <View style={styles.cardWrapper}>
          <View style={styles.blurBox}>
            <BlurView style={styles.blurFill} blurType="dark" blurAmount={5} />

             <View style={styles.row}>
            <Image
              source={require("../../assets/Images/book.png")}
              style={styles.cardIcon1}
            />
            <Text style={styles.cardTitle}>Knowledge Hub</Text>
          </View>

          <Text style={styles.cardText}>
            Share articles or create new guides for farmers.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>+ New Articles</Text>
          </TouchableOpacity>
                  </View>
          <View style={styles.cardContent}></View>
        </View>



      </ScrollView>
    </ImageBackground>
  </View>
);

}

export default  ExpetHome

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
    marginLeft:110,
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
    marginLeft:110,
    marginTop:20
  },
  text1:{
    color:"#fff",
    fontSize:15,
    fontWeight:"600",
    marginLeft:70,
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
    flex: 1
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
//   padding: 20,
  
},

topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},

  topIcon: { 
    width: 32,
    height: 32,
    tintColor: "#fff"
},

homeText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "600" 
},

  hello: { 
    color: "#fff", 
    fontSize: 23, 
    fontWeight: "700", 
    marginTop: 18 

},
  subtitle: { 
    color: "#fff", 
    opacity: 0.9 
},
  /* BODY */

  card: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 18,
    borderColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    marginBottom: 18,
  },

  
  cardIcon: {
    width: 22, 
    height: 22,
    tintColor: "#7ADAA5",
    marginLeft:10,
    marginTop:10
 },

 cardIcon1: {
    width: 18, 
    height: 18,
    tintColor: "#7ADAA5",
    marginLeft:10,
    marginTop:10
 },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 15,
  },
  cardText: { color: "#fff", opacity: 0.8, marginLeft:50,fontSize:12},

  row: { flexDirection: "row", alignItems: "center" },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  smallText: { color: "#fff", opacity: 0.75 ,fontSize:12,},

  button: {
    backgroundColor: "#7ADAA5",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    height:30,
    width:140,
    marginLeft:80
  },
  btnText: { color: "#fff", fontWeight: "700",fontSize:12 },

  /* BOTTOM TAB */
  bottomTab: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabIcon: { width: 26, height: 26, tintColor: "#7ADAA5" },




  
  
})