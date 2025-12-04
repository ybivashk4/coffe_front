<template>
  <div class="card-body" style="padding-bottom: 5em">
      <p class="card-text">
          {{ name}}
      </p>
      <p class="card-text w-100">
          {{ description}}
      </p>
      <p class="card-text fs-4">
          {{ price}} P
      </p>
      <p class="card-text">
          Аллергены {{ allergens}}
      </p>
    <img class="card-img-top w-50 h-50"
       v-bind:src="'data:' + getMime() + ';base64,'+ getPicture()"
       alt="{{ name}}">

      <div class="d-flex justify-content-between align-content-center">
          <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary" type="button">
                <router-link :to="{ path: `/menu/edit/${id}` }">
                  edit
                </router-link>
              </button>
              <button class="btn btn-sm btn-outline-secondary" type="button" @click="deleteItem" >delete</button>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Api from "@/api.js";

export default {
  name: "MenuItem",
  data() {
        return {
            loading: false,
            picture: '',
            mime: '',
        };
    },
  props: {
    id: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    allergens: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  async mounted() {
    this.loadPicture()
  },
  methods: {
    async loadPicture() {
      const response = await Api.getMenuPicture(this.image);
      this.picture = response.data;
    },
    getPicture() {
      return this.picture.image;
    },
    getMime() {
      return this.picture.image_mime_type;
    },
    async deleteItem() {
      try{
        await Api.deleteMenuItem(this.id);
      }
      catch (Error) {
        console.error("Error in delete item:\n" + Error)
      }
      finally {
        window.location.reload()
      }
    }
   },
}
</script>

<style scoped>

</style>