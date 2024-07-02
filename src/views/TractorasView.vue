<template>
  <div class="container">
    <h2 class="text-dark">Tabla de Tractoras</h2>
    <DwTable :items="paginatedTractoras">
      <template #header>
        <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
      </template>
      <template #default="{ item }">
        <td>{{ item.Matrícula }}</td>
        <td>{{ item.Marca }}</td>
        <td>{{ item.PMA }}</td>
        <td>{{ item['Nombre Conductor'] }}</td>
      </template>
    </DwTable>
    <div class="text-secondary">
      De {{ (currentPage - 1) * itemsPerPage + 1 }} a
      {{ Math.min(currentPage * itemsPerPage, totalItems) }} de {{ totalItems }} registros
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="currentPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'
import DwTable from '@/components/DwTable.vue'

const tractoras = ref([])
const currentPage = ref(1)
const itemsPerPage = 5
const totalItems = ref(0)

// Calcula dinámicamente las tractoras que se deben mostrar en la página actual
const paginatedTractoras = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return tractoras.value.slice(start, start + itemsPerPage)
})

// Calcula el número total de páginas requeridas para mostrar todas las tractoras
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

// Headers para la tabla
const tableHeaders = ['Matrícula', 'Marca', 'PMA', 'Nombre Conductor']

// Función para obtener datos de la API
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tractoras')
    const data = Array.isArray(response.data) ? response.data : JSON.parse(response.data)
    tractoras.value = data.map((tractora) => ({
      Matrícula: tractora.matricula,
      Marca: tractora.modelo?.marca || 'Sin Asignar',
      PMA: tractora.caracteristicas?.carga?.pma || '0',
      'Nombre Conductor': tractora.conductor?.nombre || 'Sin Asignar'
    }))
    totalItems.value = tractoras.value.length
  } catch (error) {
    console.error('Error fetching tractoras:', error)
  }
}

onMounted(fetchData)
</script>
