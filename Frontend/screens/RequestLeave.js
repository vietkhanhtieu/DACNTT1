import React, { useState }  from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '../components/UserContext.js';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader.js';
import { format } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchAPI } from '../apiConfig.js'; 
import showAlert from '../Services/alertServices.js';




const App = () => {
    const navigation = useNavigation();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [reason, setReason] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
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

    const handleSubmitButton = () => {
        //setErrortext('');
        if (!reason) {
          showAlert("Vui lòng nhập lý do yêu cầu nghỉ phép");

          return;
        }
        //setLoading(true);
        const currentDate = new Date();
        (async () => {
          const response = await fetchAPI('NghiPhep', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"maNguoiDung": user.manguoidung, "ngaybatdau": format(fromDate, "yyyy-MM-dd"), "ngayketthuc": format(toDate, "yyyy-MM-dd"), "lyDo": reason, "trangThai": "Chờ duyệt", "loainghiphep": value, "ngaydangKi": format(currentDate, "yyyy-MM-dd")})
          })
          if(response.success == 1){
            setLoading(false);
            navigation.push('BussinessScreen');
          } 
        })()
    };
    const data = [
        { label: 'Nghỉ lễ', value: 'Nghỉ lễ' },
        { label: 'Nghỉ phép năm', value: 'Nghỉ phép năm' },
        { label: 'Nghỉ tang lễ', value: 'Nghỉ tang lễ' },
        { label: 'Nghỉ bản thân kết hôn', value: 'Nghỉ bản thân kết hôn' },
        { label: 'Nghỉ không lương', value: 'Nghỉ không lương' },
        { label: 'Nghỉ liên quan NVQS', value: 'Nghỉ liên quan NVQS' },
        { label: 'Nghỉ bản thân ốm', value: 'Nghỉ bản thân ốm' },
        { label: 'Nghỉ chăm con ốm', value: 'Nghỉ chăm con ốm' },
        { label: 'Nghỉ thai sản', value: 'Nghỉ thai sản' },
        { label: 'Nghỉ công tác', value: 'Nghỉ công tác' },
        { label: 'Hội nghi, hội thảo', value: 'Hội nghi, hội thảo' },
        { label: 'Tai nạn lao động', value: 'Tai nạn lao động' },
      ];
  return (
    
    <ScrollView style={styles.container}>
 
      <Loader loading={loading} />
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng kí nghỉ phép, công tác</Text>
        <View style={{ width: 20 }} /> 
      </View>
      <View style={styles.content}>
        <View style={styles.warningBox}>
          <Text>Bạn cần nhập đầy đủ các thông tin dưới trước khi lưu</Text>
        </View>
        <View style={styles.inputGroup}>
        <Text style={styles.label}>Loại nghỉ phép (*)</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#EF7720' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Loại nghỉ phép' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
            />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nghỉ từ ngày (*)</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowFromDatePicker(true)}>
            <Text>{fromDate.toLocaleDateString()}</Text>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Đến ngày (*)</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowToDatePicker(true)}>
            <Text>{toDate.toLocaleDateString()}</Text>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lý do(*)</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder=" " multiline={true} numberOfLines={4} onChangeText={(reason) => setReason(reason)} value= {reason}/>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButton}>
          <Icon name="paper-plane" size={20} color="#fff" />
          <Text style={styles.submitButtonText}> Tạo nghỉ phép, công tác</Text>
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
    borderColor: "#EF7720"
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
    borderWidth: 1,
    borderColor: "#EF7720"

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
});

export default App;
