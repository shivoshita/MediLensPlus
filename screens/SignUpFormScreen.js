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

const SignUpFormScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = () => {
    // Signup logic
    console.log('Signing up...');
  };

  const handleGoogleSignUp = () => {
    // Google sign up logic placeholder
    console.log('Google Sign Up');
  };

  const handleFacebookSignUp = () => {
    // Facebook sign up logic placeholder
    console.log('Facebook Sign Up');
  };

  const handleFingerprintSignUp = () => {
    // Fingerprint sign up logic placeholder
    console.log('Fingerprint Sign Up');
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#0018A8" />
      </TouchableOpacity>

      <Text style={styles.title}>New Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#0018A8"
          value={fullName}
          onChangeText={setFullName}
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

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#0018A8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#0018A8"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.inputLabel}>Date Of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYY"
          placeholderTextColor="#0018A8"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
      </View>

      <Text style={styles.termsText}>
        By continuing, you agree to{'\n'}
        <Text style={styles.linkText}>Terms of Use</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleGoogleSignUp} style={styles.socialButton}>
          <Icon name="google" size={28} color="#0018A8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookSignUp} style={styles.socialButton}>
          <Icon name="facebook" size={28} color="#0018A8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFingerprintSignUp} style={styles.socialButton}>
          <Icon name="fingerprint" size={28} color="#0018A8" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>
          already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0018A8',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ECF1FF',
    borderRadius: 10,
    padding: 15,
    color: '#0018A8',
    fontSize: 14,
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
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 16,
  },
  linkText: {
    color: '#0018A8',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#0018A8',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  socialButton: {
    padding: 10,
  },
  loginText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#0018A8',
    fontWeight: 'bold',
  },
});

export default SignUpFormScreen;