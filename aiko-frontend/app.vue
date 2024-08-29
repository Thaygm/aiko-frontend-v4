<template>
  <div id="app">
    <header>
      <img src="/assets/images/aiko.png" alt="Logo" class="logo Aiko" />
      <h1>Gestão de Equipamentos</h1>
    </header>
    <main>
      <EquipmentMap />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EquipmentMap from '@/components/EquipmentMap.vue';

export default defineComponent({
  components: {
    EquipmentMap
  }
});
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  background-color: #f4f4f4;
  min-height: 100vh;
  margin: 0;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #000000, #003184, #00DF00);
  color: white;
  padding: 1rem;
}

.logo {
  height: 60px;
}

main {
  padding: 2rem;
}
</style>
