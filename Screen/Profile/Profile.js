import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default ({navigation, route}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is {route.params.name}'s profile</Text>
        </View>
    );
};