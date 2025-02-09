import axios from "axios";
import { navigate } from "./RootNavigation"

function getLocalAccesToken() {
	const accessToken = window.localStorage.getItem("access-token");
	return accessToken;
}

const localUrl : any = "http://localhost:8000";

const axiosInstance : any = axios.create({
	baseURL: localUrl,
	headers: {
		"Content-Type": "application/json"
	}
});

axiosInstance.interceptors.request.use((config : any) => {
	const token : any = getLocalAccesToken();
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}

	return config;
}, (err : any) => {
	return Promise.reject(err);
})

axiosInstance.interceptors.response.use((res : any) => {
	return res;
}, async (err : any) => {
	const originalConfig : any = err.config;

	if (originalConfig.url != '/api/v1/login_check' && err.response) {
		// Refresh token
		
		if (err.response.status == 403 && err.response.data) {
			return Promise.reject(err.response);
		}
	} else {
		return Promise.reject(err.response);
	}

	if (err.response.status == 401) {
		navigate('/SeConnecter')
	}
	
	return Promise.reject(err.response);
})

export default axiosInstance;
