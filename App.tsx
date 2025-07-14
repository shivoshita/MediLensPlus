import React, { useState, useEffect, JSX } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpFormScreen from './screens/SignUpFormScreen';
import SetPasswordScreen from './screens/SetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import MedicineReminders from './screens/MedicineReminders';
import ScanPrescriptionScreen from './screens/ScanPrescriptionScreen';

// Navigation interface definition
interface Navigation {
  navigate: (screen: string) => void;
  goBack: () => void;
  replace: (screen: string) => void;
}

// Splash screen
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    // Navigate to Login screen after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A29FF" />
      
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      
      <Text style={styles.title}>Medi{'\n'}Lens+</Text>
      <Text style={styles.tagline}>Your Health, Visualized.</Text>
    </View>
  );
};

// Main App Component
const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');

  const navigation: Navigation = {
    navigate: (screen) => setCurrentScreen(screen),
    goBack: () => setCurrentScreen('welcome'),
    replace: (screen) => setCurrentScreen(screen),
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('welcome')} />;
      case 'welcome':
        return <WelcomeScreen navigation={navigation} />;
      case 'home':
        return <HomeScreen navigation={navigation} />;
      case 'login':
        return <LoginScreen navigation={navigation} />;
      case 'SignUpForm':
        return <SignUpFormScreen navigation={navigation} />;
      case 'SetPassword':
        return <SetPasswordScreen navigation={navigation} />;
      case 'MedicineReminders':
        return <MedicineReminders navigation={{ navigate: setCurrentScreen }} />;
      case 'ScanPrescription': // Add this case
        return <ScanPrescriptionScreen navigation={navigation} />;
      default:
        return <WelcomeScreen navigation={navigation} />;
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A29FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    opacity: 0.8,
  },
});

export default App;