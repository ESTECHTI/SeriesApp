import React from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator, Text, Alert } from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyBQFzo-NRXepTazR0HawZ-470U4AQ79ftI",
            authDomain: "series-4ec6c.firebaseapp.com",
            databaseURL: "https://series-4ec6c.firebaseio.com",
            projectId: "series-4ec6c",
            storageBucket: "series-4ec6c.appspot.com",
            messagingSenderId: "794126535019"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail, password } = this.state;

        const loginUserSuccess = user => {
            this.setState({ message: "Sucesso!" });
            this.props.navigation.navigate('Main');
        }

        const loginUserFailer = error => {
            this.setState({
                message: this.getMessageByErrorCode(error.code)
            })
        }

        firebase
            .auth()
            .signInWithEmailAndPassword( mail, password )
            .then(loginUserSuccess)
            .catch(error => {

                if ( error.code === 'auth/user-not-found' ) {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não',
                            onPress: () => console.log('Usuário não quer criar conta'),
                            style: 'cancel'
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then(loginUserSuccess)
                                    .catch(loginUserFailer)
                            }
                        }],
                        { cancelable: false }
                    )
                    return;
                } 
                 loginUserFailer(error);
            })
            .then(() => this.setState({ isLoading: false }));
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;

            return (
                <View>
                    <Text>{ message }</Text>
                </View>
            )
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        return(
            <Button 
                title="Entrar"
                onPress={() => this.tryLogin()}
            />
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style = {styles.input}
                        placeholder="******"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>
               
                    { this.renderButton() }
                    { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
})