import React, { Component } from 'react';
//import { ScrollView } from 'react-native';
import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar } from 'react-native'
import { ExpoLinksView } from '@expo/samples';
import { Card, Body, Container, Content, Text, Title, Form, Button, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
import firebase from 'firebase';

export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      currentUser: null,
      selected: 'Opción'
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  /*componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      
    }
  }*/


  onValueChange(value) {
    if(value === "opción 2"){
      this.props.navigation.navigate('Home')
    }
    console.log("value " + value)
    this.setState({
      selected: value
    })

  }
  async componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser })

  }



  render() {
    const { currentUser } = this.state
    return (


      <Container style={{
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      }}>
        <Header>
          <Body>
            <Title>Nivel de agua</Title>
          </Body>
          <Right>
            <Form>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="opción 1" value="opción 1" />
                <Picker.Item label="opción 2" value="opción 2" />
                <Picker.Item label="opción 3" value="opción 3" />
              </Picker>
            </Form>
          </Right>
        </Header>

        <Container style={styles.container}>
          <Content >
            <Card >
              <Text>
                Hello {currentUser && currentUser.email}!
                </Text>

            </Card>


          </Content>

        </Container>



        {/*
      
      <ScrollView style={styles.container}>
         <Text> Agregar cosas chingonas aquí</Text>

         </ScrollView>
      */}

      </Container>
    );
  }

}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
