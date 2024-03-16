// styles/commonStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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



});