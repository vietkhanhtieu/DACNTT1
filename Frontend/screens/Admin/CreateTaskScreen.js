import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, auto, map } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { format } from 'date-fns';
import { useUser } from '../../components/UserContext.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchAPI } from '../../apiConfig.js'; 





const TaskDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const {id} = route.params;
    console.log(id)
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [reason, setReason] = useState("");
    const [projectName, setProjectName] = useState("");



    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchAPI(`Nguoidung/getAll`);
            setData(data);
            const items = data.map(user => ({
              label: user.hoten,
              value: user.manguoidung.toString(), // Convert to string if value expects a string
            }));
              setItems(items);
          } catch (error) {
            console.error("Error fetching attendance data:", error);
          }
        };
        fetchData();
      },[])

    const handleFromDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowFromDatePicker(Platform.OS === 'ios');
        setFromDate(currentDate);
      };
    
      const handleToDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setShowToDatePicker(Platform.OS === 'ios');
        setToDate(currentDate);
      };
      const handleSubmitButton = async () => {
        if (!reason) {
          alert('Vui lòng nhập mô tả công việc');
          return;
        }
        try {
          const response = await fetchAPI('CongViec', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "tenCv": projectName,
              "songuoithamgiaCv": value.length,
              "ngaybatdauCv": format(fromDate, "yyyy-MM-dd"),
              "ngayketthucCv": format(toDate, "yyyy-MM-dd"),
              "motaCv": reason,
              "tinhtrangCv": 0,
              "maduan": id
            })
          });
          if (response.success == 1) {
            for (const element of value) {
              await assignUserToTask(element, response.id);
            }
          } else {
            // Handle the failure scenario
            alert('Something went wrong');
          }
        } catch (error) {
          // Handle the error scenario
          console.error('An error occurred:', error);
        }
        // setLoading(false);
      };
      
      const assignUserToTask = async (userId, taskId) => {
        const response = await fetchAPI('NguoiDungCongViec', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "manguoidung": parseInt(userId),
            "macongviec": taskId
          })
        });
        if (response.success == 1) {
          navigation.navigate("TaskScreen", {id: id})
        } else {
          throw new Error('Failed to assign user');
        }
      };
      
      
    return (
        <ScrollView style={styles.container} nestedScrollEnabled = {true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title}>Tạo công việc</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.headerSection}>
                    <View style={styles.detailContainer}>
                        <TextInput style={styles.projectName} placeholder="Tên công việc" onChangeText={(projectName) => setProjectName(projectName)} value= {projectName}></TextInput>
                    </View>
                    <View style={styles.detailContainer}>
                        <TextInput style={styles.description} placeholder="Mô tả" multiline={true} numberOfLines={4} onChangeText={(reason) => setReason(reason)} value= {reason}></TextInput>
                    </View>
                </View>
                <View style={styles.detailsSection}>
                    <View style={styles.detailContainer}>
                        <Icon name="clock-o" size={24} color="#000" style={styles.iconStyle} />
                        <Text style={styles.detail} >Ngày bắt đầu: </Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowFromDatePicker(true)}>
                            <Text style={styles.date}>{fromDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowFromDatePicker(true)}>
                            <Icon name="calendar" size={20} color="#000" />
                        </TouchableOpacity>
                        {showFromDatePicker && (
                            <DateTimePicker
                            value={fromDate}
                            mode="datetime"
                            display='default'
                            is24Hour={true}
                            onChange={handleFromDateChange}
                        
                            />
                        )}
                    </View>
                    <View style={styles.detailContainer}>
                        <Icon name="clock-o" size={24} color="#000" style={styles.iconStyle} />
                        <Text style={styles.detail}>Ngày hết hạn: </Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowToDatePicker(true)}>
                            <Text style={styles.date}>{toDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowToDatePicker(true)}>
                            <Icon name="calendar" size={20} color="#000" />
                        </TouchableOpacity>
                        {showToDatePicker && (
                            <DateTimePicker
                            value={toDate}
                            mode="datetime"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={handleToDateChange}
                            maximumDate={new Date(2300, 10, 20)}
                            minimumDate={new Date(1950, 0, 1)}
                            />
                        )}
                    </View>
                    <View style={styles.detailCustomer}>
                        <View style={styles.titleCustomer}>
                            <Icon name="user" size={24} color="#000" style={styles.iconStyle} />
                            <Text style={styles.detail}>Thành viên: </Text> 
                        </View>
                         <DropDownPicker
                            style = {styles.dropDown}
                            dropDownContainerStyle={{
                                maxHeight: 300, // Set this to control how tall the dropdown can get
                                zIndex: 1000, // Set zIndex here as well to ensure it overlays other components
                              }}
                            listMode="SCROLLVIEW"
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            multiple={true}
                            mode="BADGE"
                            min={0}
                            max={5}
                            placeholder="Chọn nhân viên"
                            onChangeValue={(value) => {
                            console.log(value);
                            }}
                        />
                    </View>
                </View>
                
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButton}>
                <Icon name="paper-plane" size={20} color="#fff" />
                <Text style={styles.submitButtonText}> Tạo công việc</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    height: auto,
  },

  header: {
    backgroundColor: '#F6A86F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  projectName: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  backButton: {
    // Make sure padding does not offset the alignment
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    color: '#ffffff',
    fontSize: 16,
    position: 'absolute',
    marginTop: 5,
    bottom: 0,
    left: 48, // Adjust this value to align with the title. It should be the sum of padding of the header and padding of the backButton
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    // Style for each dropdown item
  },
  dropdownText: {
    textAlign: 'center',
    // Style for the text inside dropdown
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    height: 600,
  },
  headerSection: {
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
    paddingBottom: 16,
    marginBottom: 16,
  },
  description: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  detailsSection: {
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
    paddingBottom: 16,
    marginBottom: 16,

  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 12,
    marginBottom: 8,
    paddingHorizontal: 16
  },

  input: {
    padding: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 32,
  },
  date: {
    fontSize: 16,
  },
  textArea: {
    height: 100, // Adjust the height as needed
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
  iconStyle: {
    marginRight: 8,
    size: 18, 
  },
  detail: {
    fontSize: 16,
    lineHeight: 20,
  },
  titleCustomer: {
    flexDirection: 'row',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  dropDown: {
    paddingHorizontal: 8,
    width: '100%', 
    zIndex: 1000,
  },
  detailCustomer: {
    overflow: 'visible', 
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
  
});

export default TaskDetailScreen;
