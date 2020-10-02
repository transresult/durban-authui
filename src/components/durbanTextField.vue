<template>
  <div id="Arnim Testet">
    <v-text-field
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event)"
    ></v-text-field>
  </div>
</template>

<script>
//  https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
// https://www.youtube.com/watch?v=j7Yj671ID8Q
// https://vuejs.org/v2/api/#vm-attrs

// merke: wenn du keine PROPS definierist, dann werden die Parentattribute einefach an das erste Element attached
//        dieses Verhaltne kann mit inheritAttrs=false deaktivert werdne (https://vuejs.org/v2/api/#inheritAttrs)
export default {
  inheritAttrs: false,
  props: ['value'],
  data() {
    return {
      id: 'arnim',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
      },
    };
  },
  methods: {},
  mounted() {
    // console.log("$attrs", this.$attrs)
    // console.log("$props", this.$props)
  }
};
</script>
