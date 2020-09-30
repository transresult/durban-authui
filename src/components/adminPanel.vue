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
        <v-divider v-if="item.divider"/>

        <v-list-item v-else link @click.prevent="openUrl(item)">
          <v-list-item-icon class="mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

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
          "icon": "mdi-wallpaper",
          "text": "Bild bereitstellen",
          "url": "/editor/cud_pic.aspx",
          "urlType": "newWindow"
        }, {
          "icon": "mdi-key",
          "text": "Kennwort ändern",
          "url": "/login.aspx"
        }, {
          "icon": "mdi-cog", "text": "Einstellungen", "url": "/editor/settings/"
        }, {
          "icon": "mdi-power",
          "text": "Abmelden",
          "url": "javascript:__doPostBack('mp$AdminPanel$LogOnStatus$ctl00','')"
        }
      ],
      user: {
        "UserName": "redaktion",
        "ProviderUserKey": "30a18bdf-e2b5-4c40-9897-16b136ddbb14",
        "Email": "redaktion@transresult.de",
        "PasswordQuestion": null,
        "Comment": "",
        "IsApproved": true,
        "IsLockedOut": false,
        "LastLockoutDate": "1754-01-01T01:00:00+01:00",
        "CreationDate": "2020-09-23T14:07:31+02:00",
        "LastLoginDate": "2020-09-28T09:14:34.59+02:00",
        "LastActivityDate": "2020-09-28T12:28:02.327+02:00",
        "LastPasswordChangedDate": "2020-09-23T14:07:31+02:00",
        "IsOnline": true,
        "ProviderName": "WieLeichtSqlMembershipProvider"
      },
    }
  },
  computed: {
    userInitials: function () {
      return this.globalUsername.charAt(0).toUpperCase() + this.globalUsername.charAt(1).toLowerCase()
    }
  },
  methods: {
    openUrl(item) {
      const urlTarget = item.urlType == "newWindow" || item.urlType == "iframe" ? "_blank" : "_self"
      window.open(item.url, urlTarget);

      // if (item.urlType == "newWindow" || item.urlType == "iframe") {
      //   this.dialogUrl = item.url
      //   this.dialogTitle = item.text
      //   this.dialogIframe = true
      // } else {
      //   window.open(item.url, item.urlType);
      // }
    },
    doPostback: function () {
      __doPostBack('mp$login$ctl00', '');
    }
  },
  mounted() {
    console.log("NODE_ENV", process.env.NODE_ENV)
    if (adminpanel) {
      this.navItems = adminpanel.navitems
      this.globalUsername = adminpanel.user.UserName
      this.globalEmail = adminpanel.user.Email
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

/* Overwritting Durban CSS */

.v-divider {
  margin: 0;
}

</style>
