import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Home, BarChart2, ShoppingCart, MessageCircle, User, Plus, ChevronLeft, Eye } from 'lucide-react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <ImageBackground 
        source={require("../../assets/Images/bg2.png")} // Dark leaf background
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.overlay}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity><ChevronLeft color="white" size={28} /></TouchableOpacity>
            <Text style={styles.headerTitle}>Community Forum</Text>
            <TouchableOpacity style={styles.addButton}><Plus color="#4CAF50" size={24} /></TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}><Text style={styles.activeTabText}>Recent</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Trending</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>My Questions</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Experts</Text></TouchableOpacity>
          </View>

          {/* Post Card */}
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <View style={styles.avatarPlaceholder}>
                <User color="#A9A9A9" size={30} />
              </View>
              <View>
                <Text style={styles.userName}>Ahmad Khan</Text>
                <Text style={styles.timeText}>2 hours ago</Text>
              </View>
            </View>

            <Text style={styles.postTitle}>My wheat crop leaves are turning yellow! What to do?</Text>
            <Text style={styles.postDescription}>
              Started seeing this days ago, spreading fast. Worried about my yield...
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.tag}><Text style={styles.tagText}>#Disease</Text></View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Eye color="#A9A9A9" size={16} />
                  <Text style={styles.statText}> 13 views</Text>
                </View>
                <Text style={styles.statText}>3 Answers</Text>
                <TouchableOpacity style={styles.viewBtn}><Text style={styles.viewBtnText}>View Answers</Text></TouchableOpacity>
              </View>
            </View>
          </View>

        </SafeAreaView>
      </ImageBackground>

       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000' 
  },

  backgroundImage: {
     flex: 1, 
     resizeMode: 'cover' 
    },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    paddingHorizontal: 15 
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginTop: 10 
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
   },
  addButton: { 
    backgroundColor: 'white', 
    borderRadius: 15,
    padding: 2
   },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 20, 
    justifyContent: 'space-between' 
  },
  tab: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12, 
    borderRadius: 10 
  },
  activeTab: { 
    backgroundColor: '#75E6A3' 
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 12 
  },
  activeTabText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 12 
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 15,
    marginTop: 30 
  },
  userInfo: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15 
  },
  avatarPlaceholder: { 
    width: 50, 
    height: 50,
    borderRadius: 10, 
    backgroundColor: '#E0F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10 
  },
  userName: {
     fontWeight: 'bold', 
     fontSize: 16
    },
  timeText: {
     color: '#A9A9A9', 
     fontSize: 12 
    },
  postTitle: { 
    fontWeight: 'bold',
    fontSize: 15, 
    marginBottom: 5 
  },
  postDescription: { 
    color: '#444',
    fontSize: 13,
    lineHeight: 18 },
    cardFooter: {
    marginTop: 15 
  },
  tag: {
    backgroundColor: '#75E6A3',
    alignSelf: 'flex-start',
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  tagText: {
    color: 'white',
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  statsContainer: {
    alignItems: 'flex-end', 
    marginTop: -20 
  },
  statItem: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  statText: { 
    color: '#A9A9A9', 
    fontSize: 11, 
    marginBottom: 2 
  },
  viewBtn: { 
    backgroundColor: '#75E6A3', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 10, 
    marginTop: 5 
  },
  viewBtnText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
 
});

export default ChatScreen;