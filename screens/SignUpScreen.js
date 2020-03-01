import React ,{Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase';


export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lname: '',
            email: '',
            region: '',
            password: '',
            errorMessage: null
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.addUser()/*.then(() => {*/
                    this.props.navigation.navigate('Main');
              //  });
            }).catch(error => this.setState({ errorMessage: error.message }))
    }

    addUser = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                firebase.database().ref('users/' + user.uid).set({
                    name: this.state.name,
                    lname: this.state.lname,
                    region: this.state.region,
                    email: this.state.email,
                });

                console.log("User signed up")


            } else {
                console.log("User didnt sign up")
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    //returnKeyType = { "next" }
                    //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    placeholder="Nombre"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                //blurOnSubmit={false}
                />
                <TextInput
                    // ref={(input) => { this.secondTextInput = input; }}
                    placeholder="Apellido"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={lname => this.setState({ lname })}
                    value={this.state.lname}
                />
                <TextInput
                    placeholder="Región"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={region => this.setState({ region })}
                    value={this.state.region}
                />
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}

                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button

                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

SignUpScreen.navigationOptions = {
    title: 'Sign up',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        textAlign: 'center',
        height: 40,
        width: '85%',
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 8
    }
})