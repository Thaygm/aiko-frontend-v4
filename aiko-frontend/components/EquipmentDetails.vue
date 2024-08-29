<template>
  <div v-if="selectedEquipment" class="card shadow-sm border-light mb-4">
    <div class="card-body">
      <h2 class="card-title mb-3">{{ selectedEquipment.name }}</h2>

      <div v-if="latestState" class="mb-3">
        <h5 class="card-subtitle mb-2 text-muted">Estado Atual</h5>
        <p class="card-text">
          <i :class="iconClass"></i> {{ getStateName(latestState.equipmentStateId) }}
        </p>
      </div>

      <div v-if="positions.length > 0" class="mb-4">
        <h5 class="card-subtitle mb-2 text-muted">Histórico de Posições</h5>
        <ul class="list-unstyled">
          <li v-for="pos in positions" :key="pos.date" class="mb-2">
            {{ formatDate(pos.date) }} - Lat: {{ pos.lat }}, Lon: {{ pos.lon }}
          </li>
        </ul>
      </div>

      <div v-if="states.length > 0" class="mb-4">
        <h5 class="card-subtitle mb-2 text-muted">Histórico de Estados</h5>
        <ul class="list-unstyled">
          <li v-for="state in states" :key="state.date" class="mb-2">
            {{ formatDate(state.date) }} - Estado: {{ getStateName(state.equipmentStateId) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    selectedEquipment: {
      type: Object as () => { id: string; name: string } | null,
      default: null,
    },
    stateData: Array,
    positionHistoryData: Array,
    stateHistoryData: Array,
  },
  setup(props) {
    const latestState = computed(() => {
      if (props.selectedEquipment) {
        const states = getStates(props.selectedEquipment.id);
        return states.length > 0 ? states[0] : null;
      }
      return null;
    });

    const positions = computed(() => {
      if (props.selectedEquipment) {
        return getPositions(props.selectedEquipment.id);
      }
      return [];
    });

    const states = computed(() => {
      if (props.selectedEquipment) {
        return getStates(props.selectedEquipment.id);
      }
      return [];
    });

    const getPositions = (equipmentId: string) => {
      const positionHistory = props.positionHistoryData.find(ph => ph.equipmentId === equipmentId);
      return positionHistory ? positionHistory.positions : [];
    };

    const getStates = (equipmentId: string) => {
      const stateHistory = props.stateHistoryData.find(sh => sh.equipmentId === equipmentId);
      return stateHistory ? stateHistory.states : [];
    };

    const getStateName = (stateId: string) => {
      const state = props.stateData.find(s => s.id === stateId);
      return state ? state.name : 'Desconhecido';
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const iconClass = computed(() => {
      const stateId = latestState.value ? latestState.value.equipmentStateId : null;
      switch (stateId) {
        case 'operating':
          return 'bi bi-hammer';
        case 'stopped':
          return 'bi bi-slash-circle';
        case 'maintenance':
          return 'bi bi-tools';
        default:
          return 'bi bi-exclamation-circle-fill';
      }
    });

    return {
      latestState,
      positions,
      states,
      getPositions,
      getStates,
      getStateName,
      formatDate,
      iconClass,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-subtitle {
  font-size: 1.25rem;
  font-weight: 500;
}

.card-text {
  font-size: 1rem;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.list-unstyled li {
  padding: 0.5rem 0;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
