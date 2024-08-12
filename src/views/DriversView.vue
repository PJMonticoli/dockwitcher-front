<script setup>
import { ref, onMounted, watch } from 'vue'
import { format } from 'date-fns'
import DwTable from '@/components/DwTable.vue'
import Pagination from '@/components/Pagination.vue'
import { driversStore } from '@/_stores/driversStore'
import { storeToRefs } from 'pinia'

const currentPage = ref(0) // pageable.pageNumber (inicialmente 0 para la primera página)
const totalItems = ref(0) // totalElements
const totalPages = ref(0) // totalPages
const items = ref([]) // content
const pageSize = ref(10) // pageable.pageSize (inicialmente 10)

const store = driversStore()
const { content, pagination, sort } = storeToRefs(store)

const updateCurrentPage = (page) => {
  currentPage.value = page
  fetchDrivers()
}

const updatePageSize = (event) => {
  pageSize.value = parseInt(event.target.value)
  currentPage.value = 0 // Reinicia a la primera página
  fetchDrivers()
}

const updateTotalPages = (pages) => {
  totalPages.value = pages
}

const updateItems = (content) => {
  items.value = content
}

const updateTotalItems = (cantItems) => {
  totalItems.value = cantItems
}

const formatDate = (date) => {
  // Verifica si date es null
  if (!date) {
    return 'N/D'
  }
  return format(new Date(date), 'dd/MM/yyyy')
}

const fetchDrivers = () => {
  store.getDrivers(currentPage.value, pageSize.value, 'nombre', 'asc')
}

onMounted(() => {
  fetchDrivers()
})

watch([currentPage, pageSize], () => {
  fetchDrivers()
})

function changePage(page) {
  updateCurrentPage(page)
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
        <input type="text" placeholder="Buscar..." class="search-input ms-auto px-2" />
      </div>
    </div>
    <div class="divider"></div>
    <!-- Paso como slots para items los items que se van a mostrar en la tabla para la pagina actual -->
    <DwTable :items="content">
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
