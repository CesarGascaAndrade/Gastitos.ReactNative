/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './Screen/Home/Home';
import ProfileScreen from './Screen/Profile/Profile';
import DetailsScreen from './Screen/Detail/Detail';
import LoginScreen from './Screen/User/Login';
import FormScreen from './Screen/Registro/Form';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import registroReducer from './store/reducers/registro';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    registro: registroReducer,
});

let store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

const Stack = createStackNavigator();

const App: () => React$Node = () => {
    return (
        <ReduxProvider store={store}>
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            title: 'Registros'
                        }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="RegistroForm" component={FormScreen} options={{
                            title: 'Registro'
                        }} />
                        <Stack.Screen name="Details" component={DetailsScreen} options={{
                            title: "Detalles"
                        }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ReduxProvider>
    );
};

export default App;
