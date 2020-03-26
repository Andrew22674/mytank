import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

import { Container, Header, Card, CardItem, Body, Left, Content, Form, Item, Input, Row, Thumbnail, Icon, Text } from 'native-base';

export default class DataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      height: 0,
      percentage: 0,
      date: null,
      capacity: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveHeight = this.saveHeight.bind(this);
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

  saveHeight() {
    firebase.database().ref('Stats/height').set(parseInt(this.state.height));
  }

  componentDidMount() {
    firebase.database().ref('/Stats/').on('value', (snapshot) => {
      var sensordata = (snapshot.val() && snapshot.val().sensordata) || 0;
      //var alert = (snapshot.val() && snapshot.val().alertpercentage) || 0;
      var tankheight = (snapshot.val() && snapshot.val().height) || 0;
      var sensordistance = (snapshot.val() && snapshot.val().sensordistance) || 0;
      console.log("sensor data " + sensordata);
      var calcdata = sensordata - sensordistance;
      var dist = tankheight - calcdata;
      var perc = (dist / tankheight) * 100;
      var fdate = ((snapshot.val() && snapshot.val().fulldate) || 0);
      var cap = (snapshot.val() && snapshot.val().capacity) || 0;

      var date2 = (fdate.toString()).split("T");
      var finaldate = date2[0];

      //console.log("final date: " + finaldate);

      /*if(perc > 95){
         // firebase.database().ref('Stats/fulldate').set(firebase.database.ServerValue.TIMESTAMP);
          console.log("Tank is almost full")
          firebase.database().ref('Stats').set(({fulldate: new Date()}));
      }*/
      /* if (perc > 95) {
           console.log("true")
           firebase.database().ref('Stats').update(({ fulldate: new Date() }));
       } else {
           console.log("false")
       }*/
      this.setState({
        percentage: perc,
        date: finaldate,
        capacity: cap
      })
    });

  }


  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={{ flex: 0, padding: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Body>
                  <Text>Water level percentage</Text>
                  <Text note>{this.state.percentage}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, padding: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Body>
                  <Text>Tank current water level in gallons</Text>
                  <Text note>{(this.state.capacity) * (this.state.percentage / 100)}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, padding: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Body>
                  <Text>Last time tank was full</Text>
                  <Text note>{this.state.date}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          {
            /*
                      <CardItem>
                        <Left>
                          <Text>
                            asdsd
                            </Text>
                        </Left>
                      </CardItem>
          
          
            */
          }



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

DataScreen.navigationOptions = {
  title: 'Data',
};
