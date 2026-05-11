import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { api } from '../api/client';
import { getStoredEmail, getStoredUserName, getStoredUserImage, clearAllUserData } from '../services/userStorage';
import { logout } from '../services/authService';
import { useRole } from '../context/RoleContext';
import { ROLE_FARMER, ROLE_EXPERT } from '../constants/roles';

const CustomDrawerContent = (props) => {
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { role, clearRole } = useRole();

  const clearSessionAndExit = async () => {
    await logout();
    await clearRole();
    await clearAllUserData();
    setEmail(null);
    setUserName(null);
    setUserImage(null);
    const rootNavigation = props.navigation.getParent?.() || props.navigation;
    rootNavigation.reset({
      index: 0,
      routes: [{ name: 'Onbording' }],
    });
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const storedEmail = await getStoredEmail();
        const storedName = await getStoredUserName();
        const storedImage = await getStoredUserImage();
        
        if (mounted) {
          setEmail(storedEmail);
          setUserName(storedName);
          setUserImage(storedImage);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await clearSessionAndExit();
        },
        style: 'destructive',
      },
    ]);
  };

  const handleDeleteAccount = () => {
    if (!email) {
      Alert.alert('Delete Account', 'Email is not available. Please login again first.');
      return;
    }

    Alert.alert('Delete Account', 'This will permanently delete your account. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.post('/api/auth/delete_account', { email });
            await clearSessionAndExit();
            Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
          } catch (error) {
            const message = error?.message || 'Unable to delete account. Please try again.';
            Alert.alert('Delete Failed', message);
          }
        },
      },
    ]);
  };

  // Get profile image URL or use default
  const getProfileImage = () => {
    if (userImage) {
      return { uri: userImage };
    }
    return require("../assets/Images/AhmedProfile.png");
  };

  // Get user name or use default
  const getUserName = () => {
    if (userName) {
      return userName;
    }
    return "User";
  };

  // Get user role label
  const getUserRoleLabel = () => {
    return role === ROLE_FARMER ? 'Farmer' :'Expert';
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={styles.profileSection}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Image
              source={getProfileImage()}
              style={styles.profileImage}
            />
          )}
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{getUserName()}</Text>
          <Text style={styles.userRole}>{getUserRoleLabel()}</Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={() => {
          const screen = role === ROLE_FARMER ? 'FarmerAccount' : 'ExpertAccount';
          props.navigation.navigate(screen, { isEdit: true });
        }}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.logoutButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  editButtonText: {
    color: '#7ADAA5',
    fontSize: 13,
    fontWeight: '600',
  },
  menuItemsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutButtonText: {
    color: '#7ADAA5',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;
