<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="50" alt="svg icon">
      </span>
    </template>
    <template #item="{item, props, hasSubmenu, root}">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
        </router-link>
        <div v-else>
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
        </div>
      </a>
    </template>
    <template #end>
      <div class="my-div">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/>
            {{user.name}}
          <Button @click="logout" class="ml-4">Выйти</Button>
        </div>
        <div v-else>
          <Button
              v-if="!showLoginForm"
              @click="showLoginForm = true"
              label="Войти"
              icon="pi pi-sign-in"
          />
          <form v-else @submit.prevent="login" class="my-form">
            <InputText v-model="email" type="email" id="email" required placeholder="Логин"
                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <Button type="submit">Войти</Button>
            <Message v-if="authError" severity="error" variant="outlined">{{authError}}</Message>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>

<script>
import {useAuthStore} from "@/stores/authStore";
import {Button} from "primevue";
import {Menubar} from "primevue";
import {InputText} from "primevue";
import Message from 'primevue/message';
export default {
  name: 'App',
  components: {Button,Menubar, InputText, Message},

  // components: {MenuMain},
  data() {
    return {
      date: '',
      email: '',
      password: '',
      showLoginForm: false,
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [

          ],
        },
        {
          label: 'Меню',
          icon: 'pi pi-fw pi-align-justify',
          items: [
            {
              label: 'Меню',
              icon: 'pi pi-fw pi-folder',
              route: '/menu',
            },
            {
              label: 'Создать элемент',
              icon: 'pi pi-fw pi-upload',
              route: '/menu/create',
            }

          ],

        },
        {
          label: 'Залы',
          icon: 'pi pi-fw pi-align-justify',
          items: [
            {
              label: 'Залы',
              icon: 'pi pi-fw pi-building',
              route: '/halls',
            },
            {
              label: 'Создать элемент',
              icon: 'pi pi-fw pi-upload',
              route: '/halls/create',
            },
          ],

        },
        {
          label: 'Магазин',
          icon: 'pi pi-fw pi-shopping-cart',
          route: '/shop',
        },
        {
          label: 'О нас',
          icon: 'pi pi-fw pi-heart-fill',
          route: '/about',
        },

      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },

  },
  methods: {
    logout() {
      this.authStore.logout();
      this.showLoginForm = false;
    },
    login() {
      this.authStore.login({
        email: this.email,
        password: this.password
      });
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  color: red;
}
@media screen and (max-width: 1300px) {
  .my-form {
    width: 50%;
  }
  .my-div {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
}
</style>
