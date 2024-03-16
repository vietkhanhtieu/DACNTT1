import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/UserContext.js';
import { format } from 'date-fns';
import { fetchAPI } from '../apiConfig.js'; 



const LeaveApplicationScreen = () => {
   const navigation = useNavigation();
   const { user } = useUser();
   const [selectedTab, setSelectedTab] = useState('All');
   const [data, setData] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

  // Dummy data for leave applications

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`NghiPhep/user/${user.manguoidung.toString()}`);
        setData(data.sort((a, b) => b.manghiphep - a.manghiphep))
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();

  }, [user.manguoidung]);
  
  const statusFilterMap = {
    'All': 'All',
    'Chưa duyệt': 'Chờ duyệt',
    'Đã duyệt': 'Đã duyệt',
    'Từ chối': 'Từ chối',
  };

  const colorStatus = {
    'Chờ duyệt': 'orange',
    'Đã duyệt': 'green',
    'Từ chối': 'red',
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`NghiPhep/user/${user.manguoidung.toString()}`);
        setData(data.sort((a, b) => b.manghiphep - a.manghiphep))
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setRefreshing(false);
      }
    };
    fetchData();
  }, [user.manguoidung]);

  const filterApplications = (status) => {
    if (status === 'All') {
      return data;
    }
    return data.filter(app => app.trangthai === status);
  };

  // Dynamically get the filtered applications
  const filteredApplications = filterApplications(statusFilterMap[selectedTab]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng kí nghỉ phép, công tác</Text>
      </View>

      <View style={styles.tabContainer}>
        {Object.keys(statusFilterMap).map((statusKey) => (
          <TouchableOpacity
            key={statusKey}
            onPress={() => setSelectedTab(statusKey)}
            style={[styles.tabButton, selectedTab === statusKey && styles.tabButtonActive]}>
            <Text style={styles.tabButtonText}>{statusKey}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {filteredApplications.map((application) => (
          <View key={application.id} style={styles.applicationCard}>
            <Text>Loại nghỉ phép: {application.loainghiphep}</Text>
            <Text>Ngày đăng kí: {application.ngaydangKi}</Text>
            <Text>Từ: {format(application.ngaybatdau, "dd-MM-yyyy")}</Text>
            <Text>Đến: {format(application.ngayketthuc, "dd-MM-yyyy")}</Text>
            <View style={[styles.statusBadge, { backgroundColor: colorStatus[application.trangthai] }]}>
              <Text>{application.trangthai}</Text>
              <Text>{application.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('RequestLeave')}>
        <Text style={styles.createButtonText}>Tạo nghỉ phép, công tác</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F6A86F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 24,
    flex: 1,
    
  },
  backButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#F6A86F',
    
    
  },
  tabButton: {
    color: '#fff',
  },
  scrollView: {
    margin: 16,
  },
  applicationCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    
  },
  statusBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#F6A86F',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LeaveApplicationScreen;
