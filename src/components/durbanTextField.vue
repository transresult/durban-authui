<template>
  <div class="v-application v-application--is-ltr" id="app" data-app="true">
    <v-text-field
        id="durbanTextField"
        v-bind="parentAttrs"
        :value="value"
        :rules="validationRules"
        @input="$emit('input', $event)"
    ></v-text-field>
  </div>
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
      type: String,
      default: ''
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
      const find   = string.find(v => search.test(v))
      const result = find ? find.split(':') : false

      console.log(result)
      if (!result) return result

      return {key: result[0].trim(), value: result[1]}
    }
  },
  computed: {
    validationRules() {
      if (!this.parentAttrs.find(v => v.validation)) return;
      console.log(this.parentAttrs.find(v => v.validation))

      const rules            = []
      const validationObject = this.parentAttrs.find(v => v.validation)
      console.log(validationObject)
      const validationArray = validationObject.validation.split(',').map(v => v.trim())
      // const validation = this.$props.validation.split(',') // For local Testing

      console.log('validation', validationArray)
      validationArray.find(v => v == "required") ? rules.push(this.rules.required) : null
      validationArray.find(v => v == "email") ? rules.push(this.rules.email) : null
      validationArray.find(v => v == "numberonly") ? rules.push(this.rules.numberonly) : null
      validationArray.find(v => v == "stringonly") ? rules.push(this.rules.stringonly) : null

      const maxlen = this.findObjectInString(validationArray, 'maxlen')
      if (maxlen) {
        this.maxlen        = parseInt(maxlen.value)
        this.rules.counter = true
        rules.push(this.rules.maxLength)
      }

      console.log("rules", rules)
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
<style lang="css">

/* Overwritting wrong generated text-field-label style by vuetify */

#durbanTextField .v-label {
  left: 0 !important;
  right: auto !important;
  position: absolute !important;
}
</style>
