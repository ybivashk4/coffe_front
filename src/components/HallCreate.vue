

<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="create_hall" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgray">Добавление зала</h2>
      <div class="mb-3 col-form-label">
        <InputText type="text" placeholder="Введите наименование" v-model="this.name"/>
      </div>
      <div class="mb-3 col-form-label">
        <InputText type="text" placeholder="Введите описание" v-model="this.description"/>
      </div>


      <div class="mb-3 col-form-label">
        <InputText type="text" placeholder="Введите Загруженность" v-model="this.capacity"/>
      </div>
      <div class="mb-4 mt-4">
        <label for="image" id="file-label" class="block text-md font-medium accent-gray-500 border border-b-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
        <input type="file" hidden id="image" name="image" v-on:change="changeCaption" required accept="image/*">
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать"/>
      </div>

    </form>
  </div>
  <Toast position="bottom-right"/>
</template>


<script>
import {InputText} from "primevue";
import {Button} from "primevue";
import {useDataStore} from "@/stores/dataStore.js";
import {Toast} from "primevue";
export default {
  name: "HallCreate",
  components: {InputText, Button, Toast},
  data() {
    return {
      id: '',
      name: '',
      description: '',
      capacity: 0,
      image: '',
      dataStore: useDataStore(),
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById("file-label").innerHTML = file.name;
        this.image = file;
      }
      else {
        document.getElementById("file-label").innerHTML = "Выберите изображение";
        this.image = file;
      }
    },
    async create_hall() {
      const fromData = new FormData();
      fromData.append("name", this.name);
      fromData.append("description", this.description);
      fromData.append("capacity", this.capacity);
      fromData.append("image", this.image);
      await this.dataStore.create_hall(fromData);
      if (this.errorCode > 0) {
        this.$toast.add(
            {
              severity: 'error',
              summary: 'Ошибка добавления данных',
              detail: this.errorMessage,
              life: 4000,
            }
        );
      }
      else {
        this.$toast.add(
            {
              severity: 'success',
              summary: 'Данные успешно добавлены',
              detail: this.errorMessage,
              life: 4000,
            }
        );
      }

    }
  }
}
</script>


<style scoped>

</style>