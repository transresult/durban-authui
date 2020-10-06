<template>
  <div class="v-application v-application--is-ltr" id="app" data-app="true">
    <v-btn v-bind="parentAttrs" @click="openUrl(postbackurl, '_self')">{{ btntext }}</v-btn>
  </div>
</template>

<script>

export default {
  data: () => ({
    parentAttrs: [],
  }),
  props: {
    btntext: {
      type: String,
      default: 'Button'
    }
  },
  methods: {
    openUrl(url, target) {
      console.log(url)
      const urlTarget = target ? target : "_self"
      window.open(url, urlTarget);
    },
  },
  mounted() {
    let parentElAttrs = this.$el.parentElement.attributes
    this.parentAttrs  = Object.entries(parentElAttrs).map(item => ({[item[1].name]: item[1].value}))
    console.log("parentAttrs", this.parentAttrs)
  }
}
</script>
