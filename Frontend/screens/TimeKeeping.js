import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useUser } from '../components/UserContext.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { fetchAPI } from '../apiConfig.js'; 




const TimeKeeping = ({route}) => {
    const { user } = useUser();
    const {id} = route.params;
    const [timeKeepingData, settTimeKeepingData] = useState([]);
    const [earlyMinutes , setEarlyMinutes] = useState(0);
    const [lateMinutes, setlateMinutes] = useState(0);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const date = new Date();
    const startDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const [fromDate, setFromDate] = useState(startDayOfMonth);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const [toDate, setToDate] = useState(lastDayOfMonth);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [reload, setReload] = useState(false);
    const [weekdaysCount, setWorkdayCount] = useState();
    useEffect(() =>{
      const fetchData = async () => {
        try {
          const data = await fetchAPI(`ChamCong/getChamCong?maNguoiDung=${id}&startRequest=${format(fromDate, "yyyy-MM-dd") }&endRequest=${format(toDate, "yyyy-MM-dd")}`);
          settTimeKeepingData(data.sort((a, b) => b.madiemdanh - a.madiemdanh));
          let earlierMinutes = 0;
          let laterMinutes = 0;
          data.map((item, index) => {
                  let dateCheckin = new Date(item.giocheckin);
                  let formattedTimeCheckin = dateCheckin.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                  let comparisonDate = new Date();
                  comparisonDate.setHours(8, 0, 0, 0); // Set time to 18:00
                  let formattedComparisonTime = comparisonDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                  if (formattedTimeCheckin > formattedComparisonTime) {
                      earlierMinutes += (dateCheckin.getHours() * 60 + dateCheckin.getMinutes()) - (comparisonDate.getHours() * 60 + comparisonDate.getMinutes());               
                  }
                  let dateCheckout = new Date(item.giocheckout);
                  let formattedTimeCheckout = dateCheckout.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                  let comparisonDateCheckout = new Date();
                  comparisonDateCheckout.setHours(17, 0, 0, 0); // Set time to 18:00
                  let formattedComparisonTimeCheckout = comparisonDateCheckout.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                  if (formattedTimeCheckout < formattedComparisonTimeCheckout) {
                      laterMinutes += (comparisonDateCheckout.getHours() * 60 + comparisonDateCheckout.getMinutes()) - (dateCheckout.getHours() * 60 + dateCheckout.getMinutes());
                  }
      
                })
                setlateMinutes(laterMinutes);
                setEarlyMinutes(earlierMinutes);
                const date = new Date();
                const weekdaysCount1 = getWeekdaysInMonth(parseInt(format(date, "yyyy"), 10),parseInt(format(date, "MM"), 10) - 1)
                setWorkdayCount(weekdaysCount1);
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };
      fetchData();
    }, [reload]);


    const handleFromDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || fromDate;
      setShowFromDatePicker(Platform.OS === 'ios');
      setFromDate(currentDate);
      setReload(!reload);
    };
  
    const handleToDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || toDate;
      setShowToDatePicker(Platform.OS === 'ios');
      setToDate(currentDate);
      setReload(!reload);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setReload(!reload);
        setRefreshing(false);
    
    }, [user.manguoidung]);


    function getWeekdaysInMonth(year, month) {
      let weekdaysCount = 0;
      const date = new Date(year, month, 1);
      while (date.getMonth() === month) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          weekdaysCount++;
        }
        date.setDate(date.getDate() + 1);
      }
      return weekdaysCount;
    }
    return (
        <ScrollView style={styles.container} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Thống kê Chấm công</Text>
          </View>
    
          <View style={styles.dateContainer}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Từ ngày</Text>             
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowFromDatePicker(true)}>
                  <Text>{format(fromDate, "dd-MM-yyyy")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setShowFromDatePicker(true)}>
                    <Icon name="calendar" size={20} color="#000" />
                  </TouchableOpacity>
                  {showFromDatePicker && (
                    <DateTimePicker
                      value={fromDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={handleFromDateChange}
                      maximumDate={new Date(2300, 10, 20)}
                      minimumDate={new Date(1950, 0, 1)}
                    />
                  )}
            </View>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Đến ngày</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowToDatePicker(true)}>
                  <Text>{format(toDate, "dd-MM-yyyy")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setShowToDatePicker(true)}>
                    <Icon name="calendar" size={20} color="#000" />
                  </TouchableOpacity>
                  {showToDatePicker && (
                    <DateTimePicker
                      value={toDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={handleToDateChange}
                      maximumDate={new Date(2300, 10, 20)}
                      minimumDate={new Date(1950, 0, 1)}
                    />
                  )}
            </View>
          </View>
    
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, styles.late]}>
              <FontAwesome5 name="times-circle" size={30} color="#db2828" />
              <Text style={[styles.statText, styles.lateText]}>Đi trễ (p)</Text>
              <Text style={styles.statNumber}>{earlyMinutes}</Text>
            </View>
            <View style={[styles.statBox, styles.earlyLeave]}>
              <FontAwesome5 name="exclamation-circle" size={30} color="#fbbd08" />
              <Text style={[styles.statText, styles.earlyLeaveText]}>Về sớm (p)</Text>
              <Text style={styles.statNumber}>{lateMinutes}</Text>
            </View>
            <View style={[styles.statBox, styles.workDay]}>
              <FontAwesome5 name="business-time" size={30} color="#2185d0" />
              <Text style={[styles.statText, styles.workDayText]}>Ngày công (n)</Text>
              <Text style={styles.statNumber}>{weekdaysCount}</Text>
            </View>
          </View>
    
          <View style={styles.table}>
            <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>stt</Text>
            <Text style={styles.tableHeaderText}>Điểm danh</Text>
            <Text style={styles.tableHeaderText}>Đăng xuất</Text>
            </View>
            {timeKeepingData.map((item, index) => {
                let dateCheckin = new Date(item.giocheckin);
                let formattedDateCheckin = dateCheckin.toLocaleDateString('en-GB');
                let formattedTimeCheckin = dateCheckin.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                let dateCheckout = new Date(item.giocheckout);
                let formattedDateCheckout = dateCheckout.toLocaleDateString('en-GB');
                let formattedTimeCheckout = dateCheckout.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                return (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{index + 1}</Text>
                        <Text style={styles.tableRowText}>{`${formattedDateCheckin} ${formattedTimeCheckin}`}</Text>
                        <Text style={styles.tableRowText}>{`${formattedDateCheckout} ${formattedTimeCheckout}`}</Text>
                    </View>
                );
            })}
      </View>
        </ScrollView>
      );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 16,
    color: '#000',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#f2711c',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  late: {
    backgroundColor: '#ffcccb',
  },
  earlyLeave: {
    backgroundColor: '#ffffcc',
  },
  workDay: {
    backgroundColor: '#b3d9ff',
  },
  statText: {
    marginTop: 5,
    fontSize: 16,
  },
  lateText: {
    color: '#db2828',
  },
  earlyLeaveText: {
    color: '#fbbd08',
  },
  workDayText: {
    color: '#2185d0',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlign: 'center', // Center the text in the header
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableRowText: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center', // Center the text in the row
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
});

export default TimeKeeping;
