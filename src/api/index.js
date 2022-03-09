import axios from 'axios';


const client = axios.create({
	//baseURL: 'http://localhost:5000/api',
	baseURL: '/api',
	//baseURL: 'http://0.0.0.0:5000/api',
	//baseURL: 'https://203.101.230.81:5000/api',
	//baseURl: 'http://203.101.230.81:5000/api',
});

export default client;
