<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emits = defineEmits(['update:currentPage'])

const changePage = (page) => {
  page = Math.max(1, Math.min(page, props.totalPages))
  emits('update:currentPage', page)
}
const getPagesToShow = () => {
  const pageRange = 5
  const startPage = Math.max(1, Math.min(props.currentPage - 2, props.totalPages - pageRange + 1))
  return [...Array(pageRange)].map((_, i) => startPage + i)
}

const getPageStyles = (page) => {
  return {
    'background-color': page === props.currentPage ? 'rgb(246, 55, 93)' : 'transparent',
    color: page === props.currentPage ? '#fff' : '#333'
  }
}

const PAGES_TO_SHOW = 5
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
