
<template>
  <div v-if="loading">
    loading....
  </div>
  <DataTable
      v-else
      :value="shop"
      :lazy="true"
      :loading="this.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :total-records=shop_total
      @page="onPageChange"
      :first="offset"
  >
    <column field="id" header="№"></column>
    <column field="category" header="категория"></column>
    <column field="name" header="Зал"></column>
    <column field="description" header="Описание"></column>
    <column field="price" header="Цена"></column>
    <Column header="Image" >
      <template #body="slotProps">
        <img v-bind:src= " this.image_url + slotProps.data.image" :alt="slotProps.data.image" class="w-24 rounded" />
      </template>
    </Column>
  </DataTable>
</template>

<script>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useDataStore} from "@/stores/dataStore.js";
export default {
  name: "ShopTable",
  components: {
    DataTable,
    Column
  },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      page: 0,
      loading: false,
      image_url: ""
    }
  },
  computed: {
    shop() {
      return this.dataStore.shop;
    },
    shop_total() {
      return this.dataStore.shop_total;
    }
  },
  async mounted() {
    this.loading = true;
    this.image_url = import.meta.env.VITE_IMAGE_URL
    try {
      console.log("Component mounted.");
      await this.loadData();
      console.log("shop = ", this.shop);
    }
    catch (error) {
      console.error('Ошибка закгрузки с апи', error);
    }
    finally {
      this.loading = false;
    }

  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_shop(this.offset / this.perpage, this.perpage);
    },
    async loadData() {
      await this.dataStore.get_shop();
      await this.dataStore.get_shop_total();
    }
  }
}
</script>

<style scoped>

</style>