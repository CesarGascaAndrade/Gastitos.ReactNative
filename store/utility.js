import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const session = {
    expired: async _ => {
        const data = JSON.parse(await AsyncStorage.getItem('access-token'));

        if (data != null) {

            const decoded_token = jwt_decode(data.token);

            const now = new Date();
            const expiresIn = new Date(decoded_token.exp * 1000);

            if (now > expiresIn) return false;
        }

        return false;

    },
    getData: async (key) => {
        const data = JSON.parse(await AsyncStorage.getItem(key));
        
        return data;
    },
    setData: (key, data) => {
        AsyncStorage.setItem(key, JSON.stringify(data));
    },
    delete: (key) => {
        AsyncStorage.delete(key);
    },
    clear: () => {
        AsyncStorage.clear();
    }
};