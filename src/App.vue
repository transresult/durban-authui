<template>
  <v-app>
    <v-main>
      <admin-panel v-if="false"/>
      <durban-button v-if="false"
                     btntext="Seitenelement erstellen"
                     block small
                     postbackurl='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("mp$ContentZone$ctl49", "", false, "", "/editor/pageitem/new/0/default/", false, true))'
                     color="error"
      />
      <durban-text-field v-if="false"
                         value="Firmenname | Das Besondere"
                         placeholder="Titel der Webseite"
                         validation="required, maxlen: 7, stringonly"
      />
      <editor-settings
      />
    </v-main>
  </v-app>
</template>

<script>
import AdminPanel      from '@/components/adminPanel';
import DurbanButton    from "@/components/durbanButton";
import DurbanTextField from "@/components/durbanTextField";
import EditorSettings  from '@/components/editorSettings'

export default {
  name: 'App',

  components: {
    DurbanTextField,
    DurbanButton,
    AdminPanel,
    EditorSettings,
  },

  data: () => ({
    //
  }),
};
</script>
