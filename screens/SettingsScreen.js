import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password'
    };
  }

  handleLogout = () => {
    firebase.auth().signOut().then(function () {
      /*this.props.navigation.dispatch(
        NavigationActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({ routeName: "Auth" })]
        }))*/
    }, function (error) {
      // An error happened.
    });
  }


  render() {
    return(
      <View style={styles.container}>
      <Button
        title="Log out"
        onPress={this.handleLogout}
      />
    </View>
    );
  
  }
  //return <ExpoConfigView />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
});

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
