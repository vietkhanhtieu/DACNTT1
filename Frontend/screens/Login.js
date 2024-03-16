import React, { useState, createRef, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Loader from '../components/Loader.js';
import {LinearGradient} from 'expo-linear-gradient';
import {useUser} from '../components/UserContext.js';
import { fetchAPI } from '../apiConfig.js'; 



// export default function Login() {
const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const { setUser } = useUser();

    const handleSubmitButton = () => {
      setErrortext('');
      if (!username) {
        alert('Vui lòng nhập email');
        return;
      }
      if (!password) {
        alert('Vui lòng nhập mật khẩu');
        return;
      }
      setLoading(true);
      const login = async (username, password) => {
        try {
          const loginResponse = await fetchAPI('Nguoidung/login', {
            method: 'POST',
            body: JSON.stringify({ "email": username, "password": password })
          })
          setLoading(false); //
          if (loginResponse.success == 1) {
            await getUserInfo(username);

          } else {
            alert('Đăng nhập không thành công');
          }
        } catch (error) {
          console.error('Error during login:', error);
          setLoading(false); 
        }
      };

      const getUserInfo = async (username) => {
        try {
          const data = await fetchAPI(`Nguoidung?email=${username}`);
          setUser(data);
          if (data.chucvu === "admin") {
            navigation.replace('AdminHomeScreen');
          } else {
            navigation.replace('HomeScreen');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      login(username, password);
      };
    
    return (
      
      <LinearGradient colors={["#FFEFBA", "#FFFFFF"]} style={styles.container}>       
        <Loader loading={loading} /> 
       
        <View style={styles.inputContainer}>
          <FontAwesome style={styles.inputIcon} name="user" size={20} color="#F24E1E"/>
          <TextInput
              style={styles.input}
              placeholder="Email nhân viên"
              onChangeText={(username) => setUsername(username)}
              value={username}
          />
        </View>

       
        <View style={styles.inputContainer}>
        <FontAwesome style={styles.inputIcon} name="lock" size={20} color="#F24E1E"/>
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            placeholder="Mật khẩu"
            value={password}
            secureTextEntry
          />
        </View>
        <View style={styles.savePassword}>
          <CheckBox style={styles.checkBox}
            title='Ghi nhớ mật khẩu'
            checked={rememberPassword}
            onPress={() => setRememberPassword(!rememberPassword)}
            containerStyle={styles.checkBox}
          />
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={ handleSubmitButton}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    
  },

  button: {
    backgroundColor: '#EF7720',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2, // Độ dày của viền
    borderColor: '#000000', // Màu sắc của viền

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  savePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#EF7720',
  },

  checkBox: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginLeft: -7,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1, // Độ dày của viền
    marginBottom: 10,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      fontSize: 16,
      fontWeight: '400',
  },

})
