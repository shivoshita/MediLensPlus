import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const prescriptions = [
    {
      id: 1,
      date: 'July 5, 2025',
      time: '9 AM',
      medication: 'Antidiabetic - Gluformin 500mg',
      activeIngredient: 'Metformin',
      classification: 'Antidiabetic (Type 2 Diabetes Management)',
      type: 'morning'
    },
    {
      id: 2,
      date: 'July 4, 2025',
      time: '10 PM',
      medication: 'Antihypertensive - Amloapres 5mg',
      activeIngredient: 'Amlodipine Besylate',
      classification: 'Calcium Channel Blocker (High Blood Pressure Management)',
      type: 'evening'
    },
    {
      id: 3,
      date: 'July 3, 2025',
      time: '8 PM',
      medication: 'Antihypertensive - Telma 40mg',
      activeIngredient: 'Telmisartan',
      classification: 'Angiotensin II Receptor Blocker (High Blood Pressure Control)',
      type: 'evening'
    }
  ];

  const formatTime = (time) => time;
  const formatDate = (date) => date;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/user_photo.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hi, Welcome Back!</Text>
            <Text style={styles.userName}>Shivoshita Jhalka</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/icons/notifications_icon.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/icons/settings_icon.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Banner */}
      <View style={styles.scanBanner}>
        <Text style={styles.scanBannerText}>Scan Your Prescriptions With MediLens+ Today!</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.scanButton}>
          <View style={styles.scanButtonContent}>
            <Image
              source={require('../assets/icons/scan_a_prescriptions_icon.png')}
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <Text style={styles.scanButtonText}>Scan A Prescription</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={require('../assets/icons/recent_scans_icon.png')}
              style={{ width: 32, height: 32, marginBottom: 8 }}
            />
            <Text style={styles.quickActionText}>Recent Scans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Image
              source={require('../assets/icons/ai_analysis_icon.png')}
              style={{ width: 32, height: 32, marginBottom: 8 }}
            />
            <Text style={styles.quickActionText}>AI Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Secondary Actions */}
      <View style={styles.secondaryActions}>
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Image
            source={require('../assets/icons/prescriptions_at_a_glance_icon.png')}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Text style={styles.secondaryActionText}>Prescriptions at a glance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Image
            source={require('../assets/icons/medicine_reminder_icon.png')}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Text style={styles.secondaryActionText}>Medicine Reminders</Text>
        </TouchableOpacity>
      </View>

      {/* Prescription History */}
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>History • {formatDate(prescription.date)}</Text>
            </View>
            
            <View style={styles.prescriptionCard}>
              <View style={styles.prescriptionTime}>
                <Text style={styles.timeText}>{formatTime(prescription.time)}</Text>
              </View>
              
              <View style={styles.prescriptionDetails}>
                <Text style={styles.medicationName}>{prescription.medication}</Text>
                <Text style={styles.activeIngredient}>
                  Active Ingredient: {prescription.activeIngredient}
                </Text>
                <Text style={styles.classification}>
                  Classification: {prescription.classification}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>⋯</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/home_icon.png')}
            style={{ width: 24, height: 24, marginBottom: 4 }}
          />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/chat_icon.png')}
            style={{ width: 24, height: 24, marginBottom: 4 }}
          />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/people_icon.png')}
            style={{ width: 24, height: 24, marginBottom: 4 }}
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/calender_icon.png')}
            style={{ width: 24, height: 24, marginBottom: 4 }}
          />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#ddd',
    borderRadius: 12,
  },
  scanBanner: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scanBannerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A29FF',
    textAlign: 'center',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#1A29FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#e8ebff',
    borderRadius: 16,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#1A29FF',
    fontWeight: '500',
  },
  secondaryActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  secondaryActionIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#e8ebff',
    borderRadius: 12,
    marginRight: 8,
  },
  secondaryActionText: {
    fontSize: 12,
    color: '#1A29FF',
    fontWeight: '500',
    flex: 1,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historySection: {
    marginBottom: 20,
  },
  historyHeader: {
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 14,
    color: '#1A29FF',
    fontWeight: '500',
  },
  prescriptionCard: {
    backgroundColor: '#e8ebff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  prescriptionTime: {
    marginRight: 12,
    minWidth: 40,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  prescriptionDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A29FF',
    marginBottom: 4,
  },
  activeIngredient: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  classification: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 4,
  },
  moreButtonText: {
    fontSize: 20,
    color: '#1A29FF',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1A29FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    marginBottom: 4,
  },
  navIconActive: {
    backgroundColor: '#fff',
  },
  navText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  navTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;