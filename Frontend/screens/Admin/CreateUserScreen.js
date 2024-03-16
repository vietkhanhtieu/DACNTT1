import React, { useState }  from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchAPI } from '../../apiConfig.js'; 



const App = () => {
    const navigation = useNavigation();
    const [showbirthdayPicker, setShowbirthdayPicker] = useState(false);
    const [showngayCapPicker, setShowngayCapPicker] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [userName, setUserName] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [rule, setRule] = useState(false);
    const [birthday, setbirthday] = useState(new Date());
    const [sex, setSex] = useState(false);
    const [avata, setavata] = useState(false);
    const [emailUser, setemailUser] = useState(false);
    const [phone, setphone] = useState(false);
    const [cccd, setCccd] = useState(false);
    const [ngayCap, setngayCap] = useState(new Date());
    const [noiCap, setnoiCap] = useState(false);
    const [address, setaddress] = useState(false);
    const [country, setcountry] = useState(false);
    const [tonGiao, settonGiao] = useState(false);
    const [hocVan, setHocVan] = useState(false);
    const [dantoc, setDanToc] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const handlebirthdayChange = (event, selectedDate) => {
      const currentDate = selectedDate || birthday;
      setShowbirthdayPicker(Platform.OS === 'ios');
      setbirthday(currentDate);
    };
  
    const handlengayCapChange = (event, selectedDate) => {
      const currentDate = selectedDate || ngayCap;
      setShowngayCapPicker(Platform.OS === 'ios');
      setngayCap(currentDate);
    };

    const handleSubmitButton = async () => {
      try {
        const response = await fetchAPI('Nguoidung', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "hoten": userName,
            "ngaysinh": format(birthday, "yyyy-MM-dd"),
            "gioitinh": sex === 'Nam' ? 1 : 0,
            "ngaycap": format(ngayCap, "yyyy-MM-dd"),
            "noicap": noiCap,
            "quoctich": country,
            "dantoc": dantoc,
            "tongiao": tonGiao,
            "chucvu": rule,
            "hocvan": hocVan,
            "emailcongty": email,
            "emailcanhan": emailUser,
            "sodienthoai": phone,
            "diachi": address,
            "matkhau": password,
            "avatar": "",
            "cangcuoccongdan": cccd,
          }),
        });
        if (response.success == 1) {
          navigation.navigate('ProfileManagementScreen');
        } else {
          console.log('Error or something else', response);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    const rules = [
        { label: 'Nhân viên lập trình', value: 'Nhân viên lập trình' },
        { label: 'Nhân viên thiết kế', value: 'Nhân viên thiết kế' },
        { label: 'Trưởng phòng kinh doanh', value: 'Trưởng phòng kinh doanh' },
        { label: 'Nhân viên kinh doanh', value: 'Nhân viên kinh doanh' },
        { label: 'Nhân viên kỹ thuật', value: 'Nhân viên kỹ thuật' },
        { label: 'Nhân viên kế toán', value: 'Nhân viên kế toán' },
        { label: 'Nhân viên nhân sự', value: 'Nhân viên nhân sự' },
        { label: 'Nhân viên hành chính', value: 'Nhân viên hành chính' },
        { label: 'Nhân viên marketing', value: 'Nhân viên marketing' },
        { label: 'Chuyên viên phân tích', value: 'Chuyên viên phân tích' },

      ];
      const sexs = [
        { label: 'Nam', value: 'Nam' },
        { label: 'Nữ', value: 'Nữ' },
      
      ];
  return (
    
    <ScrollView style={styles.container}>
 
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tạo nhân viên</Text>
        <View style={{ width: 20 }} /> 
      </View>
      <View style={styles.content}>
        <View style={styles.warningBox}>
          <Text>Bạn cần nhập đầy đủ các thông tin dưới trước khi lưu</Text>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên nhân viên(*)</Text>
            <TextInput style={styles.input} placeholder="Tên nhân viên" onChangeText={(userName) => setUserName(userName)} value= {userName}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Email nhân viên(*)</Text>
            <TextInput style={styles.input} placeholder="Email nhân viên" onChangeText={(email) => setEmail(email)} value= {email}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Email cá nhân(*)</Text>
            <TextInput style={styles.input} placeholder="Email cá nhân" onChangeText={(emailUser) => setemailUser(emailUser)} value= {emailUser}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu(*)</Text>
            <TextInput style={styles.input} placeholder="Mật khẩu" onChangeText={(password) => setPassword(password)} value= {password}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Vai trò (*)</Text>
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#EF7720' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={rules}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Vai trò' : '...'}
                searchPlaceholder="Search..."
                value={rule}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setRule(item.value);
                    setIsFocus(false);
                }}
                />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ngày sinh (*)</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowbirthdayPicker(true)}>
            <Text>{birthday.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowbirthdayPicker(true)}>
            <Icon name="calendar" size={20} color="#000" />
          </TouchableOpacity>
          {showbirthdayPicker && (
            <DateTimePicker
              value={birthday}
              mode="datetime"
              display='default'
              is24Hour={true}
              onChange={handlebirthdayChange}
        
            />
          )}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Giới tính (*)</Text>
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#EF7720' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={sexs}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Giới tính' : '...'}
                searchPlaceholder="Search..."
                value={sex}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSex(item.value);
                    setIsFocus(false);
                }}
                />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại(*)</Text>
            <TextInput style={styles.input} placeholder="Số điện thoại" onChangeText={(phone) => setphone(phone)} value= {phone}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Căng cước công dân(*)</Text>
            <TextInput style={styles.input} placeholder="Căng cước công dân" onChangeText={(cccd) => setCccd(cccd)} value= {cccd}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày cấp (*)</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowngayCapPicker(true)}>
                <Text>{ngayCap.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setShowngayCapPicker(true)}>
                <Icon name="calendar" size={20} color="#000" />
            </TouchableOpacity>
            {showngayCapPicker && (
                <DateTimePicker
                value={ngayCap}
                mode="datetime"
                display='default'
                is24Hour={true}
                onChange={handlengayCapChange}
            
                />
          )}
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Nơi cấp(*)</Text>
            <TextInput style={styles.input} placeholder="Nơi cấp" onChangeText={(noiCap) => setnoiCap(noiCap)} value= {noiCap}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Dân tộc(*)</Text>
            <TextInput style={styles.input} placeholder="Dân tộc" onChangeText={(dantoc) => setDanToc(dantoc)} value= {dantoc}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Tôn giáo(*)</Text>
            <TextInput style={styles.input} placeholder="Tôn giáo" onChangeText={(tonGiao) => settonGiao(tonGiao)} value= {tonGiao}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Học vấn(*)</Text>
            <TextInput style={styles.input} placeholder="Học vấn" onChangeText={(hocVan) => setHocVan(hocVan)} value= {hocVan}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Địa chỉ thường trú(*)</Text>
            <TextInput style={styles.input} placeholder="Địa chỉ thường trú" onChangeText={(address) => setaddress(address)} value= {address}></TextInput>
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Quốc tịch(*)</Text>
            <TextInput style={styles.input} placeholder="Quốc tịch" onChangeText={(country) => setcountry(country)} value= {country}></TextInput>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButton}>
          <Icon name="paper-plane" size={20} color="#fff" />
          <Text style={styles.submitButtonText}> Tạo nhân viên</Text>
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
