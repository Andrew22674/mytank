import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import firebase from 'firebase';

import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar } from 'react-native';
import { Card, Body, Container, Content, Text, Title, Form, Button, Label, Toast, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
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
        if (this.state.nivel > 0 && this.state.nivel < 10) {
            return images[img10]
        } else {
            return images[img50]
        }

    }



    componentDidMount() {

        // var userId = firebase.auth().currentUser.uid;
        //para actualizar en tiempo real utilizar on en vez de once
        firebase.database().ref('/Stats/').once('value').then((snapshot) => {
            var sensordistance = (snapshot.val() && snapshot.val().sensordata) || 0;
            var tankheight = (snapshot.val() && snapshot.val().height) || 0;
            var alert = (snapshot.val() && snapshot.val().alertpercentage) || 0;
            console.log("sensor distance " + sensordistance);
            var dist = tankheight - sensordistance;
            var perc = (dist / tankheight) * 100;
            
            if (perc >= 95) {
                //guardar fecha cuando el tanque esté lleno
                firebase.database().ref('Stats').update(({ fulldate: new Date() }));
                /*Toast.show({
                    text: 'Your tank is almost full!',
                    buttonText: 'Okay',
                    duration: 6000,
                    type: "warning"
                })*/
            }
            if(perc >= alert){
                Toast.show({
                    text: 'Your tank is above ' + alert + '%',
                    buttonText: 'Okay',
                    duration: 6000,
                    type: "warning"
                })
            }
        
            this.setState({
            percentage: perc
        })
        }).then(() => {

    firebase.database().ref('/Stats/').on('value', (snapshot) => {
        var sensordistance = (snapshot.val() && snapshot.val().sensordata) || 0;
        //var alert = (snapshot.val() && snapshot.val().alertpercentage) || 0;
        var tankheight = (snapshot.val() && snapshot.val().height) || 0;
        console.log("sensor distance " + sensordistance);
        var dist = tankheight - sensordistance;
        var perc = (dist / tankheight) * 100;
        

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
            percentage: perc
        })


    })
});

        /*
                console.log("tank percentage: " + this.state.percentage);
                if (this.state.percentage > 95) {
                    console.log("tank is nearly full");
                }
                else {
                    console.log("not")
                }*/

    }

calculateLevel() {
    const tankheight = 150; //cm
    console.log("cal" + this.state.nivel)
    var dist = (tankheight - this.state.nivel);
    var perc = (dist / tankheight) * 100;
    perc = +perc.toFixed(2);

    //si el tanque esta lleno, guardamos la fecha en la que se llenó


    this.setState({
        percentage: perc
    })
}



getPicture() {
    if (this.state.nivel > 0 && this.state.nivel < 10) {
        return ('../assets/images/10per.peg')
    } else {
        return ('../assets/images/15per.peg')
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

                <Row style={{ padding: 100 }}>
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
                            this.state.percentage === 0 ? require('../assets/images/0per.jpeg') :
                                this.state.percentage >= 0 && this.state.percentage <= 15 ? require('../assets/images/10per.jpeg') :
                                    this.state.percentage > 15 && this.state.percentage <= 25 ? require('../assets/images/20per.jpeg') :
                                        this.state.percentage > 25 && this.state.percentage <= 35 ? require('../assets/images/30per.jpeg') :
                                            this.state.percentage > 35 && this.state.percentage <= 45 ? require('../assets/images/40per.jpeg') :
                                                this.state.percentage > 45 && this.state.percentage <= 55 ? require('../assets/images/50per.jpeg') :
                                                    this.state.percentage > 55 && this.state.percentage <= 65 ? require('../assets/images/60per.jpeg') :
                                                        this.state.percentage > 65 && this.state.percentage <= 75 ? require('../assets/images/70per.jpeg') :
                                                            this.state.percentage > 75 && this.state.percentage <= 85 ? require('../assets/images/80per.jpeg') :
                                                                this.state.percentage > 85 && this.state.percentage <= 95 ? require('../assets/images/90per.jpeg') :
                                                                    this.state.percentage > 95 && this.state.percentage <= 99 ? require('../assets/images/90per.jpeg') :
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