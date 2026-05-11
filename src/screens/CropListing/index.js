import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Linking, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CropDetails = ({ route, navigation }) => {
  const { imageUri, name, variety, phone } = route.params || {};
  const sellerName = "Munir Hussain";

  const openWhatsApp = () => {
    let msg = `Salam Munir Hussain, main aapki crop "${name}" ke baare mein baat karna chahta hoon.`;
    let url = `whatsapp://send?phone=${phone}&text=${msg}`;
    Linking.openURL(url).catch(() => Linking.openURL(`https://wa.me/${phone}`));
  };

  const openDialer = () => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      {/* Background Image Wrapper */}
      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} // <--- Yahan apna path paste karein
        style={styles.bgImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Crop Details</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SellCrop")}>
              <Icon name="create-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            {/* BANNER IMAGE */}
            <View style={styles.bannerContainer}>
              <Image source={{ uri: imageUri }} style={styles.bannerImage} />
              <View style={styles.dotContainer}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            {/* INFO CARD */}
            <View style={styles.whiteCard}>
              <Text style={styles.grayLabel}>Crop Name</Text>
              <View style={styles.row}>
                <Text style={styles.cropTitle}>{name}</Text>
                <Text style={{fontSize:20, marginLeft:5}}>🌾</Text>
              </View>
              <Text style={styles.grayLabel}>Variety</Text>
              <Text style={styles.varietyText}>{variety}</Text>
              
              <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                    <Text style={styles.grayLabel}>Quantity</Text>
                    <Text style={styles.boldValue}>500 kg</Text>
                </View>
                <View style={styles.gridItem}>
                    <Text style={styles.grayLabel}>Price</Text>
                    <Text style={styles.boldValue}>Rs. 120/kg</Text>
                </View>
                <View style={styles.gridItem}>
                    <Text style={styles.grayLabel}>Type</Text>
                    <Text style={styles.boldValue}>Organic</Text>
                </View>
                <View style={styles.gridItem}>
                    <Text style={styles.grayLabel}>Harvest</Text>
                    <Text style={styles.boldValue}>May 2026</Text>
                </View>
              </View>
            </View>

            {/* SELLER INFO */}
            <View style={styles.whiteCard}>
              <Text style={styles.cardHeading}>Seller Information</Text>
              <View style={styles.sellerRow}>
                <View style={styles.iconContainer}><Icon name="person" size={20} color="#2ECC71" /></View>
                <View style={styles.sellerTextCol}>
                  <Text style={styles.grayLabel}>Seller Name</Text>
                  <Text style={styles.boldValue}>{sellerName}</Text>
                </View>
              </View>

              <View style={[styles.sellerRow, {marginTop: 15}]}>
                <View style={styles.iconContainer}><Icon name="call" size={20} color="#2ECC71" /></View>
                <View style={styles.sellerTextCol}>
                  <Text style={styles.grayLabel}>Phone</Text>
                  <Text style={styles.boldValue}>{phone}</Text>
                </View>
              </View>

              <View style={[styles.sellerRow, {marginTop: 15}]}>
                <View style={styles.iconContainer}><Icon name="location" size={20} color="#2ECC71" /></View>
                <View style={styles.sellerTextCol}>
                  <Text style={styles.grayLabel}>Location</Text>
                  <Text style={styles.boldValue}>Punjab, Pakistan</Text>
                </View>
              </View>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.callBtn} onPress={openDialer}>
                <Icon name="call" size={22} color="#fff" />
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatBtn} onPress={openWhatsApp}>
                <Icon name="chatbubble-ellipses" size={22} color="#fff" />
                <Text style={styles.btnText}>Whatsapp</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.finalContactBtn} onPress={openDialer}>
              <Text style={styles.finalBtnText}>👉 Contact Seller</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { flex: 1, width: '100%', height: '100%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 10, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bannerContainer: { width: '92%', alignSelf: 'center', position: 'relative' },
  bannerImage: { width: '100%', height: 220, borderRadius: 20 },
  dotContainer: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#fff', width: 10, height: 10, borderRadius: 5 },
  whiteCard: { backgroundColor: 'rgba(255, 255, 255, 0.9)', margin: 15, borderRadius: 15, padding: 15 },
  grayLabel: { color: '#888', fontSize: 11 },
  cropTitle: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  varietyText: { fontSize: 16, color: '#333', marginBottom: 15 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderColor: '#eee', paddingTop: 10 },
  gridItem: { width: '50%', paddingVertical: 8 },
  boldValue: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  cardHeading: { fontWeight: 'bold', marginBottom: 15, fontSize: 16 },
  sellerRow: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { backgroundColor: '#E8F5E9', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  sellerTextCol: { marginLeft: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15, marginVertical: 10 },
  callBtn: { backgroundColor: '#7ADAA5', flex: 0.48, flexDirection: 'row', padding: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  chatBtn: { backgroundColor: '#7ADAA5', flex: 0.48, flexDirection: 'row', padding: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', marginLeft: 10, fontWeight: 'bold', fontSize: 16 },
  finalContactBtn: { backgroundColor: '#7ADAA5', marginHorizontal: 15, padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  finalBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
});

export default CropDetails;