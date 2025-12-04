import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default {
    // Получить все элементы меню
    getMenu() {
        return apiClient.get('/menu');
    },

    // Получить конкретный элемент меню
    getMenuItem(id) {
        return apiClient.get(`/menu/${id}`);
    },
    getMenuPicture(name) {
        return apiClient.get(`/menu/pictures/${name}`);
    },
    getHallPicture(name) {
        return apiClient.get(`/hall/pictures/${name}`);
    },
    // Создать новый элемент меню
    createMenuItem(menuData) {
        return apiClient.post('/menu', menuData);
    },

    // Обновить элемент меню
    updateMenuItem(id, menuData) {
        return apiClient.put(`/menu/${id}`, menuData);
    },

    // Удалить элемент меню
    async deleteMenuItem(id) {
        console.info('menu item with id ' + id + 'has been deleted')
        await apiClient.get(`/menu/delete/${id}`);
    }
};