import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';

const CommunityForum = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Recent');

  const tabs = ['Recent', 'Trending', 'My Questions', 'Experts'];

  // --- Render Functions ---

  const renderRecentOrTrending = () => (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Image source={require('../../assets/Images/AhmedProfile.png')} style={styles.avatar} />
        <View style={styles.userText}>
          <Text style={styles.userName}>Ahmad Khan</Text>
          <Text style={styles.timeText}>2 hours ago</Text>
        </View>
      </View>
      <Text style={styles.qTitle}>My wheat crop leaves are turning{"\n"}yellow! What to do?</Text>
      <Text style={styles.qDesc}>Started seeing this days ago, spreading fast.{"\n"}Worried about my yield...</Text>
      
      {/* Views aur Answers Text Fix */}
      <View style={styles.statsCol}>
        <Text style={styles.statsText}>👁️ 13 Views</Text>
        <Text style={styles.statsText}>3 Answers</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.tag}><Text style={styles.btnText}>#Disease</Text></TouchableOpacity>
        <TouchableOpacity style={styles.mainBtn}><Text style={styles.btnText}>View Answers</Text></TouchableOpacity>
      </View>
    </View>
  );

  const renderMyQuestions = () => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.qTitle}>My wheat crop leaves are turning{"\n"}yellow! What to do?</Text>
        <View style={styles.actionIcons}>
           {/* Touchable Icons for Edit and Delete */}
           <TouchableOpacity onPress={() => console.log('Edit')} style={styles.iconBtn}>
             <Text style={{fontSize: 18}}>✏️</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => console.log('Delete')} style={[styles.iconBtn, {marginLeft: 10}]}>
             <Text style={{fontSize: 18}}>🗑️</Text>
           </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.qDesc}>Started seeing this days ago, spreading fast.{"\n"}Worried about my yield...</Text>
      
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.tag}><Text style={styles.btnText}>#Disease</Text></TouchableOpacity>
        <View style={styles.statsCol}>
          <Text style={styles.statsText}>👁️ 13 Views</Text>
          <Text style={styles.statsText}>3 Answers</Text>
        </View>
      </View>
      
      {/* Expert Answered as Touchable */}
      <TouchableOpacity style={[styles.tag, {backgroundColor: '#999', alignSelf: 'flex-start', marginTop: 10}]}>
        <Text style={styles.btnText}>Expert Answered</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExperts = () => (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Image source={require('../../assets/Images/AhmedProfile.png')} style={styles.avatar} />
        <View style={styles.userText}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
            <Text style={styles.userName}>Dr. Irfan Malik</Text>
            <Text style={{color: '#66cc99', fontSize: 12}}>Online ●</Text>
          </View>
          <Text style={styles.timeText}>Crop Disease Specialist</Text>
          <Text style={styles.timeText}>4.9 ⭐</Text>
        </View>
      </View>
      <Text style={[styles.qDesc, {marginVertical: 10}]}>Leading the fight against common{"\n"}crop diseases.</Text>
      
      <View style={styles.btnRow}>
        {/* View Profile with Icon */}
        <TouchableOpacity style={[styles.mainBtn, {backgroundColor: '#FFF', borderWidth: 1, borderColor: '#66cc99', flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={{marginRight: 5}}>👁️</Text>
          <Text style={[styles.btnText, {color: '#66cc99'}]}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainBtn}>
          <Text style={styles.btnText}>Ask Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../../assets/Images/BackGround.png')} style={styles.bg}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/Images/backarrow.png')} style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Community Forum</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/Images/plus.png')} style={styles.iconPlus} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabBtn, activeTab === tab ? styles.tabActive : styles.tabInactive]}
              >
                <Text style={{ color: activeTab === tab ? '#FFF' : '#666', fontWeight: 'bold' }}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollArea}>
          {activeTab === 'Recent' && renderRecentOrTrending()}
          {activeTab === 'Trending' && renderRecentOrTrending()}
          {activeTab === 'My Questions' && renderMyQuestions()}
          {activeTab === 'Experts' && renderExperts()}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  iconBack: { width: 22, height: 22, tintColor: '#FFF' },
  iconPlus: { width: 35, height: 35 },
  tabBar: { paddingLeft: 15, marginBottom: 20 },
  tabBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10, marginRight: 10 },
  tabActive: { backgroundColor: '#66cc99' },
  tabInactive: { backgroundColor: '#FFF' },
  scrollArea: { paddingHorizontal: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  avatar: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#f0f0f0' },
  userText: { marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  timeText: { fontSize: 12, color: '#999' },
  qTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', flex: 1 },
  qDesc: { fontSize: 13, color: '#666', marginTop: 5, lineHeight: 18 },
  statsCol: { alignItems: 'flex-end' },
  statsText: { fontSize: 11, color: '#aaa', fontWeight: '500' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  tag: { backgroundColor: '#66cc99', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  mainBtn: { backgroundColor: '#66cc99', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 8 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  actionIcons: { flexDirection: 'row' },
  iconBtn: { padding: 5 }
});

export default CommunityForum;