import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/UserContext.js';
import { format } from 'date-fns';
import { fetchAPI } from '../apiConfig.js'; 

const OTScreen = () => {
   const navigation = useNavigation();
   const [selectedTab, setSelectedTab] = useState('All');
   const { user } = useUser();
   const [data, setData] = useState([]);
   const [refreshing, setRefreshing] = useState(false);
   useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchAPI(`OT/user/${user.manguoidung.toString()}`);
        setData(data.sort((a, b) => b.maot - a.maot));
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
   }, [])

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

  const filterApplications = (status) => {
    if (status === 'All') {
      return data;
    }
    return data.filter(app => app.trangthai === status);
  };

  const handlePress = (applicationId) => {
    // Thay thế 'NewScreen' bằng tên màn hình mà bạn muốn chuyển đến
    navigation.navigate('DetailScreen',  applicationId );
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`OT/user/${user.manguoidung.toString()}`);
        setData(data.sort((a, b) => b.maot - a.maot));
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setRefreshing(false);
      }
    };
    fetchData();

}, [user.manguoidung]);

  // Dynamically get the filtered applications
  const filteredApplications = filterApplications(statusFilterMap[selectedTab]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng kí OT</Text>
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
      {filteredApplications.map((application) => {
        let fromDateRequest = new Date(application.giobatdau);
        let formatFromTimeRequest = fromDateRequest.toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' });
        let toDateRequest = new Date(application.gioketthuc);
        let formatToTimeRequest = toDateRequest.toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' });

        let sumHour = (toDateRequest.getHours() * 60 + toDateRequest.getMinutes()) - (fromDateRequest.getHours() * 60 + fromDateRequest.getMinutes());
        return (
          <TouchableOpacity key={application.id} onPress={() => handlePress(application.maot)}>
            <View key={application.id} style={styles.applicationCard}>
              <Text>Ngày đăng kí: {format(application.ngaydangKi, "dd-MM-yyyy")}</Text>
              <Text>Từ: {` ${formatFromTimeRequest} `}</Text>
              <Text>Đến: {` ${formatToTimeRequest} `}</Text>
              <View style={[styles.statusBadge, { backgroundColor: colorStatus[application.trangthai] }]}>
                <Text>{application.trangthai}</Text>
                <Text>{application.timestamp}</Text>
              </View>
            </View>
        </TouchableOpacity>   
        )
        })}
      </ScrollView>

      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('RequestOTScreen')}>
        <Text style={styles.createButtonText}>Tạo OT</Text>
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

export default OTScreen;
