import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';

import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar } from 'react-native';
import { Card, Body, Container, Content, Text, Title, Form, Button,Label, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";

const images = {
    img10: require('../assets/images/10per.jpeg'),
    img20: require('../assets/images/20per.jpeg'),
    img30: require('../assets/images/30per.jpeg'),
    img40: require('../assets/images/40per.jpeg'),
    img50: require('../assets/images/50per.jpeg'),
    img60: require('../assets/images/60per.jpeg'),
    img70: require('../assets/images/70per.jpeg'),
    img80: require('../assets/images/80per.jpeg'),
    img90: require('../assets/images/90per.jpeg'),
    img100: require('../assets/images/100per.jpeg')
    //flagNotFound: require('../../assets/images/flag_not_found.png')
  };


export default class WaterLevelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Email',
            password: 'Password',
            switchValue: false,
            nivel: 30,
            percentage: 10
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.getPicture = this.getPicture.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.calculateLevel = this.calculateLevel.bind(this);
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

    
      
     loadImage = () => {
         if(this.state.nivel > 0 && this.state.nivel <10 ){
             return images[img10]
         }else{
             return images[img50]
         }
         
      }



    componentDidMount() {

        // var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/Stats/').once('value').then((snapshot) => {
            var tanklevel = (snapshot.val() && snapshot.val().Nivel) || 0;
            var tankheight = (snapshot.val() && snapshot.val().height) || 0;
            console.log("tank level" + tanklevel);
            var dist = tankheight - tanklevel;
            var perc = (dist/tankheight) * 100;

            this.setState({
                percentage : perc
            })
        });

        /*var niveltanque = firebase.database().ref('posts/' + postId + '/starCount');
        starCountRef.on('value', function (snapshot) {
            updateStarCount(postElement, snapshot.val());
        });*/


    }

    calculateLevel(){
        const tankheight = 150; //cm
        console.log("cal" + this.state.nivel)
        var dist = (tankheight - this.state.nivel);
        var perc  = (dist/tankheight) * 100;
        perc = +perc.toFixed(2);

        this.setState({
            percentage : perc
        })
    }

     getPicture(){
        if(this.state.nivel > 0 && this.state.nivel < 10){
            return('../assets/images/10per.peg')
        }else{
            return('../assets/images/15per.peg')
        }
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

                    <Row style={{padding: 100}}>
                        {/*
                           <Button onPress = {()=> this.props.navigation.goBack()}>
                            <Text>Go back</Text>
                            </Button>
                        */}

                        <Image style={{ height: 200 }}



                            source={
                                //__DEV__
                                //require('../assets/images/10per.jpeg')
                                //require(this.state.percentage > 0 && this.state.percentage < 10 ? )
                                this.state.percentage >= 0 && this.state.percentage <= 10 ? require('../assets/images/10per.jpeg') : 
                                this.state.percentage > 10 && this.state.percentage <=20 ? require('../assets/images/20per.jpeg') :
                                this.state.percentage > 20 && this.state.percentage <=40 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 30 && this.state.percentage <=50 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 40 && this.state.percentage <=60 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 50 && this.state.percentage <=70 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 60 && this.state.percentage <=80 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 70 && this.state.percentage <=90 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 80 && this.state.percentage <=90 ? require('../assets/images/30per.jpeg') :
                                this.state.percentage > 90 && this.state.percentage <=99 ? require('../assets/images/30per.jpeg') :
                                require('../assets/images/100per.jpeg')
                            }

                            resizeMode="contain"

                            //style={styles.logoImage}
                        />


                    </Row>
                    <Row>
                        <Text>
                            <Label>Nivel del Tanque: {this.state.percentage}%</Label>
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