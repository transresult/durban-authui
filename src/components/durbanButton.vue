<template>
  <v-btn small @click="openUrl(postbackurl, '_self')">{{ text }}</v-btn>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      default: "... erstellen"
    },
    postbackurl: {
      type: String,
      default: "#"
    }
  },
  data: () => ({
    //
  }),
  methods: {
    openUrl(url, target) {
      const urlTarget = target ? target : "_self"
      window.open(url, urlTarget);
    },
  }
}
</script>
