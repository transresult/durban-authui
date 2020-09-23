import Vue from 'vue';
import vueCustomElement from 'vue-custom-element'
import adminPanel from './components/adminPanel';
import durbanButton from './components/durbanButton';

Vue.use(vueCustomElement);

Vue.customElement('vuetify-nav-drawer', adminPanel, {
    shadow: false // Deaktivert Shadow-DOM
})

Vue.customElement('vue-durban-button', durbanButton, {
    shadow: false // Deaktivert Shadow-DOM
})
