<script>


</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Vista de alertas</h2>
    <ul>
      <li v-for="mencion in menciones" :key="mencion.id">
        {{ mencion.titulo }}
      </li>
    </ul>
    </main>
  </div>
</template>

<style scoped>

</style>
