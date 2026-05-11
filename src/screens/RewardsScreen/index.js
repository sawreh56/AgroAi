import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet,View,Text,SafeAreaView,TouchableOpacity,ScrollView,StatusBar, BackgroundImage} from 'react-native';


const RewardsScreen = () => {
  const navigation=useNavigation()
  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Area */}
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>{"<"}</Text> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards & Points</Text>
        <TouchableOpacity  onPress={() => navigation.navigate("PointHistory")}>
          <Text style={styles.headerIcon}>🕒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Current Points</Text>
          <View style={styles.pointsRow}>
            <Text style={styles.pointsValue}>1,250</Text>
            <View style={styles.coinContainer}>
               <View style={styles.coin}><Text style={styles.coinText}>★</Text></View>
               <Text style={styles.coinLabel}>Points</Text>
            </View>
          </View>
          <Text style={styles.pointsFooter}>Keep engaging to earn more exciting rewards!</Text>
        </View>

        {/* How to Earn Section */}
        <Text style={styles.sectionTitle}>How to Earn Points</Text>
        <View style={styles.earnListCard}>
          <View style={styles.earnItem}>
            <Text style={styles.earnText}>Post </Text>
            <Text style={styles.earnValue}>+ 10points</Text>
          </View>
          <View style={[styles.earnItem, styles.borderTop]}>
            <Text style={[styles.earnText, ]}>Answer </Text>
            <Text style={styles.earnValue}>+ 15points</Text>
          </View>
          <View style={[styles.earnItem, styles.borderTop]}>
            <Text style={styles.earnText}>Get best </Text>
            <Text style={styles.earnValue}>+ 25points</Text>
          </View>
          <View style={[styles.earnItem, styles.borderTop]}>
            <Text style={styles.earnText}>Daily login </Text>
            <Text style={styles.earnValue}>+ 5points</Text>
          </View>
        </View>

        {/* Redeem Rewards Section */}
        <Text style={styles.sectionTitle}>Redeem Rewards</Text>
        
        {/* Reward Item 1 */}
        <View style={[styles.rewardCard, {backgroundColor: '#1a3d14'}]}>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>10% off on seeds</Text>
            <Text style={styles.rewardPoints}>500points</Text>
          </View>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>

        {/* Reward Item 2 */}
        <View style={[styles.rewardCard, {backgroundColor: '#333333'}]}>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>Free expert consultation</Text>
            <Text style={styles.rewardPoints}>2000points</Text>
          </View>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black Background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  pointsCard: {
    backgroundColor: '#66cc99', // Mint Green color from image
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  pointsLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  pointsValue: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  coin: {
    backgroundColor: '#f1f10e',
    width: 22,
    height: 22,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 5,
  },
  pointsFooter: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },
  earnListCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
  },
  earnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  earnText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  earnValue: {
    color: '#66cc99',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardPoints: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 5,
  },
  redeemButton: {
    backgroundColor: '#66cc99',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default RewardsScreen;