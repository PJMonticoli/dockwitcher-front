<script setup>
import { onMounted, ref, computed} from 'vue';
import axios from 'axios';
// import { format } from 'date-fns';
import DwTable from '@/components/DwTable.vue';
import Pagination from '@/components/Pagination.vue';

// Define las refs para items y headers
const items = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const totalItems = ref(0);
const itemsPerPage = ref(10); // Defino cuántos elementos deseas mostrar por página

// Función para obtener datos de la API
const fetchData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    items.value = response.data; 
    calculateTotalPages();
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

// Función para calcular el total de páginas
const calculateTotalPages = () => {
  totalItems.value = items.value.length;
  totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
};

// Funcion que calcula los items a mostrar en la tabla para la pagina actual
const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return items.value.slice(startIndex, endIndex);
});

const updateCurrentPage = (page) => {
  currentPage.value = page;
};

const updateItemsPerPage = (event) => {
  itemsPerPage.value = parseInt(event.target.value);
  currentPage.value = 1;
  calculateTotalPages();
};


// Llama a fetchData cuando el componente se monte
onMounted(fetchData);
</script>

<template>
  <div class="dw-table-container">
    <div class="p-3">
      <p class="fs-4 fw-medium m-0">Lista Conductores</p>
    </div>
    <div class="divider"></div>
    <div class="p-3 "> 
      <div class="dw-table-controls d-flex align-items-center gap-2">
        <select @change="updateItemsPerPage" id="itemsPerPage" class="py-1 px-1">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <label for="itemsPerPage">Por página</label>
        <input type="text" placeholder="Buscar..." class="search-input ms-auto px-2" />
      </div>
    </div>
    <div class="divider"></div>
    <DwTable :items="displayedItems" >
      <template v-slot:header>
        <th class="p-3">UserId</th>
        <th class="p-3">Titulo</th>
        <th class="p-3">Cuerpo</th>
        <th class="p-3">Id</th>
      </template>
      <template v-slot="{ item }">
        <td class="px-3">{{ item.title }}</td>
        <td class="px-3">{{ item.userId }}</td>
        <td class="px-3">{{ item.body }}</td>
        <td class="px-3">{{ item.id }}</td>
      </template>
    </DwTable>
    <div class="d-flex justify-content-between align-items-start px-3 pb-3">
      <span>De {{ (currentPage * itemsPerPage) - itemsPerPage + 1 }} a {{ currentPage * itemsPerPage }} de {{ totalItems }} registros</span>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="updateCurrentPage"/>
    </div>
  </div>
</template>