<template>
  <div></div>
</template>

<script>
export default {
  name: 'callback',
  mounted () {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ path: '/' })
    })
  }
}
</script>
