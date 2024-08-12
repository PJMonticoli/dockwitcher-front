<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleNewClick = () => {
  const redirectionPaths = {
    '/drivers': '/newdriver'
  }

  const redirectTo = redirectionPaths[route.path] || '/home'

  router.push(redirectTo)
}
</script>

<template>
  <nav class="navigation-bar d-flex align-items-start">
    <ul class="w-100 px-4 mt-2 d-flex justify-content-between">
      <li class="d-flex align-items-center">
        <span class="me-4 fs-5 fw-medium">Recepciones</span>
        <img src="../assets/images/icons8-home-24.png" width="20px" />
        <span class="ms-1 fs-5 fw-medium">- Planificación</span>
        <span class="enabled ms-1 fs-5 fw-medium">- Recepciones</span>
      </li>
      <li v-if="route.path !== '/home'">
        <button class="btn btn-navigation-bar ms-2" @click="handleNewClick">Nuevo</button>
        <button class="btn btn-navigation-bar ms-2">Importar</button>
      </li>
    </ul>
  </nav>
</template>
