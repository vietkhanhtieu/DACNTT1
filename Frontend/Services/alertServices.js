// alertService.js
import { Alert } from 'react-native';

const showAlert = (message) => {
  Alert.alert(
    "Thông báo", // Tiêu đề mặc định cho tất cả các cảnh báo
    message, // Nội dung thông báo được truyền vào khi hàm được gọi
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

export default showAlert;
