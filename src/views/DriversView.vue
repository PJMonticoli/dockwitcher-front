<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { format } from 'date-fns'
import DwTable from '@/components/DwTable.vue'
import Pagination from '@/components/Pagination.vue'
import { driversStore } from '@/_stores/driversStore'
import { storeToRefs } from 'pinia'

const currentPage = ref(0)
const pageSize = ref(10)
const searchQuery = ref('')

const store = driversStore()
const { content, pagination, sort } = storeToRefs(store)

const fetchDrivers = () => {
  store.getDrivers(
    currentPage.value,
    pageSize.value,
    sort.value.field,
    sort.value.direction,
    searchQuery.value
  )
}

const filteredDrivers = computed(() => {
  if (!searchQuery.value) {
    return content.value
  }
  return content.value.filter(
    (driver) =>
      driver.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const updateCurrentPage = (page) => {
  currentPage.value = page
  fetchDrivers()
}

const updatePageSize = (event) => {
  pageSize.value = parseInt(event.target.value, 10)
  currentPage.value = 0
  fetchDrivers()
}

watch([currentPage, pageSize, searchQuery], () => {
  fetchDrivers()
})

onMounted(() => {
  fetchDrivers()
})

function changePage(page) {
  updateCurrentPage(page)
}

const formatDate = (date) => {
  if (!date) {
    return 'N/D'
  }
  return format(new Date(date), 'dd/MM/yyyy')
}
</script>

<template>
  <div class="dw-table-container">
    <div class="p-3 d-flex justify-content-between">
      <p class="fs-4 fw-medium m-0">Lista Conductores</p>
    </div>
    <div class="divider"></div>
    <div class="p-3">
      <div class="dw-table-controls d-flex align-items-center gap-2">
        <select @change="updatePageSize" id="itemsPerPage" class="py-1 px-1">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <label for="itemsPerPage">Por página</label>
        <input
          type="text"
          placeholder="Buscar..."
          v-model="searchQuery"
          class="search-input ms-auto px-2"
        />
      </div>
    </div>
    <div class="divider"></div>
    <DwTable :items="filteredDrivers">
      <template v-slot:header>
        <th class="p-3">Nombre</th>
        <th class="p-3">Identificacion</th>
        <th class="p-3">Licencias</th>
        <th class="p-3">Email</th>
        <th class="p-3">Telefono</th>
        <th class="p-3">Caducidad</th>
      </template>
      <template v-slot="{ item }">
        <td class="p-3">{{ item.nombre }}</td>
        <td class="p-3">{{ item.identificacion }}</td>
        <td class="p-3">{{ item.licencia }}</td>
        <td class="p-3">{{ item.email }}</td>
        <td class="p-3">{{ item.telefono }}</td>
        <td class="p-3">{{ formatDate(item.fechaCaducidad) }}</td>
      </template>
    </DwTable>
    <Pagination :pagination="pagination" @change-page="changePage" />
    <div class="d-flex justify-content-between align-items-start px-3 pb-3"></div>
  </div>
</template>
