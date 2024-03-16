import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { fetchAPI } from '../apiConfig.js'; 



const App = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const  applicationId  = route.params;
    const [data, setData] = useState({});
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [status, setStatus] = useState("");
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAPI(`OT/${applicationId}`);
            setData(data);
            setFromTime(format(data.giobatdau, "HH:mm:ss dd-MM-yyyy"));
            setToTime(format(data.gioketthuc, "HH:mm:ss dd-MM-yyyy"));
            setStatus(data.trangthai);
          } catch (error) {
            console.error("Error fetching attendance data:", error);
          }
        };
        fetchData();
        },[]);
    const colorStatus = {
        'Chờ duyệt': 'orange',
        'Đã duyệt': 'green',
        'Từ chối': 'red',
        };
    

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tăng ca</Text>
        <View style={{ width: 20 }} /> 
      </View>
      <View style={styles.content}>
        <View style={[styles.warningBox, {backgroundColor: colorStatus[status]}]}>
          <Text style={styles.status}>{data.trangthai}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tăng ca từ</Text>
          <Text style={styles.input}>
            <Text>{fromTime}</Text>
          </Text>
          
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Đến</Text>
          <TouchableOpacity style={styles.input}>
            <Text>{toTime}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lý do(*)</Text>
          <Text style={[styles.input, styles.textArea]}  multiline={true} numberOfLines={4} >{data.lydo}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

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
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 24,

    
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  warningBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  status:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  textArea: {
    height: 100, // Adjust the height as needed
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 38,
  },
  icon: {
    width: 20,
    height: 20,
  }
});

export default App;
