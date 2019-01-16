import axios from 'axios';

const ServicesDiplomaApi = axios.create({
	baseURL: 'http://localhost:8000/api'
});

export default ServicesDiplomaApi;
