* 2 phần mềm cho project:
- Android Studio (hoặc phần mềm tương đương)                       //để chạy máy ảo (Android)
- Visual Studio Code (hoặc code editor tương đương)                //để chạy code \
=============================================================================================================================================================+

*Cách chạy đồ án:
1. Android: Chọn chạy ứng dụng máy ảo
2. Visual Studio Code: Tại cmd của "...\DACNTT\Frontend", ta chạy dòng lệnh "npm i" để cài đặt file, và dùng lệnh "npm start" để chạy đồ án


============================================================================================================================================================
* Cách xuất đồ án (expo) sang file apk:
Visual Studio Code: Tại cmd của "...\DACNTT1\Frontend", npm i >  npm install -g eas-cli > eas login (để đăng nhập tài khoản eas)(hoặc nếu đã đăng nhập rồi, thì kiểm tra tài khoản đã đăng nhập là user nào = lệnh "eas whoami" ) 
> eas build:configure rồi chọn "adnroid"> npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
> npx expo install --fix > eas build -p android --profile preview (để xuất ra file apk)    //hoặc eas build --platform android (để ra file .aab)
