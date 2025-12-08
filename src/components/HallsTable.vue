<template>
  <div v-if="loading">
    loading....
  </div>
  <DataTable
      v-else
    :value="halls"
    :lazy="true"
    :loading="this.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :total-records=halls_totoal
    @page="onPageChange"
    :first="offset"
    >
    <column field="id" header="№"></column>
    <column field="name" header="Зал"></column>
    <column field="description" header="Описание"></column>
    <column field="capacity" header="Загруженность"></column>
    <Column header="Image" >
      <template #body="slotProps">
<!--        <img v-bind:src= " this.image_url + slotProps.data.image" :alt="slotProps.data.image" class="w-24 rounded" />-->
        <img v-bind:src= "slotProps.data.image" :alt="slotProps.data.image" class="w-24 rounded" />

      </template>
    </Column>
  </DataTable>

</template>


<script>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useDataStore} from "@/stores/dataStore.js";
import getHallPicture from '@/api.js'
export default {
  name: "HallsTable",
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
    halls() {
      return this.dataStore.halls;
    },
    halls_totoal() {
      return this.dataStore.halls_total;
    }
  },
  async mounted() {
    this.loading = true;
    this.image_url = import.meta.env.VITE_IMAGE_URL
    try {
      console.log("Component mounted.");
      await this.loadData();
      console.log("halls = ", this.halls);
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
      this.dataStore.get_halls(this.offset / this.perpage, this.perpage);
    },
    async loadData() {
      await this.dataStore.get_halls();
      await this.dataStore.get_halls_total();
    }
  }
}
</script>


<style scoped>

</style>