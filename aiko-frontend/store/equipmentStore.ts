import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    equipmentData: [] as any[],
    equipmentStateData: [] as any[],
    equipmentStateHistoryData: [] as any[],
    equipmentPositionHistoryData: [] as any[],
  }),
  actions: {
    async loadData() {
      try {
        const responseEquipment = await fetch('/data/equipment.json');
        this.equipmentData = await responseEquipment.json();

        const responseState = await fetch('/data/equipmentState.json');
        this.equipmentStateData = await responseState.json();

        const responseStateHistory = await fetch('/data/equipmentStateHistory.json');
        this.equipmentStateHistoryData = await responseStateHistory.json();

        const responsePositionHistory = await fetch('/data/equipmentPositionHistory.json');
        this.equipmentPositionHistoryData = await responsePositionHistory.json();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }
});
