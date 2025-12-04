<template>
 <div class="container font-monospace">
    <!-- Загрузка -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>

        <h2 class="modal-header">Меню:</h2>
          <div class="container flex-row">
                <MenuSection
                 v-if="!loading"
                title="Основные блюда"
                :menu-items="filteredMenu('m')"
                />

                <MenuSection
                    v-if="!loading"
                    title="Десерты"
                    :menu-items="filteredMenu('d')"
                />

               <MenuSection
                   v-if="!loading"
                        title="Кофе"
                        :menu-items="filteredMenu('c')"
                />
          </div>


<!--      <footer class="modal-footer align-content-start justify-content-start">-->
<!--          <button class="btn btn-primary" @click="showCreateForm = true">-->
<!--              Создать новое блюдо-->
<!--          </button>-->
<!--      </footer>-->
   </div>
</template>

<script>
import Api from "@/api.js";
import MenuSection from "@/components/MenuSection.vue";
// import MenuCreateItem from "@/components/MenuCreateItem";
export default {
  name: "MenuMain",
     data() {
        return {
            menu: [],
            loading: false,
            message: '',
        };
    },
  components: {
    MenuSection,
    // MenuCreateItem,
  },

  async mounted () {
    try {
      await this.loadMenu();
    }
    catch (error) {
      console.error('Ошибка загрузки с апи:', error);
    }
  },

  methods: {
    async loadMenu() {
      this.loading = true;
      try {
        const response = await Api.getMenu();
        this.menu = response.data;
      }
      catch (error) {
        console.error('load error: ' + error)
      }
      finally {
          this.loading = false;
      }
    },
    filteredMenu(category) {
      if (this.menu) {
        return this.menu.filter(item => item.category === category);
      }
      else {
        console.error("filtered")
        return [];
      }
    }
  }
}
</script>

<style scoped>

</style>