import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { format } from 'date-fns';
import { useUser } from '../components/UserContext.js';
import { fetchAPI } from '../apiConfig.js'; 





const TaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const [previousStatus, setPreviousStatus] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = route.params;
  const { user } = useUser();
  const [reload, setReload] = useState(false);

  const statuses = [
    { key: '0', value: 'Đã phân công' },

    { key: '1', value: 'Đang thực hiện' },
    { key: '2', value: 'Hoàn thành' },
    { key: '-1', value: 'Từ chối' },
  ];
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`CongViec?maCongViec=${id}`);
        const statusObject = statuses.find(status => status.key === `${data.tinhtrangCv}`);
        setStatus(statusObject);
        setTask(data)
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
    
  }, [reload]);

  useEffect(() => {
    if (status.key !== '1') {
      setPreviousStatus(status);
    }
  }, [status]);


  const onCommentPress = (contentToSend) => {
    // Here you would handle the action when the comment button is pressed.
    // For example, open a modal to add a comment.
    (async () => {
      const currentTime = new Date();
      const response = await fetchAPI('BinhLuan', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"macongviec": id, "manguoidung": user.manguoidung, "thoigian": format(currentTime, "yyyy-MM-dd'T'HH:mm:ss"), "noidung": contentToSend})
      })
  

      if(response.success == 1){
          setReload(!reload);
      } 
    })()
    setComment('');

  };

  const updateStatus = (newStatusKey) => {
    (async () => {
      const currentTime = new Date();
      const response = await fetchAPI('CongViec/Update', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"macongviec": id, "tinhtrangCv": parseInt(newStatusKey)})
      })
    })()
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>{task.tenCv}</Text>
            </View>
            <TouchableOpacity style={styles.status} onPress={() => setDropdownVisible(true)}>
                <Text style={styles.statusText}>Trong danh sách: {status.value}</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={dropdownVisible}
                onRequestClose={() => setDropdownVisible(false)}
            >
            <TouchableOpacity
                style={styles.dropdownOverlay}
                onPress={() => setDropdownVisible(false)}
            >
                <View style={styles.dropdown}>
                    {statuses.map((statusItem, index) => (
                      <TouchableOpacity
                          key={statusItem.key}
                          style={styles.dropdownItem}
                          onPress={() => {
                          const newStatus = statusItem.value; // Trạng thái mới được chọn
                          const oldStatus = status.value; // Trạng thái hiện tại trước khi thay đổi
                          setStatus(statusItem);
                          setDropdownVisible(false);
                          const contentToSend = `${user.hoten}: đã duy chuyển thẻ từ danh sách ${oldStatus} đến danh sách ${statusItem.value}`;
                          onCommentPress(contentToSend);
                          updateStatus(statusItem.key);
                          }}
                      >
                      <Text style={styles.dropdownText}>{statusItem.value}</Text>
                    </TouchableOpacity>
                    ))}
                  </View>
            </TouchableOpacity>
      </Modal>
        </View>
        <View style={styles.card}>
            <View style={styles.headerSection}>
                <Text style={styles.description}>{task.motaCv}</Text>
            </View>
            <View style={styles.detailsSection}>
                <View style={styles.detailContainer}>
                    <Icon name="clock-o" size={24} color="#000" style={styles.iconStyle} />
                    <Text style={styles.detail}>Ngày bắt đầu: {task.ngaybatdauCv}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Icon name="clock-o" size={24} color="#000" style={styles.iconStyle} />
                    <Text style={styles.detail}>Ngày hết hạn: {task.ngayketthucCv}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Icon name="user" size={24} color="#000" style={styles.iconStyle} />
                    <Text style={styles.detail}>Thành viên: {task.nguoiDungs}</Text>
                </View>
            </View>
            <Text style={styles.activityHeader}>Hoạt động</Text>
              {task.binhluans && task.binhluans.length > 0 ? (
                    task.binhluans.map((activity) => (
                      <View key={activity.maBinhLuan} style={styles.activity}>
                        <Text style={styles.activityText}>{activity.noidung}</Text>
                        <Text style={styles.timestamp}>{format(activity.thoigian, "HH:mm dd-MM-yyy")}</Text>
                      </View>
                      ))
                        ) : (
                          <Text>Không có hoạt động nào.</Text>
                        )}
            <TextInput
                  style={styles.comment}
                  onChangeText={setComment}
                  onSubmitEditing={() => onCommentPress(user.hoten.concat(': ', comment))}
                  placeholder="Thêm bình luận"
                  value={comment}
                  returnKeyType="send" // Thiết lập nút return trên bàn phím để hiển thị "Gửi" hoặc tương tự
                  blurOnSubmit={false} // Giữ cho bàn phím không tự động ẩn nếu bạn muốn người dùng tiếp tục nhập
            />
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    backgroundColor: '#F6A86F',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
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
    // Remove marginLeft if it's causing the title to not align with backButton
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
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow properties for Android
    elevation: 3,
  },
  headerSection: {
    borderBottomWidth: 1,
    borderColor: '#EF7720',
    paddingBottom: 16,
    marginBottom: 16,
    
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#EF7720',
    padding: 12,
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
    borderColor: '#EF7720',
    padding: 12,
    marginBottom: 8,
  },
  iconStyle: {
    marginRight: 8,
    size: 18, 
  },
  detail: {
    fontSize: 16,
    lineHeight: 20,
  },
  activitySection: {
    marginBottom: 16,
    
  },
  activityHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    
  },
  activity: {
    marginBottom: 8,
  },
  activityText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 14,
    color: '#999',
  },
  comment: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },

});

export default TaskDetailScreen;
