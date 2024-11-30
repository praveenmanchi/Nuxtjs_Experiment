<template>
  <div class="protected-page">
    <section class="protected-content">
      <div class="container">
        <h1 class="heading-1 text-primary-dark">Protected Content</h1>
        <!-- Your protected content here -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProtectedPage',
  
  middleware: 'nda-auth',

  mounted() {
    // Check validation on component mount
    if (!localStorage.getItem('ndaValidated')) {
      this.$router.push('/nda')
    }
  }
}
</script>