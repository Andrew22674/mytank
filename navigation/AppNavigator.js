import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';


//const AuthStack = createStackNavigator({ LogIn: LoginScreen });
const AuthStack = createStackNavigator({Login: LoginScreen, SignUp:SignUpScreen})

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: MainTabNavigator,
    
  },
  {
    initialRouteName: 'AuthLoading',
  }
  ));
