<template>
  <v-navigation-drawer
      id="mo_adminPanel"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      expand-on-hover
      height="500px"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar :style="{'background-color': '#9ba746', 'color': '#fff'}">
          <strong>{{ globalUsername.charAt(0).toUpperCase() + globalUsername.charAt(1).toLowerCase() }}</strong>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ globalUsername }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
        nav
        dense
        v-for="(item, index) in navItems"
        :key="index"
    >
      <v-list-item v-if="item.divider">
        <v-divider/>
      </v-list-item>

      <v-list-item v-else link @click.prevent="openUrl(item.url, item.target)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>

    </v-list>

    <v-list nav dense>
      <v-list-item link @click.prevent="doPostback()">
        <v-list-item-icon>
          <v-icon>mdi-power</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Abmelden2</v-list-item-title>
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
      drawer: true,
      mini: true,
      navItems: [
        {icon: 'mdi-playlist-edit', text: 'Sitemap2', url: '/editor/cud_sitemap.aspx', target: "_blank"},
        {icon: 'mdi-account-multiple', text: 'Usermanagement2', url: '/editor/usermanage.aspx'},
        {icon: 'mdi-wallpaper', text: 'Bild bereitstellen2'},
        {icon: 'mdi-key', text: 'Kennwort ändern2', url: '/login.aspx'},
        {divider: true},
        {icon: 'mdi-cog', text: 'Einstellungen2', url: '/editor/settings/'},
      ],
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
      this.globalUsername = adminpanel.user
    }
  }
}
</script>

<style>
#mo_adminPanel, vuetify-nav-drawer {
  width: fit-content;
  margin-top: 120px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000 !important;
  background-color: grey;
}

#mo_adminPanel .v-navigation-drawer__content::-webkit-scrollbar {
  padding-left: 10px;
  border-radius: 5px;
  width: 5px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.75); /* or add it to the track */
}

#mo_adminPanel .v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 1); /* or add it to the track */
}
</style>
