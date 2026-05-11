import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar,
  Image // Image component import kiya
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Sirf sub-items ke liye rehne diya hai

export default function KnowledgeHub() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* Header Back Image */}
          <Image 
            source={require('../../assets/Images/backarrow.png')} 
            style={styles.backImage} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Knowledge Hub</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ImageBackground 
        source={require('../../assets/Images/BackGround.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          
          {/* 1. Create New Content Section */}
          <View style={styles.card}>
            <View style={styles.row}>
              {/* Icon ki jagah Image */}
              <Image 
                source={require('../../assets/Images/expertChat.png')} // Apna path dein
                style={styles.cardMainImage}
                resizeMode="contain"
              />
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Create New Content</Text>
                <Text style={styles.cardSubTitle}>write articles guides, share research for farmers</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateArticle')}>
              <Text style={styles.buttonText}>+ New article/guides</Text>
            </TouchableOpacity>
          </View>

          {/* 2. My Drafts Section */}
          <View style={styles.card}>
            <View style={styles.row}>
              {/* Icon ki jagah Image */}
              <Image 
                source={require('../../assets/Images/YourImpact.png')} // Apna path dein
                style={styles.cardMainImage}
                resizeMode="contain"
              />
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>My Drafts</Text>
                <Text style={styles.draftText}>Draft: Organic pest control - part 1</Text>
                <Text style={styles.draftText}>Advanced irrigation Techniques</Text>
              </View>
            </View>
          </View>

          {/* 3. Published & Performance Section */}
          <View style={styles.card}>
            {/* Published Articles */}
            <View style={styles.rowItem}>
              {/* Icon ki jagah Image */}
              <Image 
                source={require('../../assets/Images/HUB.png')} // Apna path dein
                style={styles.cardMainImageSmall}
                resizeMode="contain"
              />
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Published Articles</Text>
                <Text style={styles.overviewText}>Overview</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Content Performance */}
            <View style={styles.rowItem}>
              {/* Icon ki jagah Image */}
              <Image 
                source={require('../../assets/Images/HUB.png')} // Apna path dein
                style={styles.cardMainImageSmall}
                resizeMode="contain"
              />
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Content Performance</Text>
                <Text style={styles.overviewText}>Overview</Text>
              </View>
            </View>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 60,
    backgroundColor: '#76D7A4', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    
  },
  backButton: {
    padding: 5,
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: 'white'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    padding: 15,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)', 
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7ADAA5',
    padding: 15,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  cardMainImage: {
    width: 28, // Card ke main icon ka size
    height: 28,
    tintColor: '#90EE90' // Green tint jaisa design mein tha
  },
  cardMainImageSmall: {
    width: 22, // Chote icons (published/performance) ka size
    height: 22,
    tintColor: '#90EE90'
  },
  cardTextContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubTitle: {
    color: '#E0E0E0',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#76D7A4',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  draftText: {
    color: '#CCCCCC',
    fontSize: 13,
    marginTop: 2,
  },
  overviewText: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#7ADAA5',
    marginVertical: 12,
    width: '100%',
  },
});