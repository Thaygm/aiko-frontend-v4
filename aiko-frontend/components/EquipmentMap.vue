<template>
  <div>
    <h1>Mapa de Equipamentos</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>
    <div v-if="selectedEquipment">
      <h2>{{ selectedEquipment.name }}</h2>
      <div v-if="getPositions(selectedEquipment.id).length > 0">
        <h3>Histórico de Posições:</h3>
        <ul>
          <li v-for="pos in getPositions(selectedEquipment.id)" :key="pos.date">
            {{ pos.date }} - Lat: {{ pos.lat }}, Lon: {{ pos.lon }}
          </li>
        </ul>
      </div>
      <div v-if="getStates(selectedEquipment.id).length > 0">
        <h3>Histórico de Estados:</h3>
        <ul>
          <li v-for="state in getStates(selectedEquipment.id)" :key="state.date">
            {{ state.date }} - Estado: {{ getStateName(state.equipmentStateId) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const equipmentData = ref<any[]>([]);
    const stateData = ref<any[]>([]);
    const stateHistoryData = ref<any[]>([]);
    const positionHistoryData = ref<any[]>([]);
    const selectedEquipment = ref<any>(null);

    const loadData = async () => {
      try {
        const responseEquipment = await fetch('/data/equipment.json');
        equipmentData.value = await responseEquipment.json();

        const responseState = await fetch('/data/equipmentState.json');
        stateData.value = await responseState.json();

        const responseStateHistory = await fetch('/data/equipmentStateHistory.json');
        stateHistoryData.value = await responseStateHistory.json();

        const responsePositionHistory = await fetch('/data/equipmentPositionHistory.json');
        positionHistoryData.value = await responsePositionHistory.json();

        initializeMap();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    const initializeMap = () => {
      const L = useNuxtApp().$L;
      const map = L.map('map').setView([0, 0], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      equipmentData.value.forEach(equipment => {
        const positions = getPositions(equipment.id);
        const states = getStates(equipment.id);

        if (positions.length > 0) {
          const latestPosition = positions[0];
          const latestState = states.length > 0 ? states[0] : null; 
          const iconHtml = getIconForState(latestState ? latestState.equipmentStateId : null);
          const icon = L.divIcon({
            html: iconHtml,
            className: 'custom-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          });

          L.marker([latestPosition.lat, latestPosition.lon], { icon }).addTo(map)
            .bindPopup(`
              <b>${equipment.name}</b><br>
              Lat: ${latestPosition.lat}, Lon: ${latestPosition.lon}<br>
              Estado: ${latestState ? getStateName(latestState.equipmentStateId) : 'Desconhecido'}
            `)
            .on('click', () => selectEquipment(equipment));
        }
      });
    };

    const getPositions = (equipmentId: string) => {
      const positionHistory = positionHistoryData.value.find(ph => ph.equipmentId === equipmentId);
      return positionHistory ? positionHistory.positions : [];
    };


    const getStates = (equipmentId: string) => {
      const stateHistory = stateHistoryData.value.find(sh => sh.equipmentId === equipmentId);
      return stateHistory ? stateHistory.states : [];
    };

    const getStateName = (stateId: string) => {
      const state = stateData.value.find(s => s.id === stateId);
      return state ? state.name : 'Desconhecido';
    };

    const getIconForState = (stateId: string | null) => {
      switch (stateId) {
        case 'operating':
          return '<i class="bi bi-hammer" style="color: green;"></i>';
        case 'stopped':
          return '<i class="bi bi-slash-circle" style="color: red;"></i>';
        case 'maintenance':
          return '<i class="bi bi-tools" style="color: orange;"></i>';
        default:
          return '<i class="bi bi-exclamation-circle-fill" style="color: gray;"></i>';
      }
    };

    const selectEquipment = (equipment: any) => {
      selectedEquipment.value = equipment;
    };

    onMounted(loadData);

    return {
      equipmentData,
      stateData,
      stateHistoryData,
      positionHistoryData,
      getPositions,
      getStates,
      getStateName,
      getIconForState,
      selectedEquipment
    };
  },
});
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}

.custom-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
}
</style>
