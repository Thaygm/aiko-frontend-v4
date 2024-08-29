<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center text-primary">Monitoramento de Equipamentos Florestais</h1>
    <div class="row">
      <div class="col-lg-8 mb-4">
        <div class="card shadow-sm border-light">
          <div class="card-body">
            <EquipmentMap ref="equipmentMap" @selectEquipment="handleSelectEquipment" />
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <EquipmentDetails :selectedEquipment="selectedEquipment" :stateData="stateData" :positionHistoryData="positionHistoryData" :stateHistoryData="stateHistoryData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EquipmentMap from '@/components/EquipmentMap.vue';
import EquipmentDetails from '@/components/EquipmentDetails.vue';
import { useEquipmentStore } from '@/store/equipmentStore';

const equipmentStore = useEquipmentStore();
const selectedEquipment = ref(null);
const stateData = ref([]);
const positionHistoryData = ref([]);
const stateHistoryData = ref([]);

const handleSelectEquipment = (equipment: any) => {
  selectedEquipment.value = equipment;
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
