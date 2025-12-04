<template>
<form class="form-control justify-content-center align-items-center flex-column w-25" method="post" :action="`${backUrl}/menu/${id}`"  enctype="multipart/form-data" >
    <div class="mb-3 col-form-label">
        <label class="form-label">category</label>
        <input class="input-group-text" type="text" name="category" v-model="category"/>
    </div>


    <div class="mb-3 col-form-label">
        <label class="form-label">name</label>
        <input class="input-group-text" type="text" name="name" v-model="name_menu"/>
    </div>

    <div class="mb-3 col-form-label">
        <label class="form-label">description</label>
        <input class="input-group-text" type="text" name="description" v-model="description"/>
    </div>

    <div class="mb-3 col-form-label">
        <label class="form-label">price</label>
        <input class="input-group-text" type="text" name="price" v-model="price"/>
    </div>

    <div class="mb-3 col-form-label">
        <label class="form-label">allergens</label>
        <input class="input-group-text" type="text" name="allergens" v-model="allergens"/>
    </div>

    <div class="mb-3 col-form-label">
    <input class="fa-file-image-o" type="file" accept="image/*" name="image" @change=onFileChange alt="wrong image"/>
    </div>
    <input type="submit" class="btn btn-primary">

</form>
</template>

<script>
export default {
  name: "MenuEdit",
  data() {
    return {
      category: '',
      name_menu: '',
      description: '',
      price: 0,
      allergens: '',
      image: '',
      backUrl: ''

    }
  },
  methods: {
      onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      // this.createImage(files[0]);
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.backUrl = import.meta.env.VITE_APP_BACKEND_URL;
  }
}
</script>

<style scoped>

</style>