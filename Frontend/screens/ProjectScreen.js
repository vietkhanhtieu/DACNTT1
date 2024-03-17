import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/UserContext.js'
import { fetchAPI } from '../apiConfig.js'; 



const YourComponent = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [teams, setTeams] = useState([
       
      ]);
    const [tasks, setTasks] = useState([

      ]);

      const handlePressTeam = (id, project) => {
        navigation.navigate('TaskScreen', { id: id, project: project});
      };

      const handlePressTask = (id) => {
       
        navigation.navigate('DetailProjectScreen', { id: id});
      };


      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAPI(`NguoiDungDuAn/NguoiDung?maNguoiDung=${user.manguoidung.toString()}`);
            setTeams(data);
          } catch (error) {
            console.error("Error fetching attendance data:", error);
          }
        };
        fetchData();
       }, [])
       useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAPI(`NguoiDungCongViec/NguoiDung?maNguoiDung=${user.manguoidung.toString()}`);
            const filteredData = data.filter(item => item.tinhTrang === 0 || item.tinhTrang === 1);
            setTasks(filteredData)
          } catch (error) {
            console.error("Error fetching attendance data:", error);
          }
        };
        fetchData();

        
       }, [])

       const statusTast = {
        '0': 'Đã phân công',
        '1': 'Đang thực hiện',
      };
      const colorStatus = {
        '0': 'orange',
        '1': 'green',
      };
    
    return (
        <ScrollView style={styles.container}>
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
            />
        </View>
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>CÁC DỰ ÁN CỦA BẠN</Text>
            <ScrollView style={styles.teamList}>
                {teams.map((team, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handlePressTeam(team.maDuAn, team.tenDuAn)}>
                    <Text style={styles.teamName}>{team.tenDuAn}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>CÔNG VIỆC CỦA BẠN</Text>
            <ScrollView style={styles.taskList}>
            {tasks.map((task, index) => (
                <View key={index} style={styles.taskWrapper}>
                    <TouchableOpacity style={styles.taskContainer} onPress={() => handlePressTask(task.maCongViec)}>
                        <Text style={styles.taskName}>{task.tenCongViec}</Text>
                        <Text style={[styles.taskName, { color: colorStatus[task.tinhTrang] }]}>{statusTast[task.tinhTrang]}</Text>


                    </TouchableOpacity>
                    <View style = {styles.taskDetail}>
                        <Text style={styles.additionalText}>Trong dự án: {task.tenDuAn}</Text>
                        <Text style={styles.additionalText}>Dealine: {task.ngayKetThucCv}</Text>

                        {/* <Text style={[styles.additionalText, { color: colorStatus[task.tinhTrang] }]}>{statusTast[task.tinhTrang]}</Text> */}
                    </View>
                    
                </View>
            ))}
            </ScrollView>
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
  taskDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  additionalText: {
    marginTop: -4, // For example, to space out the tasks
    marginLeft: 10, // For example, to align with your tasks
  },
});

export default YourComponent;
