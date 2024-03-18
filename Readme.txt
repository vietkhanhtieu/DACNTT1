* 2 phần mềm cho project:
- Android Studio (hoặc phần mềm tương đương)                       //để chạy máy ảo (Android)
- Visual Studio Code (hoặc code editor tương đương)                //để chạy code \
=============================================================================================================================================================+


1. Android: Chọn chạy ứng dụng máy ảo
2. Visual Studio Code: Tại cmd của "...\DACNTT\Frontend", ta chạy dòng lệnh "npm i" để cài đặt file, và dùng lệnh "npm start" để chạy đồ án


============================================================================================================================================================
* Cách chạy đồ án (expo) sang file apk:
Visual Studio Code: Tại cmd của "...\DACNTT\Frontend", npm i >  npm install -g eas-cli > eas login (hoặc kiểm tra tài khoản đã đăng nhập là user nào (nếu đã đăng nhập) = lệnh "eas whoami" ) > eas build:configure > npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
> npx expo install --fix > eas build -p android --profile preview (để xuất ra file apk)    //hoặc eas build --platform android (để ra file .aab)

============================================================================================================================================================
Cách đổi địa chỉ ip nhanh

dùng VScode, "Thay thế tất cả" những từ "192.168.204.142", sang địa chỉ ip của bạn (ví dụ của tôi là: "192.168.1.8") 