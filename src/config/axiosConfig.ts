import axios from "axios";
import { useAuthStore } from "@/store";
import { envs } from "@/utils/envs";
import { redirect } from "@tanstack/react-router";

const validateStatus = (status: number) => {
	if (status === 401) {
		logout();
	}
	return status >= 200 && status < 300;
};

const axiosInst = axios.create({
	baseURL: envs.SERVER_URL,
	timeout: 10_000,
	validateStatus,
});

axiosInst.interceptors.request.use((config) => {
	const token = useAuthStore.getState().creds.token;
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}
	return { ...config };
});

axiosInst.interceptors.response.use(
	(config) => config.data,
	(err) => Promise.reject(err.response.data),
);

const logout = () => {
	redirect({
		to: "/auth/login",
	});
	useAuthStore.getState().resetCreds();
};

export { axiosInst, logout };
