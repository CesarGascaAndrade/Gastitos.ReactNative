import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
    View,
    Text,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';

import { RadioButton } from 'react-native-paper';

class Form extends React.Component {
    state = {
        uuid: null,
        descripcion: '',
        importe: 0,
        fecha_registro: new Date(),
        showDatePicker: false,
        multiplicador: -1
    };

    componentDidMount() {
        const data = this.props.route.params;

        let newState = { ...this.state };

        if (data.uuid) {
            newState.uuid = data.uuid;
        }

        if (data.descripcion) {
            newState.descripcion = data.descripcion;
        }

        if (data.importe) {
            newState.importe = data.importe;

            if (data.importe < 0) {
                newState.multiplicador = -1;
            } else {
                newState.multiplicador = 1;
            }
        }

        if (data.fecha_registro) {
            newState.fecha_registro = new Date(data.fecha_registro);
        }

        this.setState(newState);

        if (newState.uuid == null) {
            this.props.navigation.setOptions({ title: 'Nuevo Registro' });
        }
        else {
            this.props.navigation.setOptions({ title: 'Editar Registro' });

        }
    }

    onDescripcionChange = (value) => {
        this.setState({
            ...this.state,
            descripcion: value
        });
    }

    onImporteChange = (value) => {
        this.setState({
            ...this.state,
            importe: isNaN(value) ? 0 : Math.abs(value) * this.state.multiplicador,
        });
    }

    onMultiplicadorChange = (value) => {
        this.setState({
            ...this.state,
            multiplicador: value,
            importe: Math.abs(this.state.importe) * value
        });
    }

    render() {
        const importe = this.state.importe;

        return (<>
            <View style={{ padding: 15 }}>
                <RadioButton.Group onValueChange={this.onMultiplicadorChange} value={this.state.multiplicador}>
                    <RadioButton.Item label="Ingreso" value={1} />
                    <RadioButton.Item label="Egreso" value={-1} />
                </RadioButton.Group>
                <Text>Descripción</Text>
                <TextInput
                    placeholder="¿En qué gasté dinero?"
                    value={this.state.descripcion}
                    onChangeText={this.onDescripcionChange}
                    editable={!this.props.loading} />
                <Text>Importe</Text>
                <TextInput
                    placeholder="¿Cuánto costó?"
                    keyboardType="number-pad"
                    value={this.state.importe.toString()}
                    onChangeText={this.onImporteChange}
                    editable={!this.props.loading} />
                <Text>Fecha Registro</Text>
                <Text
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    onPress={(event) => {
                        if (!this.props.loading) {
                            this.setState({
                                ...this.state,
                                showDatePicker: true
                            });
                        }
                    }} >{this.state.fecha_registro.toLocaleString("en-US")} </Text>
                {this.state.showDatePicker && (<DateTimePicker
                    mode="date"
                    display="default"
                    value={this.state.fecha_registro}
                    onChange={(event, selectedDate) => {
                        if (selectedDate != null) {
                            this.setState({
                                ...this.state,
                                fecha_registro: new Date(selectedDate),
                                showDatePicker: false
                            });
                        }
                    }} />)}
                {
                    this.props.loading ?
                        <ActivityIndicator size="large" color="#0000ff" /> :
                        <Button
                            title="Guardar"
                            onPress={() => {
                                //this.props.navigation.replace('Home');
                                if (this.state.uuid != null) {
                                    this.props.registroEditar(
                                        this.state.uuid,
                                        this.state.descripcion,
                                        this.state.importe,
                                        this.state.fecha_registro,
                                        null,
                                        () => {
                                            this.props.registroConsultar();
                                            this.props.navigation.navigate('Home');
                                        }
                                    );
                                }
                                else {
                                    this.props.registroCrear(
                                        this.state.descripcion,
                                        this.state.importe,
                                        this.state.fecha_registro,
                                        null,
                                        () => {
                                            this.props.registroConsultar();
                                            this.props.navigation.navigate('Home');
                                        }
                                    );
                                }
                            }}
                        />
                }
            </View>
        </>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registroCrear: (descripcion, importe, fecha_registro, error, success) => dispatch(actions.registroCrear(descripcion, importe, fecha_registro, error, success)),
        registroEditar: (uuid, descripcion, importe, fecha_registro, error, success) => dispatch(actions.registroEditar(uuid, descripcion, importe, fecha_registro, error, success)),
        registroConsultar: _ => dispatch(actions.registroConsultar()),
    };
};

const mapStateToProps = state => {
    return {
        //registros: state.registro.registros,
        loading: state.registro.loading,
        error: state.registro.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);