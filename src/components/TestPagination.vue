<script setup>
import { defineProps, defineEmits, ref} from 'vue'
import axios from 'axios'

const props = defineProps({
  pageSize: Number,
})

const emits = defineEmits(['update:currentPage', 'update:totalItems', 'update:items', 'update:totalPages'])

const currentPage = ref(1)
const totalPages = ref(0)
const totalItems = ref(0)
const items = ref([])

const fetchData = async (page, size) => {
  try {
    const response = await axios.get(`http://localhost:8080/conductores`, {
      params: {
        page: page - 1, // La API puede esperar que la paginación comience en 0
        size,
      }
    })
    // Actualiza el estado de tu componente con la respuesta
    totalPages.value = response.data.totalPages
    totalItems.value = response.data.totalElements
    items.value = response.data.content

    // Emite el evento para actualizar el total de páginas, el total de items y los items
    emits('update:totalPages', totalPages.value)
    emits('update:totalItems', totalItems.value) 
    emits('update:items', items.value) 
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error)
  }
}


const changePage = (page) => {
    page = Math.max(1, Math.min(page, totalPages.value))
    currentPage.value = page
    fetchData(page, props.pageSize)
    emits('update:currentPage', page)
}

const getPagesToShow = () => {
  const pageRange = totalPages.value < 5 ? totalPages.value : 5
  const startPage = Math.max(1, Math.min( currentPage.value - 2, totalPages.value - pageRange + 1))
  return [...Array(pageRange)].map((_, i) => startPage + i)
}

const getPageStyles = (page) => {
  return {
    'background-color': page === currentPage.value ? 'rgb(246, 55, 93)' : 'transparent',
    color: page === currentPage.value ? '#fff' : '#333'
  }
}

fetchData(currentPage.value, props.pageSize)
</script>

<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-end">
        <!-- Botón para retroceder a la primer página -->
        <li class="page-item">
          <button
            class="page-link"
            @click="changePage(1)"
            :disabled="currentPage === 1"
            style="border: none; border-radius: 50%; color: #333"
          >
            <font-awesome-icon :icon="['fas', 'backward-step']" style="color: #808080" />
          </button>
        </li>

        <!-- Botón para retroceder una página -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            style="border: none; border-radius: 50%; color: #333"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" style="color: #808080" />
          </button>
        </li>

        <!-- Mostrar páginas -->
        <li v-for="page in getPagesToShow()" :key="page" class="page-item">
          <button
            class="page-link text-secondary"
            @click="changePage(page)"
            :style="getPageStyles(page)"
            style="border: none; border-radius: 50%"
          >
            {{ page }}
          </button>
        </li>

        <!-- Botón para avanzar una página -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            style="border: none; border-radius: 50%; color: #333"
          >
            <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #808080" />
          </button>
        </li>

        <!-- Botón para avanzar a la última página -->
        <li class="page-item">
          <button
            class="page-link"
            @click="changePage(totalPages)"
            :disabled="currentPage === totalPages"
            style="border: none; border-radius: 50%; color: #333"
          >
            <font-awesome-icon :icon="['fas', 'forward-step']" style="color: #808080" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
