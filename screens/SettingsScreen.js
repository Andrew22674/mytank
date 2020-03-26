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
      s_height: 0,
      s_alertperc: 90,
      s_capacity: 0,
      s_sensordistance: 0,
      height: 0,
      alertperc: 0,
      capacity: 0,
      sensordistance:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveStuff = this.saveStuff.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    }), () => {
      console.log(this.state.height)
    };
    console.log(this.state.height)
  }

  saveStuff() {
    this.state.height <= 0 ? firebase.database().ref('Stats/height').set(parseInt(this.state.s_height)) : 
    firebase.database().ref('Stats/height').set(parseInt(this.state.height));
    
    this.state.alertperc <= 0 || this.state.alertperc > 100 ? firebase.database().ref('Stats/alertpercentage').set(parseInt(this.state.s_alertperc)):
    firebase.database().ref('Stats/alertpercentage').set(parseInt(this.state.alertperc));

    this.state.capacity <= 0 ? firebase.database().ref('Stats/capacity').set(parseInt(this.state.s_capacity)):
    firebase.database().ref('Stats/capacity').set(parseInt(this.state.capacity));

    this.state.sensordistance < 0 ? firebase.database().ref('Stats/sensordistance').set(parseInt(this.state.s_sensordistance)):
    firebase.database().ref('Stats/sensordistance').set(parseInt(this.state.sensordistance));
    
  }

  componentDidMount() {
    firebase.database().ref('/Stats/').once('value').then((snapshot) => {
      var alertperc = (snapshot.val() && snapshot.val().alertpercentage) || 0;
      var tankheight = (snapshot.val() && snapshot.val().height) || 0;
      var cap = (snapshot.val() && snapshot.val().capacity) || 0;
      var sensordistance = (snapshot.val() && snapshot.val().sensordistance) || 0;
      this.setState({
        s_alertperc: alertperc,
        s_height: tankheight,
        s_capacity: cap,
        s_sensordistance:sensordistance
      })
    })
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
          <Text>
            Distance from bottom to highest water level on your tank (cm)
          </Text>
          <Form style={{ padding: 20 }}>
            <Item>
              <Input
                name="height"
                //value={this.state.height}
                onChangeText={val => this.setState({ height: val })}
                placeholder={(this.state.s_height).toString()} />
            </Item>
          </Form>
          <Text>
            Distance from sensor to highest water point
          </Text>
          <Form style={{ padding: 20 }}>
            <Item>
              <Input
                name="height"
                //value={this.state.height}
                onChangeText={val => this.setState({ sensordistance: val })}
                placeholder={(this.state.s_sensordistance).toString()} />
            </Item>
          </Form>
          <Text>
            Send alert when reaching a certain percentage
          </Text>
          <Form style={{ padding: 20 }}>
            <Item>
              <Input
                name="alertperc"
                //value={this.state.height}
                onChangeText={val => this.setState({ alertperc: val })}
                placeholder= {(this.state.s_alertperc).toString()} />
            </Item>
          </Form>
          <Text>
            Your tank capacity in galons
          </Text>
          <Form style={{ padding: 20 }}>
            <Item>
              <Input
                name="capacity"
                //value={this.state.height}
                onChangeText={val => this.setState({ capacity: val })}
                placeholder= {(this.state.s_capacity).toString()} />
            </Item>
          </Form>


          <Button style={{ padding: 20}}
            title="OK"
            onPress={this.saveStuff}
          />

        </Content>
        <View style={{ paddingBottom: 30 }}>
          <Button 
            title="Log out"
            onPress={this.handleLogout}
          />
        </View>
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
