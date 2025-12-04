


<template>
  <div class="container ">
  <Message class="justify-center" severity="success" variant="outlined">Добро пожаловать на сайт!</Message>

  <Message class="justify-center" severity="info" variant="outlined">Сайт разработан студентом группы 609-21, Бельтюков Михаил Олегович
  </Message>
  </div>
</template>

<script>
import Message from 'primevue/message';
export default {
  name: "HomePage",
  components: {Message},
}
</script>
<style scoped>

</style>