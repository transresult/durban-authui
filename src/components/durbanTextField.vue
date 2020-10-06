<template>
  <v-text-field
      v-bind="parentAttrs"
      :value="value"
      @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
//  https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
// https://www.youtube.com/watch?v=j7Yj671ID8Q
// https://vuejs.org/v2/api/#vm-attrs

// merke: wenn du keine PROPS definierist, dann werden die Parentattribute einefach an das erste Element attached
//        dieses Verhaltne kann mit inheritAttrs=false deaktivert werdne (https://vuejs.org/v2/api/#inheritAttrs)
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      parentAttrs: [],
      id: 'arnim',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
      },
    };
  },
  methods: {},
  mounted() {
    let parentElAttrs = this.$el.parentElement.attributes
    this.parentAttrs  = Object.entries(parentElAttrs).map(item => ({[item[1].name]: item[1].value}))
    console.log("parentAttrs", this.parentAttrs)
    this.$slots
  }
};
</script>
