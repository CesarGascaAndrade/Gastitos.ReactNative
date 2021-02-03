import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import {
    View,
    Text,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Login Screen</Text>
                <TextInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={this.onCorreoChange} />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={this.onPasswordChange} />
                {error}
                {this.props.loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button
                    title="Login"
                    onPress={() => {
                        this.props.onAuth(this.state.correo, this.state.password);
                    }}
                />}
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