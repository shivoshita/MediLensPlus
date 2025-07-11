import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
  navigation.navigate('login');
};

const handleSignUp = () => {
  navigation.navigate('SignUpForm');
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Medi{'\n'}Lens+</Text>
      <Text style={styles.tagline}>Your Health, Visualized.</Text>

      <Text style={styles.description}>
        "Your smart lens into better medication decisions."
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0018A8',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#C5D4FF',
    paddingVertical: 15,
    borderRadius: 25,
  },
  signUpButtonText: {
    color: '#0018A8',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
