import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { fetchAPI } from '../../apiConfig.js'; 


const YourComponent = () => {
    const navigation = useNavigation();
    const [data, setdata] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [reload, setReload] = useState(false);



    const handlePress = (id, project) => {
      navigation.navigate('TaskScreen', { id: id, project: project});
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchAPI(`DuAn`);
          setdata(data)
          setFilteredData(data);
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };
      fetchData();
      }, [reload]) 

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      const fetchData = async () => {
        try {
          const data = await fetchAPI(`DuAn`);
          setReload(!reload);
          setFilteredData(data);
          setRefreshing(false); // Kết thúc quá trình làm mới sau khi dữ liệu được cập nhật
        } catch (error) {
          console.error("Error fetching attendance data:", error);
          setRefreshing(false);
        }
      };
      fetchData();
    }, []);
    const handleSearch = (text) => {
      setSearchQuery(text);
      if (text) {
        const newData = data.filter((item) => {
          const itemData = `${item.tenDa.toUpperCase()}`;
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
            value={searchQuery}
            onRefresh={onRefresh}
          />
        }>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Nhiệm vụ</Text>
            </View>
            <View style={styles.searchSection}>
                <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput
                    placeholder="Nhiệm vụ"
                    style={styles.searchInput}
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Dự án công ty</Text>
                <ScrollView style={styles.teamList}>
                    {filteredData.map((team, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(team.maduan, team.tenDa)}>
                        <Text style={styles.teamName}>{team.tenDa}</Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateProjectScreen")}>
                  <Text style={styles.addButtonText}>Thêm thẻ</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFAF1',
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
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EF7720'
  },
  teamName: {
    fontSize: 16,
  },

  taskWrapper: {
    marginBottom: 12, // For example, to space out the tasks
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EF7720'
  },

  additionalText: {
    marginTop: -4, // For example, to space out the tasks
    marginLeft: 10, // For example, to align with your tasks
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

export default YourComponent;
