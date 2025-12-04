import {defineStore} from "pinia";
import axios from "axios";
const backURL = import.meta.env.VITE_APP_BACKEND_URL;
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        errorMessage: "",
    }),
    actions: {
        async login (credentials) {
            this.errorMessage = "";
            try {
                const response = await axios.post(`${backURL}/login`, credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', response.data.token);
            }
            catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.request.data.message;
                }
                else {
                    this.errorMessage = "i don't know";
                }
            }
        },
        async getUser() {
            this.errorMessage = "";
            try {
                const response = await axios.get(`${backURL}/user`, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
                this.user = response.data;
            }
            catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.request.data.message;
                }
                else {
                    this.errorMessage = "i don't know";
                }
            }
        },
        logout () {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
})