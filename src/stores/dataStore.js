import {defineStore} from "pinia";
import axios from "axios";
const backUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore("dataHalls", {
    state: () => ({
        halls: [],
        halls_total: null,
        shop: [],
        shop_total: null,
        errorMessage: ""
    }),
    actions: {
        async get_halls(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backUrl + '/hall', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.halls = response.data;
            }
            catch(error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.message;
                }
                console.error(error);
            }
        },
        async get_halls_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backUrl + '/hall_total');
                this.halls_total = response.data;
            }
            catch(error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.message;
                }
                console.error(error);
            }
        },
        async get_shop(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backUrl + '/shop', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.shop = response.data;
            }
            catch(error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.message;
                }
                console.error(error);
            }
        },
        async get_shop_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backUrl + '/shop_total');
                this.shop_total = response.data;
            }
            catch(error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    this.errorMessage = error.message;
                }
                console.error(error);
            }
        },
    }
})