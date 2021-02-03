import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import {
    View,
    Text,
    Button
} from 'react-native';

import { IconButton, Colors } from 'react-native-paper';

class Detail extends React.Component {
    render() {
        const style = {
            header: { fontSize: 24 },
            title: {},
            text: { fontSize: 18 }
        };

        return (
            <View style={{ flex: 1, padding: 15 }}>
                <Text style={style.header}>{this.props.route.params.descripcion}</Text>
                <Text style={style.text}>{this.props.route.params.importe > 0 ? 'Ingreso de ' : 'Gasto de '} ${this.props.route.params.importe}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 15, alignItems: "center" }}>
                        <IconButton icon="file-edit" color={Colors.lightGreen700} size={45} onPress={() => this.props.navigation.navigate('RegistroForm', this.props.route.params)}></IconButton>
                    </View>
                    <View style={{ flex: 1, padding: 15, alignItems: "center" }}>
                        <IconButton icon="delete" color={Colors.red400} size={45} onPress={() => {
                            this.props.registroEliminar(
                                this.props.route.params.uuid,
                                null,
                                () => {
                                    this.props.registroConsultar();
                                    this.props.navigation.navigate('Home');
                                }
                            );
                        }} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registroEliminar: (uuid, error, success) => dispatch(actions.registroEliminar(uuid, error, success)),
        registroConsultar: _ => dispatch(actions.registroConsultar()),
    };
};

const mapStateToProps = state => {
    return {
        loading: state.registro.loading,
        error: state.registro.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);