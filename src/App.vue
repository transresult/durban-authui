<template>
  <v-app>
    <v-main>
      <admin-panel/>
      <durban-button text="Seitenelement erstellen" postbackurl="/test"/>
    </v-main>
  </v-app>
</template>

<script>
import AdminPanel from './components/adminPanel';
import DurbanButton from "@/components/durbanButton";

export default {
  name: 'App',

  components: {
    DurbanButton,
    AdminPanel,
  },

  data: () => ({
    //
  }),
};
</script>
