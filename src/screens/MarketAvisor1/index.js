import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MarketAvisor1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.bg}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Market Advisory</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          
          {/* Current Market Insights Card */}
          <View style={styles.glassCard}>
            <Text style={styles.cardHeading}>Current Market Insightes</Text>
            <Text style={styles.cardPara}>
              Overall market sentiment is bullish for staple crops due recint patterns. Nonauet weetables stable.
            </Text>
            <Text style={styles.subHeading}>Key Trends:</Text>
          </View>

          {/* Crop Price Trends Card */}
          <View style={[styles.glassCard, { marginTop: 20, flex: 1 }]}>
            <Text style={styles.cardHeading}>Crop Price Trends</Text>
            
            <View style={{ marginTop: 20 ,}}>
              <Text style={styles.cropName}>Wheat</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>Current: PKR 8,700/Maund </Text>
                <Text style={styles.priceDrop}>↓ 0.5%</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All Price Details</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.newArticleBtn}
              onPress={() => navigation.navigate('CreateArticle')}
            >
              <Icon name="add" size={24} color="#fff" />
              <Text style={styles.newArticleText}>New Advisory Articles</Text>
            </TouchableOpacity>
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
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: '#7ADAA5' },
  cardHeading: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  cardPara: { color: '#fff', fontSize: 14, marginTop: 15, lineHeight: 20 },
  subHeading: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  cropName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  priceRow: { backgroundColor: 'rgba(163, 177, 170, 0.5)', borderRadius: 8, padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#7ADAA5' },
  priceText: { color: '#fff', fontSize: 14 },
  priceDrop: { color: 'red', fontSize: 12 },
  viewAllBtn: { marginTop: 40, alignSelf: 'center' },
  viewAllText: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
  newArticleBtn: { backgroundColor: '#7ADAA5', flexDirection: 'row', padding: 15, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  newArticleText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});