import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { fetchAPI } from '../../apiConfig.js';
import { useUser } from '../../components/UserContext.js'








const ProfileManagementScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const { user } = useUser();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`Nguoidung/getAll`);
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
    // fetch("http://10.35.16.127:7218/api/Nguoidung/getAll")
    // .then(response => response.json())
    // .then(data => {
    //     setData(data);
    //     setFilteredData(data);
    // })
  },[])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`Nguoidung/getAll`);
        setReload(!reload);
        setData(data);
        setFilteredData(data);
        setRefreshing(false); 
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setRefreshing(false); 
      }
    };
    fetchData();

}, [reload]);

  const handlePress = (id) => {
    navigation.navigate('ProfileScreen', { id });
    }

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = data.filter((item) => {
        const itemData = `${item.hoten.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };
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
        <Text style={styles.headerText}>Danh sách nhân viên</Text>
      </View>
      <View style={styles.searchSection}>
            <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
            <TextInput
                placeholder="Họ và tên"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearch}
            />
        </View>
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Danh sách các nhân viên</Text>

            <ScrollView style={styles.teamList}>
                {filteredData.map((user, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(user.manguoidung)}>
                     <View style={styles.userInfoContainer}>
                        <Text style={styles.username}>{user.hoten}</Text>
                        <View style={styles.separatorLine} /> 
                        <Text style={styles.userRole}>{user.chucvu}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateUserScreen")}>
                  <Text style={styles.addButtonText}>Thêm tài khoản</Text>
                </TouchableOpacity>
        </View>
                  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EF7720',
    borderRadius: 5,
    margin: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
   
  },
  sectionContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    size: 12,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EF7720'
  },

  separatorLine: {
    height: 1, // Độ dày của đường kẻ
    backgroundColor: '#000000', // Màu sắc của đường kẻ
    marginVertical: 8, // Khoảng cách trên và dưới đường kẻ
  },
//   userInfoContainer: {
//     // Style này để bọc thông tin người dùng, bao gồm username và userRole
//     alignItems: 'center', // Căn giữa các thành phần con theo trục dọc
//     justifyContent: 'center', // Căn giữa các thành phần con theo trục ngang
//   },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EF7720',
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

export default ProfileManagementScreen;
