
<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <h1 class="text-9xl">О нас</h1>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="card">
    <Tabs value="0">
      <TabList class="ml-6 p-4">
        <Tab class="ml-6 p-4 " v-for="tab in tabs" :key="tab.title" :value="tab.value">
         <span class="text-color"> {{ tab.title }}</span>
        </Tab>
      </TabList>
      <TabPanels class="ml-6 p-4">
        <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
          <p>{{ tab.content }}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/volt/Tabs.vue';
import TabList from '@/volt/TabList.vue';
import Tab from '@/volt/Tab.vue';
import TabPanels from '@/volt/TabPanels.vue';
import TabPanel from '@/volt/TabPanel.vue';
import { ref } from 'vue';

const tabs = ref([
  { title: 'Кофе', content: 'Вы можете выпить прекрасный кофе в загадочной атмосфере', value: '0' },
  { title: 'Мистическая лавка', content: 'Интересные товары о гаданиях, картах Таро, мистическим событиям', value: '1' },
  { title: 'Заказ гаданий', content: 'Вы можете заказать гадания на удачу, благополучие и прочее', value: '2' }
]);
</script>
