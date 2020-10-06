<template>
  <v-app>
    <v-main>
      <admin-panel v-if="true"/>
      <durban-button btntext="Seitenelement erstellen"
                     block small
                     postbackurl='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("mp$ContentZone$ctl49", "", false, "", "/editor/pageitem/new/0/default/", false, true))'
                     color="error"/>
      <durban-text-field value="" color="green" placeholder="test"/>
    </v-main>
  </v-app>
</template>

<script>
import AdminPanel      from './components/adminPanel';
import DurbanButton    from "@/components/durbanButton";
import DurbanTextField from "./components/durbanTextField";

export default {
  name: 'App',

  components: {
    DurbanTextField,
    DurbanButton,
    AdminPanel,
  },

  data: () => ({
    //
  }),
};
</script>
