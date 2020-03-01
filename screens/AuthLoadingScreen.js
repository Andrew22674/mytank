import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import firebase from 'firebase';



export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        //this._bootstrapAsync();

    }

    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log("logged in")
            }else{
                console.log("not logged in")
            }
            this.props.navigation.navigate(user ? 'Main' : 'Auth');
            //this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }
/*
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };*/

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}