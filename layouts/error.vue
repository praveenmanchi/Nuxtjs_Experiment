<template>
    <div class="error-page">
      <div class="container">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <p class="error-desc">{{ error.message }}</p>
        <nuxt-link to="/" class="home-link">
          Return to Home
        </nuxt-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['error'],
    layout: 'default'
  }
  </script>