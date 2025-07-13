import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const prescriptions = [
  {
    id: 1,
    date: 'July 5, 2025',
    time: '9 AM',
    medication: 'Antidiabetic - Gluformin 500mg',
    activeIngredient: 'Metformin',
    classification: 'Antidiabetic (Type 2 Diabetes Management)',
  },
  {
    id: 2,
    date: 'July 4, 2025',
    time: '10 PM',
    medication: 'Antihypertensive - Amlopres 5mg',
    activeIngredient: 'Amlodipine Besylate',
    classification: 'Calcium Channel Blocker (High Blood Pressure Management)',
  },
  {
    id: 3,
    date: 'July 3, 2025',
    time: '8 PM',
    medication: 'Antihypertensive - Telma 40mg',
    activeIngredient: 'Telmisartan',
    classification: 'Angiotensin II Receptor Blocker (High Blood Pressure Control)',
  },
  {
    id: 4,
    date: 'July 2, 2025',
    time: '7 PM',
    medication: 'Analgesic - Crocin 500mg',
    activeIngredient: 'Paracetamol',
    classification: 'Analgesic (Pain & Fever Management)',
  },
  {
    id: 5,
    date: 'July 1, 2025',
    time: '6 PM',
    medication: 'Antibiotic - Azithral 500mg',
    activeIngredient: 'Azithromycin',
    classification: 'Macrolide Antibiotic (Bacterial Infections)',
  },
];

const chunkPrescriptions = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

const HomeScreen = ({ navigation }) => {
  const [atAGlanceActive, setAtAGlanceActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const chunkedPrescriptions = chunkPrescriptions(prescriptions, 3);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
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

        {/* Quick Actions Row */}
        <View style={styles.quickActionRow}>
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

        {/* Secondary Actions */}
        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity
            style={[
              styles.secondaryActionItem,
              atAGlanceActive && styles.activeAtAGlanceContainer,
            ]}
            onPress={() => setAtAGlanceActive(true)}>
            <Image
              source={require('../assets/icons/prescriptions_at_a_glance_icon.png')}
              style={[
                styles.secondaryActionIcon,
                atAGlanceActive && { tintColor: '#0018A8' },
              ]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.secondaryActionText,
                atAGlanceActive && styles.activeAtAGlanceText,
              ]}>
              Prescriptions at a Glance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryActionItem}>
            <Image
              source={require('../assets/icons/medicine_reminder_icon.png')}
              style={styles.secondaryActionIcon}
              resizeMode="contain"
            />
            <Text style={styles.secondaryActionText}>Medicine Reminders</Text>
          </TouchableOpacity>
        </View>

        {/* Prescriptions */}
        {atAGlanceActive ? (
          <>
            <FlatList
              data={chunkedPrescriptions}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ width, paddingHorizontal: 20, paddingTop: 20 }}>
                  {item.map((prescription) => (
                    <View key={prescription.id} style={styles.historySection}>
                      <Text style={styles.historyTitle}>History • {prescription.date}</Text>
                      <View style={styles.prescriptionCard}>
                        <Text style={styles.timeText}>{prescription.time}</Text>
                        <Text style={styles.medicationName}>{prescription.medication}</Text>
                        <Text style={styles.activeIngredient}>
                          Active Ingredient: {prescription.activeIngredient}
                        </Text>
                        <Text style={styles.classification}>
                          Classification: {prescription.classification}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {chunkedPrescriptions.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { opacity: currentIndex === index ? 1 : 0.3 },
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            {prescriptions.slice(0, 3).map((prescription) => (
              <View key={prescription.id} style={styles.historySection}>
                <Text style={styles.historyTitle}>History • {prescription.date}</Text>
                <View style={styles.prescriptionCard}>
                  <Text style={styles.timeText}>{prescription.time}</Text>
                  <Text style={styles.medicationName}>{prescription.medication}</Text>
                  <Text style={styles.activeIngredient}>
                    Active Ingredient: {prescription.activeIngredient}
                  </Text>
                  <Text style={styles.classification}>
                    Classification: {prescription.classification}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/icons/home_icon.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/icons/chat_icon.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/icons/people_icon.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/icons/calender_icon.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navText}>Calendar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 10 : 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
  greeting: { fontSize: 12, color: '#666' },
  userName: { fontSize: 14, fontWeight: '600', color: '#000' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 10 },
  topIcon: { width: 22, height: 22 },
  scanBanner: {
    backgroundColor: '#e8ebff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scanBannerText: { fontSize: 13, fontWeight: '600', color: '#1A29FF', textAlign: 'center' },
  quickActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e8ebff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  quickActionItem: { alignItems: 'center', justifyContent: 'center' },
  quickActionIcon: { width: 24, height: 24, marginBottom: 4 },
  quickActionText: { fontSize: 10, color: '#1A29FF', fontWeight: '500' },
  scanPrescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0018A8',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  activeAtAGlanceContainer: {
    shadowColor: '#0018A8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  activeAtAGlanceText: {
    color: '#0018A8',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#0018A8',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  scanPrescriptionButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e8ebff',
    paddingVertical: 10,
  },
  secondaryActionItem: { alignItems: 'center' },
  secondaryActionIcon: { width: 24, height: 24, marginBottom: 4 },
  secondaryActionText: { fontSize: 10, color: '#1A29FF', fontWeight: '500' },
  historySection: { marginBottom: 20 },
  historyHeader: { marginBottom: 5 },
  historyTitle: { fontSize: 12, color: '#1A29FF', fontWeight: '500' },
  prescriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1A29FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timeText: { fontSize: 12, color: '#666', marginBottom: 4 },
  medicationName: { fontSize: 14, fontWeight: '600', color: '#1A29FF', marginBottom: 2 },
  activeIngredient: { fontSize: 12, color: '#333' },
  classification: { fontSize: 12, color: '#333' },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0018A8',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { alignItems: 'center' },
  navIcon: { width: 24, height: 24 },
  navText: { fontSize: 10, color: '#fff', marginTop: 2 },
});

export default HomeScreen;
