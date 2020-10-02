<template>
  <v-app>
    <v-main>
      <admin-panel/>
      <durban-button text="Seitenelement erstellen"
                     postbackurl='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("
                     mp$ContentZone$ctl49
      ", "", false, "", "/editor/pageitem/new/0/default/", false, true))'/>
      <durban-text-field value="" placeholder="test"/>
    </v-main>
  </v-app>
</template>

<script>
import AdminPanel from './components/adminPanel';
import DurbanButton from "@/components/durbanButton";
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
