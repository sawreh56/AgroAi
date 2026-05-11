import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

const Notification = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/Images/BackGround.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image style={{height: 28, width: 28,marginTop: 7}} source={require('../../assets/Images/backarrow.png') }></Image>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification</Text>
          <TouchableOpacity>
            <Text style={styles.markAllReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Card 1: New expert followed you */}
          <View style={styles.notificationCard}>
            <View style={styles.cardHeader}>
               <Text style={styles.notificationTime}>10 min ago</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.whiteCircle}>
                <Image
                  source={require('../../assets/Images/notificationPr.png')}
                  style={styles.itemImage}
                />
              </View>
              <Text style={styles.notificationText}>New expert followed you</Text>
            </View>
          </View>

          {/* Card 2: System Update Available */}
          <View style={styles.notificationCard}>
            <View style={styles.cardHeader}>
               <Text style={styles.notificationTime}>10 min ago</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.whiteCircle}>
                <Image
                  source={require('../../assets/Images/notifucationBell.png')}
                  style={styles.itemImage}
                />
              </View>
              <Text style={styles.notificationText}>System Update Available</Text>
            </View>
          </View>

          {/* Card 3: Points Earned! (YEH WALA ADD KIYA HAI) */}
          <View style={styles.notificationCard}>
            <View style={styles.cardHeader}>
               <Text style={styles.notificationTime}>10 min ago</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.whiteCircle}>
                <Image
                  source={require('../../assets/Images/notificaionPoint.png')} // Check karein aapki star image ka name kya hai
                  style={styles.itemImage}
                />
              </View>
              <Text style={styles.notificationText}>Points Earned!</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  markAllReadText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationCard: {
    backgroundColor: '#66cc99', 
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  notificationTime: {
    color: 'rgba(0, 0, 0, 0.4)', 
    fontSize: 11,
    fontWeight: '500',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Notification;