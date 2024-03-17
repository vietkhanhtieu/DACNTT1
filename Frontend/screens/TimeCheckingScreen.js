import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/UserContext.js';
import { format } from 'date-fns';
import { fetchAPI } from '../apiConfig.js';
import showAlert from '../Services/alertServices.js'; 




const daysOfWeek = [
  'Chủ nhật', // Sunday
  'Thứ hai',  // Monday
  'Thứ ba',   // Tuesday
  'Thứ tư',   // Wednesday
  'Thứ năm',  // Thursday
  'Thứ sáu',  // Friday
  'Thứ bảy'   // Saturday
];

const formatDate = (date) => {
  const day = daysOfWeek[date.getDay()];
  const dayNumber = `0${date.getDate()}`.slice(-2); // Ensure two digits
  const month = `0${date.getMonth() + 1}`.slice(-2); // Ensure two digits and correct for zero-indexed months
  const year = date.getFullYear();
  return `${day} ${dayNumber}/${month}/${year}`;
};

function convertTimeToSeconds(time) {
  const parts = time.split(":");
  return (+parts[0] * 3600) + (+parts[1] * 60) + (+parts[2]);
}

function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function addTimes(time1, time2) {
  const totalSeconds = convertTimeToSeconds(time1) + convertTimeToSeconds(time2);
  return convertSecondsToTime(totalSeconds);
}

const getRemainingTime = (targetHour, targetMinute, targetSecond) => {
  const now = new Date();
  const targetTime = new Date();

  targetTime.setHours(targetHour, targetMinute, targetSecond, 0); // Set target time for today

  const difference = targetTime - now;

  if (difference < 0) {
    // Time has passed for today
    return '00:00:00';
  } else {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

const TimeTrackingScreen = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const currentDate = formatDate(new Date());
  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const navigation = useNavigation();
  const { user } = useUser();
  const [data, setData] = useState({});
  const [tempData, setTempData] = useState();
  const [startTimeOT, setStartTimeOT] = useState(null);
  const [endTimeOT, setEndTimeOT] = useState(null);
  const [sumTimeOT, setSumTimeOT] = useState();


  const difference = (startTime, endTime) => {
    let differenceInMilliseconds = endTime - startTime;
    let differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    let hours = Math.floor(differenceInSeconds / 3600).toString().padStart(2, '0');
    differenceInSeconds = differenceInSeconds % 3600;
    let minutes = Math.floor(differenceInSeconds / 60).toString().padStart(2, '0');
    let seconds = differenceInSeconds % 60;

    return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`ChamCong/GetByDate?maNguoiDung=${user.manguoidung}&startRequest=${format(new Date(), "yyyy-MM-dd")}`);
        setData(data);
        if (data && data.giocheckin) 
        {
          setCheckInTime(new Date(data.giocheckin));
        }
        if (data && data.giocheckout && data.giocheckout != "0001-01-01T00:00:00") {
          const checkOutTime = new Date(data.giocheckout);
          setCheckOutTime(checkOutTime);
          setTempData(difference(new Date(data.giocheckin), new Date(data.giocheckout)))
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
    const fetchDataOT = async () => {
      try {
        const data = await fetchAPI(`OT/GetByDate?maNguoiDung=${user.manguoidung}&startRequest=${format(new Date(), "yyyy-MM-dd")}`);
        if (data && data.giobatdau) 
        {
            setStartTimeOT(new Date(data.giobatdau));
        }
        if (data && data.gioketthuc) 
        {
            setEndTimeOT(new Date(data.gioketthuc));
            
            let differenceInMilliseconds = new Date(data.gioketthuc) - new Date(data.giobatdau);
            console.log(differenceInMilliseconds);
            let differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
            let hours = Math.floor(differenceInSeconds / 3600).toString().padStart(2, '0');
            differenceInSeconds = differenceInSeconds % 3600;
            let minutes = Math.floor(differenceInSeconds / 60).toString().padStart(2, '0');
            let seconds = differenceInSeconds % 60;
    
            setSumTimeOT(`${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchDataOT();
    }, [user.manguoidung]); 


    const handleCheckIn = async () => {
      const currentTime = new Date();
      try {
        const content = await fetchAPI('ChamCong', {
          method: 'POST',
          body: JSON.stringify({
            "maNguoiDung": user.manguoidung,
            "giocheckin": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss"),
            "diachi": "string"
          })
        });
        if (content.success == 1) {
          setCheckInTime(currentTime);
        } else {
          showAlert(content.message);



        }
      } catch (error) {
        console.error('Error during check-in:', error);
      }
    };

    const handleCheckOut = async () => {
      const currentTime = new Date();
      try {
        const content = await fetchAPI('ChamCong', {
          method: 'PUT',
          body: JSON.stringify({
            "maNguoiDung": user.manguoidung,
            "giocheckin": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss"),
            "diachi": "string",
            "giocheckout": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss")
          })
        });
        if (content.success == 1) {
          setCheckOutTime(currentTime);
          setTempData(difference(checkInTime, currentTime));
        } else {
          showAlert(content.message);
        }
      } catch (error) {
        console.error('Error during check-in:', error);
      }
    };

  // const handleCheckOut = () => {
    
  //   const currentTime = new Date();
  //   (async () => {
  //     const response = await fetch('http://10.35.16.127:7218/api/ChamCong', {
  //       method: 'PUT',
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({"maNguoiDung": user.manguoidung, "giocheckin": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss"), "giocheckout": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss"), "diachi": "string"})
            
  //     })
  //     const content = await response.json();
  //     console.log(content);
  //     if(content.success == 1){
  //       setCheckOutTime(currentTime);
  //       setTempData(difference(checkInTime, currentTime));
  //     }
  //   })();
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = `0${now.getHours()}`.slice(-2);
      const minutes = `0${now.getMinutes()}`.slice(-2);
      const seconds = `0${now.getSeconds()}`.slice(-2);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining = getRemainingTime(17, 0, 0); // Set target time to 17:00:00
      setRemainingTime(remaining);
    };

    updateRemainingTime(); // Initial update

    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, []);


  // Calculate remaining time, total hours, etc. based on check-in and check-out times

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Điểm danh</Text>
      </View>
      <View style={styles.timeContainer}>
  
          <View style={styles.timerCircle}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.workingHoursText}>08:00 - 17:00</Text>
            <Text style={styles.timerText}>{currentTime}</Text>
            <Text style={styles.remainingTimeText}>Giờ làm việc còn lại</Text>
            <Text style={styles.remainingTimeValue}>{remainingTime}</Text>
          </View>
      </View>
      <View style={styles.timeDetails}>
        <View style={styles.timeDetailContainer}>
          <Text style={styles.timeDetailLabel}>Thời gian check in:</Text>
          <Text style={styles.timeDetailValue}>{checkInTime ? checkInTime.toLocaleTimeString() : '--:--:--'}</Text>
        </View>
        <View style={styles.timeDetailContainer}>
          <Text style={styles.timeDetailLabel}>Thời gian check out:</Text>
          <Text style={styles.timeDetailValue}>{checkOutTime ? checkOutTime.toLocaleTimeString() : '--:--:--'}</Text>
        </View>
        <View style={styles.timeDetailContainer}>
          <Text style={styles.timeDetailLabel}>Thời gian làm chính thức:</Text>
          <Text style={styles.timeDetailValue}>{tempData ? tempData : '--:--:--'}</Text>
        </View>
        <View style={styles.timeDetailContainer}>
          <Text style={styles.timeDetailLabel}>Thời gian làm OT:</Text>
          <Text style={styles.timeDetailValue}>{sumTimeOT ? sumTimeOT : '--:--:--'}</Text>
        </View>
        {/* <View style={styles.timeDetailContainer}>
          <Text style={styles.timeDetailLabel}>Tổng thời gian làm:</Text>
          <Text style={styles.timeDetailValue}>{addTimes(tempData,sumTimeOT) ? addTimes(tempData,sumTimeOT) : '--:--:--'}</Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut} disabled={!checkInTime}>
          <Text style={styles.buttonText}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  timeContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workingHoursText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#FFD700', // Golden color
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700', // Golden color
  },
  remainingTimeText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
  },
  remainingTimeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  timeDetails: {
    justifyContent: 'center',
    marginLeft: 20,
    padding: 10,
    marginRight: 20,

    
  },
  timeDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  timeDetailsText: {
    justifyContent: 'center',
    marginLeft: 20,
    marginVertical: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    paddingBottom: 20,
  },
  checkInButton: {
    backgroundColor: '#4CAF50', // Green color
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkOutButton: {
    backgroundColor: '#9E9E9E', // Grey color
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimeTrackingScreen;