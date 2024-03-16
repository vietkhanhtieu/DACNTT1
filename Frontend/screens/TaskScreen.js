import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { fetchAPI } from '../apiConfig.js'; 




const DBTeamScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id, project } = route.params;
  const [teamDetails, setTeamDetail] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All');
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`DuAn/CongViec?maDuAn=${id}`);
        setTeamDetail(data)
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`DuAn/CongViec?maDuAn=${id}`);
        setTeamDetail(data);
        setRefreshing(false); 
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setRefreshing(false);
      }
    };
    fetchData();
}, [id]);

  const handlePress = (id) => {
    navigation.navigate('DetailProjectScreen', {id});
  }

  const statusFilterMap = {
    'All': 'All',
    '0': 'Đã phân công',
    '1': 'Đang thực hiện',
    '2': 'Hoàn thành',
    '-1': 'Từ chối',
  };

  const colorStatus = {
    '0': 'orange',
    '1': 'green',
    '2': 'blue',
    '-1': 'red',
  };

  const filterApplications = (status) => {
    if (status === 'All') {
      return teamDetails;
    }
    return teamDetails.filter(app => app.trangThai === status);
  };
  const filteredApplications = filterApplications(selectedTab);
  const orderedStatusKeys = ['All','0', '1', '2', '-1'];
  return (
    <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{project}</Text>
        </View>
        <View style={styles.tabContainer}>
            {orderedStatusKeys.map((statusKey) => (
              <TouchableOpacity
                key={statusKey}
                onPress={() => setSelectedTab(statusKey)}
                style={[styles.tabButton, selectedTab === statusKey && styles.tabButtonActive]}>
                <Text style={styles.tabButtonText}>{statusFilterMap[statusKey]}</Text>
              </TouchableOpacity>
            ))}
        </View>
        
      {filteredApplications.map((application) => {
        return (
          <TouchableOpacity key={application.Id} style={styles.card} onPress={() => handlePress(application.maCongViec)}>
              <Text style={styles.cardTitle}>{application.tenDuAn}</Text>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{application.tenCongViec}</Text>
                <Text style={styles.itemAuthor}>{application.nguoiDungs}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colorStatus[application.trangThai] }]}>
                <Text>{application.trangthai}</Text>
                <Text>{statusFilterMap[application.trangThai]}</Text>
              </View>
            
          </TouchableOpacity>
        )
       
      })}
      
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateTaskScreen",  { id: id })}>
          <Text style={styles.addButtonText}>Thêm thẻ</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EF7720',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAuthor: {
    fontSize: 14,
    color: '#757575',
  },
  statusBadge: {
    flexDirection: 'row',
    //justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  addButton: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFA726',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default DBTeamScreen;
