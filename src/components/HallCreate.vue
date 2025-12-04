

<template>
  <form class="form-control justify-content-center align-items-center flex-column w-25" method="post" :action="backUrl+'/hall'" enctype="multipart/form-data" >
    <div class="mb-3 col-form-label">
      <label class="form-label">Имя</label>
      <input class="input-group-text" type="text" name="name" v-model="name"/>
    </div>


    <div class="mb-3 col-form-label">
      <label class="form-label">Описание</label>
      <input class="input-group-text" type="text" name="description" v-model="description"/>
    </div>


    <div class="mb-3 col-form-label">
      <label class="form-label">Загруженность</label>
      <input class="input-group-text" type="text" name="capacity" v-model="capacity"/>
    </div>

    <div class="mb-3 col-form-label">
      <input class="fa-file-image-o" type="file" accept="image/*" name="image" alt="wrong image"/>
    </div>
    <input type="submit" class="btn btn-primary">

  </form>
</template>


<script>

export default {
  name: "HallCreate",
  data() {
    return {
      id: '',
      name: '',
      description: '',
      capacity: 0,
      image: '',
      backUrl: '',
    }
  },
  mounted() {
    this.backUrl = import.meta.env.VITE_APP_BACKEND_URL;
  }
}
</script>


<style scoped>

</style>