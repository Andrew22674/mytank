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

import { Container, Header, Content, Form, Item, Input } from 'native-base';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      height: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveHeight = this.saveHeight.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    }), ()=>{
      console.log(this.state.height)
    };
    console.log(this.state.height)
  }

  saveHeight(){
    firebase.database().ref('Stats/height').set(parseInt(this.state.height));
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
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item>
              <Input 
              name = "height"
              //value={this.state.height}
              onChangeText={val => this.setState({ height: val })}
              placeholder="Water tank height" />
            </Item>
          </Form>

          <Button
            title= "Save height"
            onPress={this.saveHeight}
          />

          <Button
            title="Log out"
            onPress={this.handleLogout}
          />
        </Content>
      </Container>



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
