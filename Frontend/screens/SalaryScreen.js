import React, {useState, useEffect  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../components/UserContext.js';
import { fetchAPI } from '../apiConfig.js'; 



const PaySlipScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState({ month: '02', year: '2024' });
  const { user } = useUser();
  const [salaryData, setData] = useState({});


  const fetchData = (maNguoiDung,month, year) => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`Luong/getByMonth?maNguoiDung=${maNguoiDung}&thang=${month}&nam=${year}`);
        setData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const maNguoiDung = user.manguoidung;
    fetchData(maNguoiDung, date.month, date.year);
    }, []);



  
  const DateSelector = ({ date, onIncrement, onDecrement }) => (
    <View style={styles.dateSelector}>
      <TouchableOpacity onPress={onDecrement} style={styles.dateChangeButton}>
        <Text style={styles.dateChangeText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{`${date.month}/${date.year}`}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.dateChangeButton}>
        <Text style={styles.dateChangeText}>+</Text>
      </TouchableOpacity>
    </View>
  );
  
  const incrementMonth = (currentDate) => {
    // Logic to increment month
    const newDate = { ...currentDate };
    if (newDate.month === '12') {
      newDate.month = '01';
      newDate.year = (parseInt(newDate.year, 10) + 1).toString();
    } else {
      let newMonth = parseInt(newDate.month, 10) + 1;
      newDate.month = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    }
    fetchData(user.manguoidung, newDate.month, newDate.year);
    return newDate;
  };
  
  const decrementMonth = (currentDate) => {
    // Logic to decrement month
    const newDate = { ...currentDate };
    if (newDate.month === '01') {
      newDate.month = '12';
      newDate.year = (parseInt(newDate.year, 10) - 1).toString();
    } else {
      let newMonth = parseInt(newDate.month, 10) - 1;
      newDate.month = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    }
    fetchData(user.manguoidung, newDate.month, newDate.year);

    return newDate;
  };
  
  const IncomeSection = ({ salaryData }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Khoản thu</Text>
      <SalaryItem title="Ngày công" value={salaryData.ngaycong} />
      <SalaryItem title="Lương chính" value={salaryData.luongchinh} />
      <SalaryItem title="Lương hiệu quả" value={salaryData.luonghieuqua} />
      <SalaryItem title="Lương ngoài giờ" value={salaryData.luongngoaigio} />
      <SalaryItem title="Phí gửi xe" value={salaryData.phiguixe} />
      <SalaryItem title="Lương thưởng" value={salaryData.luongthuong} />
      <SalaryItem title="Phụ cấp cơm" value={salaryData.phucapcom} />
      <SalaryItem title="Thưởng sinh nhật" value={salaryData.thuongsinhnhat} />
      <SalaryItem title="Tổng thu" value={salaryData.tongthu} isTotal={true} />
    </View>
  );
  
  const DeductionSection = ({ salaryData }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Khoản chi</Text>
      <SalaryItem title="BHXH, YT, TN" value={salaryData.bhxh} />
      <SalaryItem title="Tạm ứng" value={salaryData.bhxh} />
      <SalaryItem title="Thuế thu nhập cá nhân" value={salaryData.thuetncn} />
      <SalaryItem title="Tổng chi" value={salaryData.tongchi} isTotal={true} />
    </View>
  );
  
  const SalaryItem = ({ title, value, isTotal }) => (
    <View style={styles.salaryItem}>
      <Text style={isTotal ? styles.itemTotalTitle : styles.itemTitle}>{title}</Text>
      <Text style={isTotal ? styles.itemTotalValue : styles.itemValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bảng lương</Text>
      </View>
      <DateSelector
        date={date}
        onIncrement={() => setDate(incrementMonth(date))}
        onDecrement={() => setDate(decrementMonth(date))}
      />
      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Lương thực nhận</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>{salaryData.tongthu - salaryData.tongchi}</Text>
        </View>
    </View>
      <IncomeSection salaryData={salaryData} />
      <DeductionSection salaryData={salaryData} />
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    alignSelf: 'center', // This ensures that the DateSelector is centered in its parent
    width: '50%', // This sets the width of the DateSelector to half the width of its parent
    // Adjust padding as needed
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    
  },
  dateChangeButton: {
    padding: 10,
  },
  dateChangeText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  summaryBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#FFA500', // Orange color
    padding: 20,
    
    width: '90%',
  },

  summaryItem: {
    flexDirection: 'row', // This makes the children align horizontally
  },
  summaryText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  salaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemTitle: {
    color: '#000',
    fontSize: 16,
  },
  itemValue: {
    color: '#000',
    fontSize: 16,
  },
  itemTotalTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTotalValue: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateChangeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PaySlipScreen;
