import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

const PointHistory = () => {
  const navigation = useNavigation();

  const historyData = [
    {
      id: '1',
      title: 'Question Posted : "My wheat crop leaves..."',
      date: '23 Feb, 2024 at 10:30 AM',
      points: '+10 Points',
      type: 'question',
      isPositive: true,
    },
    {
      id: '2',
      title: 'Redeemed: 10% off voucher',
      date: '22 Feb, 2024 at 10:30 AM',
      points: '-500 Points',
      type: 'gift',
      isPositive: false,
    },
    {
      id: '3',
      title: 'Daily Login Bonus',
      date: '21 Feb, 2024 at 10:30 AM',
      points: '+5 Points',
      type: 'gift',
      isPositive: true,
    },
    {
      id: '4',
      title: 'Answered a question: "Best organic fertilizer..."',
      date: '20 Feb, 2024 at 10:30 AM',
      points: '+200 Points',
      type: 'gift',
      isPositive: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} // Back function add kar diya
        >
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Points History</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Points Earned: 1,356</Text>
        <Text style={styles.summaryText}>Total Points Redeemed: 50</Text>
      </View>

      {/* History List Container */}
      <View style={styles.listContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {historyData.map((item, index) => (
            <View key={item.id}>
              <View style={styles.historyItem}>
                <Image
                  source={
                    item.type === 'question'
                      ? require('../../assets/Images/PointQuestion.png')
                      : require('../../assets/Images/giftBox.png') 
                  }
                  style={styles.itemImage}
                />

                <View style={styles.itemDetails}>
                  <View style={styles.row}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.itemPoints,
                        { color:"#66cc99" },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>
              </View>
              {index !== historyData.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#66cc99',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    elevation: 5, // Android shadow ke liye
  },
  summaryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 25,
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    flex: 1,
    paddingRight: 10,
  },
  itemPoints: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
});

export default PointHistory;