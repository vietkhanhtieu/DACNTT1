import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textCenter}>
          <Text style={styles.title}>TIỂU VIỆT KHÁNH</Text>
          <Text style={styles.subtitle}>Số giờ làm tích lũy(01/12-31/12)</Text>
          <Text style={styles.largeText}>24:50</Text>
          <View style={styles.orangeCard}>
            <Text style={styles.smallBold}>THÁNG 12/2023</Text>
            <Text style={styles.smallText}>Ngày làm việc</Text>
            <View style={styles.row}>
              <Text style={styles.smallText}>13</Text>
              <Text style={styles.smallText}>Thứ ba</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.extraSmall}>Check in: 08:00-17:00</Text>
              <Text style={styles.extraSmall}>Check out: 12:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.textCenter}>
            <FontAwesome name="folder-open" size={24} color="red" />
            <Text style={styles.smallText}>Hồ sơ</Text>
          </View>
          <View style={styles.textCenter}>
            <FontAwesome name="file-contract" size={24} color="red" />
            <Text style={styles.smallText}>Hợp đồng</Text>
          </View>
          {/* Repeat for other icons and text */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'orange',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    maxWidth: 300,
  },
  textCenter: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  largeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  orangeCard: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  smallBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extraSmall: {
    fontSize: 8,
    color: 'gray',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Dashboard;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.header}>TIÊU VIẾT KHÁNH</Text>
//         <Text style={styles.subtitle}>Số giờ làm tích lũy (01/12-31/12)</Text>
//         <Text style={styles.time}>24:50</Text>
//         <View style={styles.dateContainer}>
//           <View style={styles.dateInfo}>
//             <Text style={styles.month}>THÁNG 12/2023</Text>
//             <Text style={styles.day}>13</Text>
//             <Text style={styles.weekday}>Thứ ba</Text>
//           </View>
//           <View style={styles.checkTimes}>
//             <Text style={styles.date}>Ngày làm việc</Text>
//             <Text style={styles.checkIn}>Check in: 08:00-17:00</Text>
//             <Text style={styles.checkOut}>Check out: 12:00</Text>
//           </View>
//         </View>
//       </View>
//       <View>
//         <View style={styles.iconsContainer}>
//           {iconData.map((item, index) => (
//             <TouchableOpacity key={index} style={styles.iconButton}>
//               <Icon name={item.icon} size={30} color="#DC2626" />
//               <Text style={styles.iconText}>{item.text}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const iconData = [
//   { icon: 'folder-open', text: 'Hồ sơ' },
//   { icon: 'file-contract', text: 'Hợp đồng' },
//   // Add other icons and texts as per your screenshot
// ];

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   card: {
//     backgroundColor: '#F6A86F',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   header: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 22,
//     color: '#000',
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#000',
//     marginVertical: 8,
//   },
//   time: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 56,
//     color: '#000',
//     marginVertical: 8,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//     padding: 8,
//     borderRadius: 12,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 1,
//     shadowRadius: 3,
//     borderColor: '#000000', 
//     borderWidth: 1, 
//   },
//   month: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//     textAlign: 'center',
//   },
//   date: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#000',
//   },
//   dateInfo: {
//     marginVertical: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   day: {
//     fontSize: 24,
//     color: '#000',
//   },
//   weekday: {
//     fontSize: 24,
//     color: '#000',
//   },
//   checkTimes: {
//     // flexDirection: 'row',
//     // justifyContent: 'space-between',
//   },
//   checkIn: {
//     fontSize: 12,
//     color: '#000',
//   },
//   checkOut: {
//     fontSize: 12,
//     color: '#000',
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginVertical: 8,
//   },
//   iconButton: {
//     alignItems: 'center',
//     width: '48%',
//     marginVertical: 4,
//   },
//   iconText: {
//     marginTop: 4,
//     fontSize: 12,
//     color: '#000',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;


