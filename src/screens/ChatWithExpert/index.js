import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

export default function ChatWithExpert({ route, navigation }) {

  
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello Dr. Irfan, I have a problem my wheat crop.", type: 'sent', time: '12:40 pm' },
    { id: 2, text: "Hello there, please share details and clear picture.", type: 'received', time: '12:41 pm' }
  ]);

  // 2. Params ko safety ke sath nikaalein (taake crash na ho)
  const params = route.params || {};
  const userName = params.userName || "Expert";
  const userImg = params.userImg || null;

  // 3. Functions
  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMsg = {
        id: Date.now(),
        text: message,
        type: 'sent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{userName}</Text>
          <View style={styles.statusRow}>
             <View style={styles.dot} />
             <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        {userImg && <Image source={userImg} style={styles.headerDp} />}
      </View>

      <View style={styles.chatArea}>
        <ScrollView contentContainerStyle={{padding: 20}}>
          {chatMessages.map((msg) => (
            <View key={msg.id} style={msg.type === 'sent' ? styles.sentContainer : styles.receivedContainer}>
              <View style={msg.type === 'sent' ? styles.sentBox : styles.receivedBox}>
                <Text style={msg.type === 'sent' ? styles.sentText : styles.receivedText}>{msg.text}</Text>
              </View>
              <Text style={styles.timeText}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.actionBtn} onPress={showPlusMenu}>
             <Icon name="add" size={28} color="#82E0AA" />
          </TouchableOpacity>
          
          <View style={styles.mainInputArea}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="happy-outline" size={24} color="#82E0AA" />
            </TouchableOpacity>
            
            <TextInput 
              placeholder="Type a message" 
              placeholderTextColor="#ccc"
              style={styles.input}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity onPress={openCamera}>
              <Icon name="camera-outline" size={24} color="#82E0AA" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.micBtn} 
            onPress={message.length > 0 ? sendMessage : startRecording}
          >
            <Icon name={message.length > 0 ? "send" : "mic"} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#82E0AA" },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  headerInfo: { flex: 1, alignItems: 'center' },
  headerName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, backgroundColor: '#fff', borderRadius: 4, marginRight: 5 },
  statusText: { color: "#fff", fontSize: 12 },
  headerDp: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1, borderColor: '#fff' },
  chatArea: { flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40 },
  sentContainer: { alignItems: 'flex-end', marginBottom: 15 },
  sentBox: { backgroundColor: '#82E0AA', padding: 12, borderRadius: 15, borderBottomRightRadius: 2, maxWidth: '80%' },
  sentText: { color: '#fff' },
  receivedContainer: { alignItems: 'flex-start', marginBottom: 15 },
  receivedBox: { backgroundColor: '#F2F3F4', padding: 12, borderRadius: 15, borderBottomLeftRadius: 2, maxWidth: '80%' },
  receivedText: { color: '#000' },
  timeText: { fontSize: 10, color: '#888', marginTop: 2 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingBottom: 30 },
  actionBtn: { padding: 5 },
  mainInputArea: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9F9', borderRadius: 25, paddingHorizontal: 12, marginHorizontal: 5, elevation: 2 },
  input: { flex: 1, height: 45, paddingHorizontal: 10, color: '#000' },
  micBtn: { backgroundColor: '#82E0AA', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', elevation: 3 }
});