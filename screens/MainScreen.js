import React, { Component } from 'react'
import { StyleSheet, Platform, View, TouchableHighlight, Image, StatusBar, Switch } from 'react-native'
import { Card, Body, Container, Content, Text, Title, Form, Button, Picker, Icon, CardItem, Left, Right, Thumbnail, Header } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import firebase from 'firebase';


import * as Expo from "expo";

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            loading: true

        }
        this.onValueChange = this.onValueChange.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }


    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    async componentWillMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser })

    }

    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value });
        //state changes according to switch
        //which will result in re-render the text
      };


    render() {
        const { currentUser } = this.state

        return (

            <Container style={{
                paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
            }}>
                <Header style={{ backgroundColor: 'orange' }} androidStatusBarColor="red">
                    <Body>
                        <Title>Home</Title>
                    </Body>
                </Header>

                <Container style={styles.container}>
                    <Grid style={{ padding: 20 }}>
                        <Row>
                            <Card style={styles.cardStyle}>
                                <Button onPress={() => this.props.navigation.navigate('Store')} >
                                    <Text>Nivel de Agua</Text>
                                </Button>

                            </Card>

                        </Row>
                        <Row>
                            <Card style={styles.cardStyle}>
                                <Text>{this.state.switchValue ? 'Válvula abierta' : 'Válvula cerrada'}</Text>

                                {/*Switch with value set in constructor*/}
                                {/*onValueChange will be triggered after switch condition changes*/}
                                <Switch
                                    style={{ marginTop: 30 }}
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.switchValue}
                                />
                            </Card>


                        </Row>

                    </Grid>

                </Container>





            </Container>



        );



    }


}
MainScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 5,
        //flexDirection: 'column',
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'

    },
    cardStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        flex: 1, height: 20
        //resizeMode: "contain"
    },
    button: {
        backgroundColor: "#555555",
        borderColor: "#555555",
    },
})