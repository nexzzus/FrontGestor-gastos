import axios from "axios";
import api from "./axios.js";
import {useAuthStore} from "../store/authStore.js";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth"

axios.defaults.withCredentials = true

export const loginService = async (data) => {
    try {
        const response = await api.post(`${API_URL}/login`, data, {
            headers: {'Content-Type': 'application/json'},
        })

        if (response.status === 200) {
            const token = response.data.accessToken;
            const user = response.data.user;
            useAuthStore.getState().login(token, user)

            return {
                success: true,
            }
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return {
                success: false,
                error: error.response?.data?.message,
            }
        }
    }
}

export const registerService = async (data) => {
    try {
        const response = await api.post(`${API_URL}/register`, data)

        if (response.status === 200 || response.status === 201) {
            const token = response.data.accessToken
            const user = response.data.user
            useAuthStore.getState().login(token, user)

            return {
                success: true,
            }
        }

        return {
            success: false,
            errro: "Respuesta inesperada del servidor"
        }
    } catch (e){
        return {
            success: false,
            error: e.response?.data?.message || "Error en el registro"
        }
    }
}

export const logoutService = async () => {
    try {
        const response = await api.post(`${API_URL}/logout`)
        if (response.status === 200) {
            return {
                success: true,
            }
        }
    } catch (e) {
        return {
            success: false,
            error: e.response?.data?.error || "Error al cerrar sesión"
        }
    }
}

export const getMe = async (token) => {
    try {
        const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {}

        const response = await api.get("/users/me", config)
        if (response.status === 200) {
            return {
                success: true,
                data: response.data
            }
        }
    } catch (e){
        return {
            success: false,
            error: e.response?.data?.message || "Error al obtener usuario"
        }
    }
}