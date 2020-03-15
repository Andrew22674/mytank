import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';

import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar } from 'react-native';
import { Card, Body, Container, Content, Text, Title, Form, Button, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
export default class WaterLevelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Email',
            password: 'Password',
            switchValue: false
        };
        this.onValueChange = this.onValueChange.bind(this);
    }


    onValueChange(value) {
        if (value === "opción 2") {
            this.props.navigation.navigate('Home')
        }
        console.log("value " + value)
        this.setState({
            selected: value
        })

    }

    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value });
        //state changes according to switch
        //which will result in re-render the text
      };

    render() {
        return (
            <Container style={{
                paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
            }}>
                <Header>
                    <Body>
                        <Title>Métricas del tanque</Title>
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
                <Content style = {styles.container}>
                    <Row>
                        
                        

                           {/*
                           <Button onPress = {()=> this.props.navigation.goBack()}>
                            <Text>Go back</Text>
                            </Button>
                        */} 
                        

                            <Image style ={{height: 80}}

                            
                            source={
                                //__DEV__
                                require('../assets/images/mediumTank.png')
                            }
                            
                            
                            resizeMode="contain"

                            style={styles.logoImage}
                        />
                            
                    </Row>
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
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
});

WaterLevelScreen.navigationOptions = {
    header: null,
  };
  

/*SettingsScreen.navigationOptions = {
  title: 'Settings',
};
*/