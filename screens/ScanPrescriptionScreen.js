import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScanPrescriptionScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const cameraRef = useRef(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        'Prescription Scanned',
        'Your prescription has been successfully scanned and analyzed!',
        [
          {
            text: 'View Analysis',
            onPress: () => {
              // Navigate to analysis page or show results
              navigation.navigate('AnalysisResults', { scanData: data });
            }
          },
          {
            text: 'Scan Another',
            onPress: () => setScanned(false)
          }
        ]
      );
    }, 3000);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsAnalyzing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          skipProcessing: false,
        });
        
        // Simulate processing
        setTimeout(() => {
          setIsAnalyzing(false);
          Alert.alert(
            'Prescription Captured',
            'Your prescription has been successfully captured and is being analyzed!',
            [
              {
                text: 'View Analysis',
                onPress: () => {
                  navigation.navigate('AnalysisResults', { imageData: photo });
                }
              },
              {
                text: 'Retake',
                onPress: () => setScanned(false)
              }
            ]
          );
        }, 3000);
      } catch (error) {
        console.error('Error taking picture:', error);
        setIsAnalyzing(false);
      }
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0018A8" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={requestPermission}
        >
          <Text style={styles.retryButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/user_photo.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hi, Welcome Back!</Text>
            <Text style={styles.userName}>Shivoshita Jhalta</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/icons/notifications_icon.png')}
              style={styles.topIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/icons/settings_icon.png')}
              style={styles.topIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Banner */}
      <View style={styles.scanBanner}>
        <Text style={styles.scanBannerText}>
          Scan Your Prescriptions With MediLens+ Today!
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickActionItem}>
          <Image
            source={require('../assets/icons/recent_scans_icon.png')}
            style={styles.quickActionIcon}
            resizeMode="contain"
          />
          <Text style={styles.quickActionText}>Recent Scans</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem}>
          <Image
            source={require('../assets/icons/ai_analysis_icon.png')}
            style={styles.quickActionIcon}
            resizeMode="contain"
          />
          <Text style={styles.quickActionText}>AI Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanPrescriptionButton}>
          <Image
            source={require('../assets/icons/scan_a_prescriptions_icon.png')}
            style={{ width: 20, height: 20, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={styles.scanPrescriptionButtonText}>Scan A Prescription</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.instructionText}>
          "Position the prescription clearly in view. Scanning will begin automatically."
        </Text>

        {/* Camera Container */}
        <View style={styles.cameraContainer}>
          {/* Corner Brackets */}
          <View style={styles.cornerBrackets}>
            <View style={[styles.bracket, styles.topLeft]} />
            <View style={[styles.bracket, styles.topRight]} />
            <View style={[styles.bracket, styles.bottomLeft]} />
            <View style={[styles.bracket, styles.bottomRight]} />
          </View>

          {/* Camera View */}
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            flash={flashOn ? 'on' : 'off'}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            {/* Overlay for better visibility */}
            <View style={styles.cameraOverlay}>
              {isAnalyzing && (
                <View style={styles.analyzingContainer}>
                  <ActivityIndicator size="large" color="#0018A8" />
                  <Text style={styles.analyzingText}>Analyzing... Hold steady!</Text>
                </View>
              )}
            </View>
          </CameraView>
        </View>

        {/* Camera Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Text style={styles.controlButtonText}>
              {flashOn ? '🔦 Flash On' : '🔦 Flash Off'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>📸 Capture</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.controlButtonText}>🔄 Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Analysis Button */}
        <TouchableOpacity 
          style={styles.viewAnalysisButton}
          disabled={isAnalyzing}
        >
          <Text style={styles.viewAnalysisButtonText}>
            {isAnalyzing ? 'Analyzing...' : '👁️ View Analysis'}
          </Text>
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
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/icons/people_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/icons/calender_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0018A8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0018A8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 10 : 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  greeting: {
    fontSize: 12,
    color: '#666',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  topIcon: {
    width: 30,
    height: 30,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#0018A8',
    fontWeight: 'bold',
  },
  scanBanner: {
    backgroundColor: '#e8ebff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scanBannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A29FF',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e8ebff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  quickActionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 10,
    color: '#1A29FF',
    fontWeight: '500',
  },
  scanPrescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0018A8',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  scanPrescriptionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  cameraContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: '#e8ebff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cornerBrackets: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#0018A8',
    borderWidth: 3,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 20,
    right: 20,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingContainer: {
    backgroundColor: 'rgba(0, 24, 168, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  analyzingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#e8ebff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0018A8',
  },
  controlButtonText: {
    color: '#0018A8',
    fontSize: 12,
    fontWeight: '600',
  },
  captureButton: {
    backgroundColor: '#0018A8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  viewAnalysisButton: {
    backgroundColor: '#0018A8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  viewAnalysisButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0018A8',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 10,
    color: '#fff',
    marginTop: 2,
  },
});

export default ScanPrescriptionScreen;