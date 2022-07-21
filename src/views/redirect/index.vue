<script>
export default {
  name: 'Redirect',
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({
      path: '/' + (Array.isArray(path) ? path.join('/') : path),
      query
    })
  },
  render(h) {
    return h() // avoid warning message
  }
}
</script>
