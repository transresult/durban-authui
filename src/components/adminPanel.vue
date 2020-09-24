<template>
  <v-navigation-drawer
      id="mo_adminPanel"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      :expand-on-hover="expand"
  >

    <template v-slot:prepend>
      <v-list dense>
        <v-list-item class="pl-1" link two-line>
          <v-list-item-avatar :style="{'background-color': '#9ba746', 'color': '#fff'}">
            <strong>{{ globalUsername.charAt(0).toUpperCase() + globalUsername.charAt(1).toLowerCase() }}</strong>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ globalUsername }}</v-list-item-title>
            <v-list-item-subtitle>{{ globalEmail }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>

    <v-divider></v-divider>

    <v-list
        nav
        dense
        v-for="(item, index) in navItems"
        :key="index"
    >
      <v-divider v-if="item.divider"/>

      <v-list-item class="py-0" v-else link @click.prevent="openUrl(item.url, item.target)">
        <v-list-item-icon class="mr-4">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
/* global __doPostBack adminpanel */

export default {
  data() {
    return {
      globalUsername: "Benutzer",
      globalEmail: "user@example.com",
      drawer: true,
      expand: true,
      mini: true,
      navItems: [{
        "icon": "mdi-playlist-edit",
        "text": "Sitemap",
        "url": "/editor/cud_sitemap.aspx",
        "urlType": "newWindow"
      }, {
        "divider": true
      }, {
        "icon": "mdi-account-multiple",
        "text": "Usermanagement",
        "url": "/editor/usermanage.aspx"
      }, {
        "icon": "mdi-wallpaper", "text": "Bild bereitstellen", "url": "/editor/cud_pic.aspx"
      }, {
        "icon": "mdi-key",
        "text": "Kennwort ändern",
        "url": "/login.aspx"
      }, {
        "icon": "mdi-settings", "text": "Einstellungen", "url": "/editor/settings/"
      }, {
        "icon": "mdi-power",
        "text": "Abmelden",
        "url": "#"
      }],
    }
  },
  methods: {
    openUrl(url, target) {
      const urlTarget = target ? target : "_self"
      window.open(url, urlTarget);
    },
    doPostback: function () {
      __doPostBack('mp$login$ctl00', '');
    }
  },
  mounted() {
    if (adminpanel) {
      this.navItems = adminpanel.navitems
      this.globalUsername = adminpanel.user.UserName
      this.globalEmail = adminpanel.user.Email
    }
  }
}
</script>

<style>
#mo_adminPanel, vuetify-nav-drawer {
  position: fixed;
  margin-top: 0 !important;
  left: 0;
  overflow: hidden;
  z-index: 10000 !important;
  background-color: white;
}
</style>
