<script setup>
import { RouterView } from 'vue-router'

import HeaderBar from './components/HeaderBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <Sidebar />
  <div class="w-100">
    <div class="headers w-100">
      <HeaderBar />
      <div class="line"></div>
      <NavigationBar />
    </div>
    <div class="container">
      <h1>Hola</h1>
      <RouterView />
    </div>
  </div>
</template>
