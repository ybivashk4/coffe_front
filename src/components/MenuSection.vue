<template>
<div class="row">
   <h2 class="card-header">{{title}}</h2>
    <hr>
    <div class="row">
            <div
                style="margin-left: 0.5em; margin-top: 0.5em"
                v-for="menuItem in menuItems"
                :key="menuItem.id"
                class="card mb-4 box-shadow w-25 h-25 me-auto">
                <MenuItem
                    :id="menuItem.id"
                    :name="menuItem.name"
                    :description="menuItem.description"
                    :price="menuItem.price"
                    :allergens="menuItem.allergens"
                    :image="menuItem.image"/>

            </div>
    </div>
</div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
export default {
  name: "MenuSection",

  components: {
    MenuItem
  },

  props: {
      title: {
          type: String,
          required: true
      },
      menuItems: {
          type: Array,
          required: true,
          default: () => []
      }
  }
}
</script>

<style scoped>

</style>