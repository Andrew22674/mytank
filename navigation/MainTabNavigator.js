import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';
//import StoresScreen from '../screens/StoresScreen';
import WaterLevelScreen from '../screens/WaterLevelScreen';
import DataScreen from '../screens/DataScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  
});

/*const SignUpStack = createStackNavigator(
  {
    SingUp: SignUpScreen
  },
  config
);

SignUpStack.navigationOptions = {
  tabBarLabel: 'SignUp',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

SignUpStack.path = '';
*/
const HomeStack = createStackNavigator(
  {
    Home: MainScreen,
    WaterLevel: WaterLevelScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    WaterLevel: WaterLevelScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Tanque',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-information'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,

  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const DataStack = createStackNavigator(
  {
    Data: DataScreen,

  },
  config
);

DataStack.navigationOptions = {
  tabBarLabel: 'Data',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  DataStack,
  SettingsStack,
  //SignUpStack
});



tabNavigator.path = '';

export default tabNavigator;
