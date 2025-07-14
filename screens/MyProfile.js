import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const MyProfile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(require('../assets/user_photo.jpg'));

  const showImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
      quality: 0.7,
    };

    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => launchCamera(options, handleImageResponse) },
        { text: 'Choose from Gallery', onPress: () => launchImageLibrary(options, handleImageResponse) },
      ]
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel || response.error) {
      return;
    }

    if (response.assets && response.assets[0]) {
      const imageUri = response.assets[0].uri;
      setProfileImage({ uri: imageUri });
    }
  };

  const handleMenuPress = (menuItem) => {
    console.log(`${menuItem} pressed`);
    // TODO: Add navigation logic for each menu item
    switch (menuItem) {
      case 'Profile':
        // Navigate to profile edit screen
        break;
      case 'My Prescriptions':
        // Navigate to prescriptions screen
        break;
      case 'Medical History':
        // Navigate to medical history screen
        break;
      case 'Privacy Policy':
        // Navigate to privacy policy screen
        break;
      case 'Settings':
        // Navigate to settings screen
        break;
      case 'Help':
        // Navigate to help screen
        break;
      case 'Logout':
        // Handle logout logic
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout pressed') },
          ]
        );
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={profileImage}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editButton}
              onPress={showImagePicker}
            >
              <Image 
                source={require('../assets/icons/edit_profile_photo_icon.png')} 
                style={styles.editIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Shivoshita</Text>
          <Text style={styles.userLastName}>Jhalta</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {/* Profile Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Profile')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/profile_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Profile</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* My Prescriptions Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('My Prescriptions')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/my_prescriptions_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>My Prescriptions</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Medical History Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Medical History')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/medical_history_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Medical History</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Privacy Policy Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Privacy Policy')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/privacy_policy_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Privacy Policy</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Settings Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Settings')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/settings_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Help Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Help')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/help_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Help</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Logout Menu Item */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Logout')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/icons/logout_icon.png')}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.menuText}>Logout</Text>
            </View>
            <Image 
              source={require('../assets/icons/arrow_icon.png')} 
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Image source={require('../assets/icons/home_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/icons/chat_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Image source={require('../assets/icons/people_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/icons/calender_icon.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Calendar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 10 : 10,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#1A29FF',
    transform: [{ rotate: '180deg' }],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A29FF',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#1A29FF',
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    width: 12,
    height: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 0,
  },
  userLastName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  menuText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  arrowIcon: {
    width: 14,
    height: 14,
    tintColor: '#ccc',
    transform: [{ rotate: '360deg' }],
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0018A8',
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  activeNavItem: {
    opacity: 1,
  },
  navIcon: {
    width: 20,
    height: 20,
  },
  navText: {
    fontSize: 10,
    color: '#fff',
    marginTop: 4,
  },
});

export default MyProfile;