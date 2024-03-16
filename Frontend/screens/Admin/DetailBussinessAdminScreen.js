import React, { useState, useEffect }  from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../../components/UserContext.js';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader.js';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';
import { fetchAPI } from '../../apiConfig.js'; 




const App = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const  applicationId  = route.params;
    const [reason, setReason] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [status, setStatus] = useState("");
    const [reload, setReload] = useState(false);
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchAPI(`NghiPhep/${applicationId}`);
          setData(data);
          setFromTime(format(data.ngaybatdau, "dd-MM-yyyy"));
          setToTime(format(data.ngayketthuc, "dd-MM-yyyy"));
          setStatus(data.trangthai);
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };
      fetchData();
    },[reload]);

    handleSubmit = (status) => {
        (async () => {
            const response = await fetchAPI('NghiPhep/UpdateStatus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"manghiphep": applicationId, "trangthai": status})
            })
            if(response.success == 1){
              setReload(!reload);
              navigation.navigate('BussinessAdminScreen');
            }
        })()
    }
    const colorStatus = {
        'Chờ duyệt': 'orange',
        'Đã duyệt': 'green',
        'Từ chối': 'red',
    };

      
    

  return (
    
    <ScrollView style={styles.container}>
 
      <Loader loading={loading} />
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('BussinessAdminScreen')} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng kí nghỉ phép, công tác</Text>
        <View style={{ width: 20 }} /> 
      </View>
      <View style={styles.content}>
      <View style={[styles.warningBox, {backgroundColor: colorStatus[status]}]}>
          <Text style={styles.status}>{data.trangthai}</Text>
        </View>
        <View style={styles.inputGroup}>
        <Text style={styles.label}>Loại nghỉ phép (*)</Text>
        <View style={styles.input}>
            <Text>{data.loainghiphep}</Text>
          </View> 
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nghỉ từ ngày (*)</Text>
          <View style={styles.input}>
            <Text>{fromTime}</Text>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Đến ngày (*)</Text>
          <View style={styles.input}>
            <Text>{toTime}</Text>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lý do(*)</Text>
          <Text style={[styles.input, styles.textArea]}  multiline={true} numberOfLines={4} >{data.lydo}</Text>
        </View>
        <TouchableOpacity style={styles.approveButton} onPress={() => handleSubmit("Đã duyệt")}>
            <Text style={styles.approveButtonText}>Duyệt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rejectButton} onPress={() => handleSubmit("Từ chối")}>
            <Text style={styles.rejectButtonText}>Không duyệt</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
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
    backgroundColor: '#FFD1C1',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
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
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff', // Choose appropriate color for footer background
  },
  submitButton: {
    backgroundColor: '#F6A86F',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

  },
  icon: {
    marginRight: 5,
  },
  
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  approveButton: {
    backgroundColor: '#28EE53',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rejectButton: {
    backgroundColor: '#F48989',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
