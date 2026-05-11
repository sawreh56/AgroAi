import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, ScrollView, Image, 
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert, SafeAreaView 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

export default function ChatWithFarmers({ route, navigation }) {
  // --- Logic from first code ---
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello Dr. Irfan, I have a problem my wheat crop.", type: 'received', time: '12:40 pm', hasImage: true },
    { id: 2, text: "hello there, please share details and clear picture.", type: 'sent', time: '12:41 pm' }
  ]);

  const params = route.params || {};
  const userName = params.userName || "Farmer Ali";
  const userImg = params.userImg || require('../../assets/Images/manPic.png');

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMsg = {
        id: Date.now(),
        text: message,
        type: 'sent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
      };
      setChatMessages([...chatMessages, newMsg]);
      setMessage("");
    }
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', quality: 1 };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) Alert.alert('Error', response.errorMessage);
      else Alert.alert("Success", "Photo Captured!");
    });
  };

  const showPlusMenu = () => {
    Alert.alert("Share", "Choose an option", [
      { text: "Gallery", onPress: () => {} },
      { text: "Documents", onPress: () => {} },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const startRecording = () => {
    Alert.alert("Voice Record", "Mic functionality enabled.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        {/* --- Design: Custom Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{userName}</Text>
            <View style={styles.onlineStatus}>
               <View style={styles.dot} />
               <Text style={styles.statusText}>online</Text>
            </View>
          </View>

          <Image source={userImg} style={styles.headerAvatar} />
        </View>

        {/* --- Design: Chat Area --- */}
        <View style={styles.chatArea}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {chatMessages.map((msg) => (
              <View key={msg.id} style={msg.type === 'sent' ? styles.outgoingContainer : styles.incomingContainer}>
                
                {/* Image Bubble logic for Received messages */}
                {msg.hasImage && msg.type === 'received' && (
                  <View style={styles.incomingImageBubble}>
                     <Image source={require('../../assets/Images/basmatiRice.jpeg')} style={styles.chatImage} />
                  </View>
                )}

                <View style={msg.type === 'sent' ? styles.outgoingBubble : styles.incomingBubble}>
                  <Text style={msg.type === 'sent' ? styles.msgTextWhite : styles.msgText}>
                    {msg.text}
                  </Text>
                </View>
                <Text style={msg.type === 'sent' ? styles.timeTextRight : styles.timeTextLeft}>
                  {msg.time}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* --- Design: Bottom Input Area --- */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={showPlusMenu}>
              <Icon name="add" size={30} color="#7ADAA5" />
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Type Message" 
                style={styles.input} 
                value={message}
                onChangeText={setMessage}
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity onPress={openCamera}>
                <Icon name="camera-outline" size={24} color="#7ADAA5" style={{marginRight: 10}} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="happy-outline" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.micButton}
              onPress={message.length > 0 ? sendMessage : startRecording}
            >
              <Icon name={message.length > 0 ? "send" : "mic"} size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7ADAA5' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    height: 80,
    paddingTop: Platform.OS === 'android' ? 10 : 0
  },
  headerInfo: { alignItems: 'center' },
  headerName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  onlineStatus: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 5 },
  statusText: { color: '#fff', fontSize: 12 },
  headerAvatar: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1, borderColor: '#fff' },
  
  chatArea: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40 
  },
  
  incomingContainer: { alignSelf: 'flex-start', maxWidth: '80%', marginBottom: 15 },
  incomingBubble: { backgroundColor: '#E0E0E0', padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  incomingImageBubble: { backgroundColor: '#E0E0E0', padding: 10, borderRadius: 20, marginBottom: 5 },
  chatImage: { width: 150, height: 100, borderRadius: 10 },
  msgText: { color: '#333', fontSize: 14 },
  timeTextLeft: { fontSize: 10, color: '#333', marginTop: 5 },
  
  outgoingContainer: { alignSelf: 'flex-end', maxWidth: '80%', marginBottom: 15 },
  outgoingBubble: { backgroundColor: '#7ADAA5', padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20 },
  msgTextWhite: { color: '#fff', fontSize: 14 },
  timeTextRight: { fontSize: 10, color: '#333', textAlign: 'right', marginTop: 5 },
  
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderTopWidth: 1, 
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20
  },
  inputContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#F9F9F9', 
    borderRadius: 25, 
    paddingHorizontal: 15, 
    marginHorizontal: 10, 
    alignItems: 'center', 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#eee' 
  },
  input: { flex: 1, color: '#000' },
  micButton: { 
    backgroundColor: '#7ADAA5', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  }
});