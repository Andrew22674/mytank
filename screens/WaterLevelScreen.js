import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';

import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar, ProgressBarAndroid } from 'react-native';
import { Card, Body, Container, Content, Text, Title, Form, Button, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
export default class WaterLevelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Email',
            password: 'Password',
            switchValue: false,
            nivel: 0
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

    componentDidMount() {

        // var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/Stats/').once('value').then((snapshot) => {
            var tanklevel = (snapshot.val() && snapshot.val().Nivel) || 0;
            console.log("tank level" + tanklevel);
            this.setState({
                nivel: tanklevel
            });
        });
        /*var niveltanque = firebase.database().ref('posts/' + postId + '/starCount');
        starCountRef.on('value', function (snapshot) {
            updateStarCount(postElement, snapshot.val());
        });*/


    }

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
                            {
                                /*
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

                                */
                            }

                        </Form>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.container}>
                    {/*
                    
                  <Row>
                        <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={0.5}
                        />
                    </Row>
                
                
                
                
                    */}

                    <Row>
                        {/*
                           <Button onPress = {()=> this.props.navigation.goBack()}>
                            <Text>Go back</Text>
                            </Button>
                        */}

                        <Image style={{ height: 10 }}



                            source={
                                //__DEV__
                                require('../assets/images/10per.jfif')
                            }


                            resizeMode="contain"

                            style={styles.logoImage}
                        />


                    </Row>
                    <Row>
                        <Text>
                            {this.state.nivel}
                        </Text>
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