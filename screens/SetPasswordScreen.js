import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleCreatePassword = () => {
    if (password && confirmPassword && password === confirmPassword) {
      console.log('Password set successfully');
      // Go to Home
      navigation.navigate('home');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#0018A8" />
      </TouchableOpacity>

      <Text style={styles.title}>Set Password</Text>
      <Text style={styles.subtitle}>“Create a strong password to keep your account secure.”</Text>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={secure}
          placeholder="********"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={secureConfirm}
          placeholder="********"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
          <Icon name={secureConfirm ? 'eye-off' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreatePassword}>
        <Text style={styles.buttonText}>Create New Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0018A8', textAlign: 'center', marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
  label: { fontSize: 16, fontWeight: '600', color: '#000', marginTop: 20, marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECF1FF', borderRadius: 10, paddingHorizontal: 15 },
  input: { flex: 1, paddingVertical: 12, color: '#000' },
  button: { backgroundColor: '#0018A8', paddingVertical: 15, borderRadius: 25, marginTop: 40 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});

export default SetPasswordScreen;
