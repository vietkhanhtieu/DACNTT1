import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import HomeScreen from './screens/Home.js'
import LoginScreen from './screens/Login.js'
import Loader from './components/Loader.js'
import SplashScreen from './screens/SplashScreen.js'
import Test from './screens/test.js'
import BussinessScreen from './screens/Bussiness.js'
import ProfileScreen from './screens/Profile.js'
import TimeKeeping from './screens/TimeKeeping.js'
import RequestOTScreen from './screens/RequestOTScreen.js'
import OTScreen from './screens/OTScreen.js'
import DetailScreen from './screens/DetailOTScreen.js'
import RequestLeave from './screens/RequestLeave.js'
import SalaryScreen from './screens/SalaryScreen.js'
import TimeCheckingScreen from './screens/TimeCheckingScreen.js'
import TaskScreen from './screens/TaskScreen.js'
import DetailProjectScreen from './screens/DetailProjectScreen.js'
import ProjectScreen from './screens/ProjectScreen.js'
import AdminHomeScreen from './screens/AdminHomeScreen.js'
import ProfileManagementScreen from './screens/Admin/ProfileManagerScreen.js'
import OTAdminScreen from './screens/Admin/OTAdminscreen.js'
import DetailOTAdminScreen from './screens/Admin/DetailOTAdminScreen.js'
import BussinessAdminScreen from './screens/Admin/BussinessAdminScreen.js'
import DetailBussinessAdminScreen from './screens/Admin/DetailBussinessAdminScreen.js'
import TimeKeepingAdminScreen from './screens/Admin/TimeKeepingAdminScreen.js'
import ProjectAdminScreen from './screens/Admin/ProjectAdminScreen.js'
import CreateTaskScreen from './screens/Admin/CreateTaskScreen.js'
import CreateProjectScreen from './screens/Admin/CreateProjectScreen.js'
import CreateUserScreen from './screens/Admin/CreateUserScreen.js'



import {UserProvider}  from './components/UserContext.js';



const Stack = createStackNavigator();
const App = () => {
  return (
    <UserProvider >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="TestScreen" component={Test} options={{headerShown: false}}/>
          <Stack.Screen name="BussinessScreen" component={BussinessScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
          <Stack.Screen name="TimeKeeping" component={TimeKeeping} options={{headerShown: false}}/>
          <Stack.Screen name="RequestOTScreen" component={RequestOTScreen} options={{headerShown: false}}/>
          <Stack.Screen name="OTScreen" component={OTScreen} options={{headerShown: false}}/>
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}}/>
          <Stack.Screen name="RequestLeave" component={RequestLeave} options={{headerShown: false}}/>
          <Stack.Screen name="SalaryScreen" component={SalaryScreen} options={{headerShown: false}}/>
          <Stack.Screen name="TimeCheckingScreen" component={TimeCheckingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="TaskScreen" component={TaskScreen} options={{headerShown: false}}/>
          <Stack.Screen name="DetailProjectScreen" component={DetailProjectScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProjectScreen" component={ProjectScreen} options={{headerShown: false}}/>
          <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileManagementScreen" component={ProfileManagementScreen} options={{headerShown: false}}/>
          <Stack.Screen name="OTAdminScreen" component={OTAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="DetailOTAdminScreen" component={DetailOTAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="BussinessAdminScreen" component={BussinessAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="DetailBussinessAdminScreen" component={DetailBussinessAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="TimeKeepingAdminScreen" component={TimeKeepingAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProjectAdminScreen" component={ProjectAdminScreen} options={{headerShown: false}}/>
          <Stack.Screen name="CreateTaskScreen" component={CreateTaskScreen} options={{headerShown: false}}/>
          <Stack.Screen name="CreateProjectScreen" component={CreateProjectScreen} options={{headerShown: false}}/>
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{headerShown: false}}/>




        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
      
  );
};
export default App;



