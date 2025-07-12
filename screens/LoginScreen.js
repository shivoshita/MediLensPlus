import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
  console.log('Logging in...');
  navigation.navigate('Home');
  };


  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleLogin = () => {
    // Google login logic placeholder
    console.log('Google Login');
  };

  const handleFacebookLogin = () => {
    // Facebook login logic placeholder
    console.log('Facebook Login');
  };

  const handleFingerprintLogin = () => {
    // Fingerprint login logic placeholder
    console.log('Fingerprint Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpForm');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#0018A8" />
      </TouchableOpacity>

      <Text style={styles.loginTitle}>Log In</Text>

      <Text style={styles.welcomeTitle}>Welcome</Text>
      <Text style={styles.welcomeSubtitle}>
        “Your health, one scan away. Let's log you in.”
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#666"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="************"
            placeholderTextColor="#666"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? 'eye-off' : 'eye'} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleGoogleLogin}>
          <Icon name="google" size={28} color="#0018A8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookLogin}>
          <Icon name="facebook" size={28} color="#0018A8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFingerprintLogin}>
          <Icon name="fingerprint" size={28} color="#0018A8" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0018A8',
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0018A8',
    marginTop: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ECF1FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF1FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputPassword: {
    flex: 1,
    color: '#000',
  },
  forgotPassword: {
    color: '#0018A8',
    textAlign: 'right',
    marginTop: 10,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#0018A8',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  signUpText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#0018A8',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
