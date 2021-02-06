import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import {
    Button,
    TextInput
} from 'react-native-paper';

class Login extends React.Component {
    state = {
        correo: '',
        password: ''
    };

    componentDidUpdate() {
        if (this.props.usuario != null) {
            this.props.navigation.replace('Home');
        }
    }

    onCorreoChange = (value) => {
        this.setState({
            ...this.state,
            correo: value
        });
    };

    onPasswordChange = (value) => {
        this.setState({
            ...this.state,
            password: value
        });
    };

    render() {
        let error = null;

        if (this.props.error) {
            error = <Text style={{ textAlign: 'center' }}>{this.props.error}</Text>
        }

        return (
            <View style={{ flex: 1, padding: 15, justifyContent: 'center' }}>
                <Text style={{
                    textAlign: 'center',
                    paddingBottom: 45,
                    fontSize: 45
                }}>
                    Gastitos App
                </Text>
                <TextInput
                    label="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={this.onCorreoChange} />
                <TextInput
                    label="Contraseña"
                    secureTextEntry={true}
                    style={{ marginTop: 15 }}
                    onChangeText={this.onPasswordChange} />
                {this.props.loading ?
                    <ActivityIndicator style={{ marginTop: 15 }} size="large" color="#0000ff" /> :
                    <Button
                        mode="contained"
                        title="Login"
                        style={{ marginTop: 15 }}
                        onPress={() => {
                            this.props.onAuth(this.state.correo, this.state.password);
                        }}
                    >Login</Button>}
                {error}
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup)),
        onLogout: () => dispatch(actions.logout())
    };
};

const mapStateToProps = state => {
    return {
        usuario: state.auth.usuario,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);