import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import {
    SafeAreaView,
    FlatList,
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';



import { Avatar, Card, Paragraph, FAB, Button as PaperButton, Colors } from 'react-native-paper';

class Home extends React.Component {
    componentDidMount() {
        this.props.registroConsultar();
    }

    state = {
        registros: []
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            shadowColor: 'rgba(0,0,0,0.2)'
        },
        item: {
            backgroundColor: '#e9e9e9',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },
    });

    Item = (registro) => {
        const es_gasto = parseInt(registro.item.importe) < 0;

        return (
            <Card onPress={() => this.props.navigation.navigate('Details', registro.item)}>
                <Card.Title
                    title={registro.item.descripcion}
                    left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: es_gasto ? 'red' : 'green' }} icon={es_gasto ? 'minus' : 'plus'} />}
                    right={(props) => <PaperButton {...props} color="#000000" icon="arrow-right">${registro.item.importe.toFixed(2)}</PaperButton>}
                />
                <Card.Content>
                    <Paragraph>({registro.item.fecha_registro})</Paragraph>
                </Card.Content>
            </Card>
        );
    }

    render() {
        const registros = this.props.registros ? this.props.registros : [];

        const renderItem = (registro) => {
            return this.Item(registro);
        };

        let content = (
            <View><ActivityIndicator size="large" color="#0000ff" /></View>
        );

        if (!this.props.loading) {
            content = (
                <FlatList
                    data={registros}
                    renderItem={renderItem}
                    keyExtractor={item => item.uuid}

                />
            );
        }

        return (<>
            <SafeAreaView style={this.styles.container}>
                {content}
            </SafeAreaView>
            <FAB
                style={this.styles.fab}
                //small
                icon="plus"
                onPress={() => {
                    this.props.navigation.navigate('RegistroForm', {});
                }}
            />
        </>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registroConsultar: _ => dispatch(actions.registroConsultar()),
    };
};

const mapStateToProps = state => {
    return {
        registros: state.registro.registros,
        loading: state.registro.loading,
        error: state.registro.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);