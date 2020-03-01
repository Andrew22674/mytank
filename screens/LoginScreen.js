import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
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

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Email',
            password: 'Password',
            errorMessage: null
        };
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => /*this.props.navigation.navigate('Auth')*/this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Dashboard" })]
                })))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //console.log("is logged in")
            } else {
                //console.log("not logged in")
            }

            //this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }


    render() {
        return (

            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>

                        <Image
                            source={
                                //__DEV__
                                require('../assets/images/Capture2.png')
                            }
                            resizeMode="contain"

                            style={styles.logoImage}
                        />
                        {this.state.errorMessage &&
                            <Text style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </Text>}
                    </View>

                    <View style={styles.getStartedContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.inputStyle}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                        />


                        <Button
                            title="Log in"
                            onPress={this.handleLogin}
                        />
                        {//<DevelopmentModeNotice />
                        }

                        <Text style={styles.getStartedText} >Inicia sesión para visualizar los datos del tanque.</Text>

                        {/*<View
                            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                            <MonoText>screens/HomeScreen.js</MonoText>
                        </View>*/}


                    </View>

                    {/*<View style={styles.helpContainer}>
                        <TouchableOpacity style={styles.helpLink}>
                            <Text style={styles.helpLinkText} onPress={() => this.props.navigation.navigate('SignUp')}>
                                No tienes una cuenta? Registrate aquí.
                </Text>
                        </TouchableOpacity>
                    </View>*/}
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <Text style={styles.tabBarInfoText}>
                        
            </Text>

                    <View
                        style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                        <MonoText style={styles.codeHighlightText}>
                            nsdsdgsdgsdgs
              </MonoText>
                    </View>
                </View>
            </View>
        );

    }

}

/*HomeScreen.navigationOptions = {
    header: null,
};*/

/*function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}*/
LoginScreen.navigationOptions = {
    header: null,
  };

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        borderRadius: 25,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    logoImage: {
        flex: 1, height: 300, width: 300

        //resizeMode: "contain"
    },
    inputStyle: {
        flex: 1,
        textAlign: 'center',
        borderColor: 'gray', borderWidth: 2,
        width: "75%",
        borderStyle: 'solid',
        marginBottom: 20,
        fontSize: 20


    },
});


