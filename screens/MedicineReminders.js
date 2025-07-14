import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const remindersData = [
  {
    id: '1',
    medication: 'Gluformin - 500mg',
    time: '9:00 am',
    repeats: 'Daily',
    dose: '1 Tablet',
    prescribedBy: 'Dr. Gukesh D',
  },
  {
    id: '2',
    medication: 'Amlopres - 5mg',
    time: '10:00 pm',
    repeats: 'Daily',
    dose: '1 Tablet',
    prescribedBy: 'Dr. Gukesh D',
  },
  {
    id: '3',
    medication: 'Telma - 40mg',
    time: '8:00 pm',
    repeats: 'Daily',
    dose: '1 Tablet',
    prescribedBy: 'Dr. Gukesh D',
  },
  {
    id: '4',
    medication: 'Crocin - 500mg',
    time: '7:00 pm',
    repeats: 'Daily',
    dose: '1 Tablet',
    prescribedBy: 'Dr. Gukesh D',
  },
  {
    id: '5',
    medication: 'Azithral - 500mg',
    time: '6:00 pm',
    repeats: 'Daily',
    dose: '1 Tablet',
    prescribedBy: 'Dr. Gukesh D',
  },
];

const chunkReminders = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

const MedicineReminders = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Reminders');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const chunkedReminders = chunkReminders(remindersData, 2);

  const dropdownOptions = ['Past 7 Days', 'Past 30 Days', 'Past 6 Months'];

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleEdit = (id) => {
    console.log('Edit pressed for:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete pressed for:', id);
  };

  const handleAddReminder = () => {
    console.log('Add Reminder pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
            <Image
              source={require('../assets/user_photo.jpg')}
              style={styles.profileImage}
            />
            </TouchableOpacity>
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

          <TouchableOpacity 
            style={styles.scanPrescriptionButton}
            onPress={() => navigation.navigate('ScanPrescription')} // Add this onPress
          >
            <Image
              source={require('../assets/icons/scan_a_prescriptions_icon.png')}
              style={{ width: 20, height: 20, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={styles.scanPrescriptionButtonText}>Scan A Prescription</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Actions Row */}
        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity
            style={styles.secondaryActionItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              source={require('../assets/icons/prescriptions_at_a_glance_icon.png')}
              style={styles.secondaryActionIcon}
              resizeMode="contain"
            />
            <Text style={styles.secondaryActionText}>Prescriptions at a Glance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionItem, styles.activeAtAGlanceContainer]}
            onPress={() => {}}
          >
            <Image
              source={require('../assets/icons/medicine_reminder_icon.png')}
              style={[styles.secondaryActionIcon, { tintColor: '#0018A8' }]}
              resizeMode="contain"
            />
            <Text style={[styles.secondaryActionText, styles.activeAtAGlanceText]}>
              Medicine Reminders
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'All Reminders' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('All Reminders')}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === 'All Reminders' && styles.activeFilterText,
              ]}>All Reminders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'Today' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('Today')}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === 'Today' && styles.activeFilterText,
              ]}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter.includes('Past') && styles.activeFilter,
              ]}
              onPress={() => setDropdownVisible(true)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter.includes('Past') && styles.activeFilterText,
              ]}>
                {selectedFilter.includes('Past') ? selectedFilter : 'Past 7 Days'} ▼
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dropdown Modal */}
        <Modal visible={dropdownVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownContainer}>
              {dropdownOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedFilter(option);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Reminders List */}
        <View style={styles.reminderListContainer}>
          <FlatList
            data={chunkedReminders}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.reminderPage}>
                <FlatList
                  data={item}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(reminder) => reminder.id}
                  contentContainerStyle={styles.verticalScrollContent}
                  renderItem={({ item: reminder }) => (
                    <View style={styles.reminderCard}>
                      <View style={styles.reminderHeader}>
                        <Text style={styles.medication}>{reminder.medication}</Text>
                        <View style={styles.actionButtons}>
                          <TouchableOpacity onPress={() => handleEdit(reminder.id)}>
                            <Image
                              source={require('../assets/icons/Edit.png')}
                              style={styles.actionIcon}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDelete(reminder.id)}>
                            <Image
                              source={require('../assets/icons/Delete.png')}
                              style={styles.actionIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.detail}>Time : {reminder.time}</Text>
                      <Text style={styles.detail}>Repeats : {reminder.repeats}</Text>
                      <Text style={styles.detail}>Dose : {reminder.dose}</Text>
                      <Text style={styles.detail}>Prescribed by : {reminder.prescribedBy}</Text>
                    </View>
                  )}
                />
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {chunkedReminders.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: currentIndex === index ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Add Reminder Button */}
        <View style={styles.addReminderContainer}>
          <TouchableOpacity style={styles.addReminderButton} onPress={handleAddReminder}>
            <Text style={styles.addReminderIcon}>+</Text>
            <Text style={styles.addReminderText}>Add a Reminder</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Home')}
          >
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
  
  // Header styles
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
  topIcon: { width: 30, height: 30 },
  
  // Scan banner styles
  scanBanner: {
    backgroundColor: '#e8ebff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scanBannerText: { fontSize: 13, fontWeight: '600', color: '#1A29FF', textAlign: 'center' },
  
  // Quick action styles
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
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  scanPrescriptionButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  
  // Secondary actions
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e8ebff',
    paddingVertical: 10,
    paddingBottom: 15,
  },
  secondaryActionItem: { alignItems: 'center' },
  secondaryActionIcon: { width: 24, height: 24, marginBottom: 4 },
  secondaryActionText: { fontSize: 10, color: '#1A29FF', fontWeight: '500' },
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
  
  // Filter section
  filterSection: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 12.5,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8ebff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    borderRadius: 25,
    padding: 3.5,
    borderWidth: 1,
    borderColor: '#e0e5ff',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#1A29FF',
    shadowColor: '#1A29FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  filterText: {
    color: '#1A29FF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e5ff',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 2,
  },
  dropdownText: {
    fontSize: 13,
    color: '#1A29FF',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Reminder list container
  reminderListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reminderPage: {
    width: width,
    paddingHorizontal: 20,
    flex: 1,
  },
  verticalScrollContent: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  
  // Reminder card styles
  reminderCard: {
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medication: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A29FF',
    marginBottom: 2,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
  },
  detail: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  
  // Pagination styles
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#0018A8',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  
  addReminderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  addReminderButton: {
    flexDirection: 'row',
    backgroundColor: '#0018A8',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addReminderIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  addReminderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Bottom navigation
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

export default MedicineReminders;