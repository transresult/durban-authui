<template>
  <div class="v-application v-application--is-ltr" id="app" data-app="true">
    <v-navigation-drawer
        id="mo_adminPanel"
        v-model="drawer"
        :mini-variant.sync="mini"
        :expand-on-hover="expand"
        height="auto"
        class="hidden-sm-and-down"
        permanent
    >

      <template v-slot:prepend>
        <v-list dense>
          <v-list-item two-line :style="{'padding-left': '8px'}">
            <v-list-item-avatar v-text="userInitials" :style="{'background-color': '#9ba746', 'color': '#fff'}">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ globalUsername }}</v-list-item-title>
              <v-list-item-subtitle>{{ globalEmail }}</v-list-item-subtitle>
            </v-list-item-content>
            <!--            <v-list-item-action>-->
            <!--              <v-icon>mdi-menu-down</v-icon>-->
            <!--            </v-list-item-action>-->
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
          nav
          dense
          v-for="(item, index) in navitems"
          :key="index"
      >
        <v-list-item v-if="item.icon" link @click.prevent="openUrl(item)">
          <v-list-item-icon class="mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>

        <v-divider v-else-if="item.divider"/>
        <v-subheader v-else-if="item.subheader">{{ item.subheader }}</v-subheader>

      </v-list>
    </v-navigation-drawer>

    <v-sheet id="iframe-window" v-if="dialogIframe">
      <v-card>
        <v-card-title class="py-0">
          {{ dialogTitle }}
          <v-btn icon absolute right @click="dialogIframe = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0" style="height: 75vh">
            <iframe :src="dialogUrl" width="100%" height="100%"></iframe>
          </v-container>
        </v-card-text>
      </v-card>
    </v-sheet>

    <!--    <v-dialog-->
    <!--        v-model="dialogIframe"-->
    <!--        persistent-->
    <!--        max-width="75%"-->
    <!--        max-heigth="75%"-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-card-title>-->
    <!--          {{ dialogTitle }}-->
    <!--          <v-btn icon absolute right @click="dialogIframe = false">-->
    <!--            <v-icon>mdi-close</v-icon>-->
    <!--          </v-btn>-->
    <!--        </v-card-title>-->
    <!--        <v-card-text>-->
    <!--          <v-content style="height: 500px">-->
    <!--            <iframe :src="dialogUrl" width="100%" height="100%"></iframe>-->
    <!--          </v-content>-->
    <!--        </v-card-text>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->

  </div>
</template>

<script>
/* global __doPostBack adminpanel */

export default {
  data() {
    return {
      dialogIframe: false,
      dialogUrl: "",
      dialogTitle: "",
      globalUsername: "Benutzer",
      globalEmail: "user@example.com",
      drawer: true,
      expand: true,
      mini: true,
      navitems: [
        {
          "icon": "mdi-power",
          "text": "Abmelden",
          "url": "javascript:__doPostBack('mp$AdminPanel$LogOnStatus$ctl00','')"
        }
      ],
    }
  },
  computed: {
    userInitials: function () {
      return this.globalUsername.charAt(0).toUpperCase() + this.globalUsername.charAt(1).toLowerCase()
    }
  },
  methods: {
    openUrl(item) {
      // const urlTarget = item.urlType == "newWindow" || item.urlType == "iframe" ? "_blank" : "_self"
      // window.open(item.url, urlTarget);

      if (item.urlType == "newWindow" || item.urlType == "iframe") {
        if (this.dialogIframe) return;
        console.log("Open external")
        this.dialogUrl = item.url
        this.dialogTitle = item.text
        this.dialogIframe = true
      } else {
        window.open(item.url, item.urlType);
      }
    },
    doPostback: function () {
      __doPostBack('mp$login$ctl00', '');
    },
  },
  mounted() {
    // this.navitems = [{
    //   "icon": "mdi-playlist-edit",
    //   "text": "Sitemap",
    //   "url": "/editor/cud_sitemap.aspx",
    //   "urlType": "newWindow"
    // }, {"divider": true}, {
    //   "icon": "mdi-account-multiple",
    //   "text": "Usermanagement",
    //   "url": "/editor/usermanage.aspx"
    // }, {
    //   "icon": "mdi-wallpaper",
    //   "text": "Bild bereitstellen",
    //   "url": "/Template/editor/Bootstrap3ImageUpload.aspx",
    //   "urlType": "iframe"
    // }, {"icon": "mdi-key", "text": "Kennwort ändern", "url": "/login.aspx"}, {
    //   "icon": "mdi-cog",
    //   "text": "Einstellungen",
    //   "url": "/editor/settings/"
    // }, {
    //   "icon": "mdi-power",
    //   "text": "Abmelden",
    //   "url": "javascript:__doPostBack('mp$AdminPanel$LogOnStatus$ctl00','')"
    // }]
    console.log("NODE_ENV", process.env.NODE_ENV)
    if (adminpanel) {
      this.navitems = adminpanel.navitems
      this.globalUsername = adminpanel.user.UserName
      this.globalEmail = adminpanel.user.Email
    } else {
      console.log("Global 'adminpanel' not defined.")
    }
  }
}
</script>

<style lang="css">

#mo_adminPanel, vuetify-nav-drawer {
  position: fixed;
  margin-top: 115px;
  left: 0;
  overflow: hidden;
  z-index: 10000 !important;
  background-color: white;
}

#iframe-window {
  background-color: transparent;
  width: 75vw;
  height: 75vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

/* Overwritting Durban CSS */

.v-divider {
  margin: 0;
}

</style>
