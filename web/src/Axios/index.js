import axios from 'axios'

let Axios = axios.create({
  baseURL: 'http://localhost:3002/api/',
  timeout: 1000,
  headers: {'Authorization': 'foobar'}
});

Axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});


export default Axios;