import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { fetchAPI } from '../apiConfig.js'; 
import { useUser } from '../components/UserContext.js';
import Loader from '../components/Loader.js';
import showAlert from '../Services/alertServices.js';


const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const {id} = route.params;
  const {user} = useUser();
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`Nguoidung/${id}`);
        setData(data);
        setFormData({
          manguoidung: data.manguoidung,
          hoten: data.hoten,
          ngaysinh: data.ngaysinh,
          gioitinh: data.gioitinh == 1 ? 'Nam' : 'Nữ',
          cangcuoccongdan: data.cangcuoccongdan,
          ngaycap: data.ngaycap,
          noicap: data.noicap,
          dantoc: data.dantoc,
          tongiao: data.tongiao,
          honnhan: data.ngaysinh,
          hocvan: data.hocvan,
          sodienthoai: data.sodienthoai,
          emailcanhan: data.emailcanhan,
          emailcongty: data.emailcongty,
          diachi: data.diachi,
          matkhau: data.matkhau,
          chucvu: data.chucvu,
          quoctich: data.quoctich,
          avatar: data.avatar,
        });
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();

  },[id,reload])
  const dataUser = [
    { key: 'ngaysinh', label: 'Ngày sinh', placeholder: 'Ngày sinh' },
    { key: 'gioitinh', label: 'Giới tính', placeholder: 'Giới tính' },
    { key: 'ngaycap', label: 'Ngày cấp', placeholder: 'Ngày cấp' },
    { key: 'sodienthoai', label: 'Điện thoại', placeholder: 'Điện thoại' },
    { key: 'cangcuoccongdan', label: 'Căn cước công dân', placeholder: 'Căn cước công dân' },
    { key: 'noicap', label: 'Nơi cấp', placeholder: 'Nơi cấp' },
    { key: 'dantoc', label: 'Dân tộc', placeholder: 'Dân tộc' },
    { key: 'tongiao', label: 'Tôn giáo', placeholder: 'Tôn giáo' },
    { key: 'honnhan', label: 'Hôn nhân', placeholder: 'Hôn nhân' },
    { key: 'hocvan', label: 'Học vấn', placeholder: 'Học vấn' },
    { key: 'emailcanhan', label: 'Email cá nhân', placeholder: 'Email cá nhân' },
    { key: 'emailcongty', label: 'Email công ty', placeholder: 'Email công ty' },
    { key: 'diachi', label: 'Địa chỉ thường trú', placeholder: 'Địa chỉ thường trú' },
  ];

  const handleInputChange = (keyField, value) => {
    setFormData(prevFormData => ({
      ...prevFormData, // Giữ nguyên các trường khác
      [keyField]: value, // Cập nhật chỉ trường hiện tại
    }));
  };

  const convertGenderToNumber = (gender) => {
    return gender === 'Nam' ? 1 : 0;
  };

  const updateUserProfile = async () => {
    if(user.chucvu != "admin"){
      showAlert("Bạn không có quyền thực hiện chức năng này");
      return;
    }
    const payload = {
      ...formData,
      gioitinh: convertGenderToNumber(formData.gioitinh),
    };
    try {
      setLoading(true);
      const response = await fetchAPI('Nguoidung/update', {
        method: 'POST',
        body: JSON.stringify(payload),
      }) 
      if(response.success == 1){
        setReload(!reload);
        setTimeout(() => {
          setLoading(false); // Sẽ được thực thi sau 1 giây
        }, 2000); // 1000 mili giây = 1 giây
        showAlert("Cập nhật thông tin thành công");

      } 
      else{
        console.log("Error updating user profile: ", response.message);
        setTimeout(() => {
          setLoading(false); // Sẽ được thực thi sau 1 giây
        }, 2000); // 1000 mili giây = 1 giây
        showAlert("Cập nhật thông tin không thành công");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
};
  return (
    <ScrollView style={styles.container}>
      <Loader loading={loading} /> 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URI
        />
        <Text style={styles.profileName}>{data.hoten}</Text>
      </View>
      <View style={styles.form}>
      {dataUser.map((request, index) => (
        <ProfileField
          key={index}
          keyField={request.key}
          label={request.label}
          placeholder={request.placeholder}
          onChange={handleInputChange}
          formData={formData} // Truyền formData như một prop
        />
      ))}
      </View>
      <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.addButton} onPress={updateUserProfile}>
              <Text style={styles.addButtonText}>cập nhật tài khoản</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const ProfileField = ({ keyField, label, placeholder, onChange, formData }) => (
  <View style={styles.profileField}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={styles.fieldInput}
      placeholder={placeholder}
      placeholderTextColor="#A1A1A1"
      value={formData[keyField]} // Lấy giá trị từ formData thông qua props
      onChangeText={(text) => onChange(keyField, text)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 60,
    backgroundColor: '#F6A86F',
  },
  backButton: {
    position: 'absolute',
    top: 50, // Adjust the position as needed
    left: 10, // Adjust the position as needed
    zIndex: 10, // Make sure this is above all other view elements
    padding: 8
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E2E8F0',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 20,
  },
  profileField: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#EF7720',
    marginBottom: 5,
  },
  fieldInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
  sectionContainer: {
    margin: 10,
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

export default ProfileScreen;
