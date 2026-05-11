import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Impact1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image Path check kar lena yara */}
      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} 
        style={styles.bg}
      >
        
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Impact</Text>
          <View style={{ width: 40 }} /> {/* Spacer to balance header */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* 1. Overall Performance Summary Card */}
          <View style={styles.glassCard}>
            <Text style={styles.cardHeading}>Overall Performance Summary</Text>
            <Text style={styles.ratingText}>
              Your Average Rating: 4,8 / 5 <Text style={{color: '#FFD700'}}>⭐⭐</Text>
            </Text>
            
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Total Questions Answered:</Text>
              <Text style={styles.statsValue}>150</Text>
            </View>
            
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Best Answers Received:</Text>
              <Text style={styles.statsValue}>35</Text>
            </View>
            
            <View style={[styles.statsRow, { marginTop: 20 }]}>
              <Text style={styles.statsLabel}>Farmers Helped:</Text>
              <Text style={styles.statsValue}>75</Text>
            </View>
          </View>

          {/* 2. Top Performing Areas Card */}
          <View style={[styles.glassCard, { marginTop: 20 }]}>
            <Text style={styles.cardHeading}>Top Performing Areas</Text>
            
            <View style={[styles.statsRow, { marginTop: 15 }]}>
              <Text style={styles.statsLabel}>Wheat Diseases:</Text>
              <Text style={styles.statsValue}>80 answers</Text>
            </View>
            
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Soil Health:</Text>
              <Text style={styles.statsValue}>40 answers</Text>
            </View>

            {/* Progress Bar Area */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%' }]} />
              </View>
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bg: { flex: 1 },
  header: { 
    backgroundColor: '#7ADAA5', 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  backBtn: { padding: 5 },
  scrollContent: { padding: 20 },
  
  // Glassmorphism Card Style
  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 20, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(122, 218, 165, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  
  cardHeading: { 
    color: '#fff', 
    fontSize: 19, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  ratingText: { 
    color: '#fff', 
    fontSize: 16, 
    marginBottom: 25,
    opacity: 0.9 
  },
  
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12 
  },
  statsLabel: { 
    color: '#fff', 
    fontSize: 15, 
    opacity: 0.85 
  },
  statsValue: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  // Progress Bar Styles
  progressContainer: { 
    marginTop: 20, 
    width: '100%',
    paddingBottom: 10
  },
  progressBar: { 
    height: 10, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 10, 
    width: '100%',
    overflow: 'hidden'
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#7ADAA5', 
    borderRadius: 10 
  }
});