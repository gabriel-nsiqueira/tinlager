import axios from 'axios';

import { AsyncStorage } from 'react-native';

const api = axios.create({
	baseURL: 'http://c7a4076d.ngrok.io'
});

// api.interceptors.request.use(async (config) => {
// 	try {
// 		const token = await AsyncStorage.getItem('@token_key');
// 		// alert('jif');

// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	} catch (err) {
// 		alert(err);
// 	}
// });

export default api;
