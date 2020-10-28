<template>
  <v-text-field
      v-bind="parentAttrs"
      :value="value"
      :rules="validationRules"
      @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

//  https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
// https://www.youtube.com/watch?v=j7Yj671ID8Q
// https://vuejs.org/v2/api/#vm-attrs

// merke: wenn du keine PROPS definierist, dann werden die Parentattribute einefach an das erste Element attached
//        dieses Verhaltne kann mit inheritAttrs=false deaktivert werdne (https://vuejs.org/v2/api/#inheritAttrs)
export default {
  props: {
    value: {
      type: String
    },
    validation: String
  },
  data() {
    return {
      parentAttrs: [],
      maxlen: 0,
      rules: {
        required: (value) => !!value || 'Required.',
        maxLength: (value) => value.length <= this.maxlen || `Max ${this.maxlen} characters`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        numberonly: (value) => !isNaN(value) || 'Only Numbers allowed.',
        stringonly: (value) => isNaN(value) || 'Only String allowed.',
      },
    };
  },
  methods: {
    findObjectInString(string, key) {
      const search = new RegExp(key, 'i')
      const result = string.find(v => search.test(v)).split(':')

      return {key: result[0].trim(), value: result[1]}
    }
  },
  computed: {
    validationRules() {
      const rules      = []
      const validation = this.parentAttrs.find(v => v.validation)
      // const validation = this.$props.validation.split(',') // For local Testing

      if (!validation) return;
      console.log(validation)
      validation.find(v => v == "required") ? rules.push(this.rules.required) : null
      validation.find(v => v == "email") ? rules.push(this.rules.email) : null
      validation.find(v => v == "numberonly") ? rules.push(this.rules.numberonly) : null
      validation.find(v => v == "stringonly") ? rules.push(this.rules.stringonly) : null

      const maxlen = this.findObjectInString(validation, 'maxlen')
      if (maxlen) {
        this.maxlen        = parseInt(maxlen.value)
        this.rules.counter = true
        rules.push(this.rules.maxLength)
      }

      console.log(rules)
      return rules
    }
  },
  async mounted() {
    let parentElAttrs = this.$el.parentElement.attributes
    this.parentAttrs  = await Object.entries(parentElAttrs).map(item => ({[item[1].name]: item[1].value}))
    console.log("parentAttrs", this.parentAttrs)
  }
};
</script>
