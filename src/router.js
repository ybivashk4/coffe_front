import {createRouter, createWebHistory} from 'vue-router'
import MenuMain from "@/components/MenuMain.vue";
import MenuEdit from "@/components/MenuEdit.vue";
import MenuCreateItem from "@/components/MenuCreateItem.vue";
import About from "@/components/About.vue";
import HomePage from "@/components/HomePage.vue";
import HallsTable from "@/components/HallsTable.vue";
import HallCreate from "@/components/HallCreate.vue";
import ShopTable from "@/components/ShopTable.vue";
const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: '/menu',
        component: MenuMain
    },
    {
        path: '/menu/create',
        component: MenuCreateItem
    },
    {
        path: '/menu/edit/:id',
        component: MenuEdit,
        props: true
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/halls',
        component: HallsTable,
    },
    {
        path: '/halls/create',
        component: HallCreate,
    },
    {
        path: '/shop',
        component: ShopTable,
    }
]
const router = createRouter({
        history: createWebHistory(),
        routes,
    }
)
export default router;