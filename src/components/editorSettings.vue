<template>
  <div class="v-application v-application--is-ltr" id="app" data-app="true">
    <v-sheet id="editor-settings-dialog" v-if="dialogSettings">
      <v-card>
        <v-card-title class="py-0">
          Einstellungen
          <v-btn icon absolute right @click="dialogSettings = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="overflow-y: auto; max-height: 75vh">
          <v-expansion-panels v-model="panel" accordion focusable>

            <!-- Grundeinstellungen -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Grundeinstellungen
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <p>Hier können Sie folgende Grundeinstellungen vornehmen:</p>

                <v-text-field label="Titel der Website"
                              hint="Der Titel der Webseite wird auf jeder Seite angezeigt und ist für Menschen und Suchmaschinen die erste und zugleich wichtigste Einordnungsmöglichkeit. Wählen Sie einen Titel aus, der Ihre Seite möglichst gut beschreibt. Wenn Ihre Firma 'Hallo AG' heißt und die Firma vertreibt z.B. Küchenzubehör, könnte der Title Tag heißen: 'Hallo AG | Küchenzubehör und Geräte'"></v-text-field>
                <v-text-field label="Email-Adresse für Kontaktanfragen"
                              hint="Im folgenden Feld können Sie die Email-Adresse festlegen, an die u.a. alle Mitteilungen vom Kontaktformular versendet werden. Tipp: schreiben Sie keine Email-Adressen auf Ihre Internetseite sondern verweisen Sie immer auf das Kontaktformular. Nur so haben Sie einen wirksamen Schutz gegen Email-Spamming."></v-text-field>

                <v-checkbox v-model="checkbox" label="Kontaktformular mit Adresse"></v-checkbox>
                <v-checkbox v-model="checkbox" label="Kontaktformular mit Telefonnummer"></v-checkbox>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Datenschutz -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Datenschutz
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <h3>EU-Verordnung 2016/679 (DS-GVO)</h3>
                <v-checkbox v-model="checkbox" disabled
                            label="HTTPS Verschlüsselung des Datenverkehrs (aktiviert wenn ein SSL-Zertifikat zugeordnet ist)">
                </v-checkbox>
                <v-checkbox v-model="checkbox"
                            label="Datenschutzerklärung neben Impressum als eigenständigen Navigationspunkt ausweisen">
                </v-checkbox>
                <v-checkbox v-model="checkbox"
                            label='Privacy By Default („Datenschutz durch datenschutzfreundliche Werkeinstellunge")'>
                </v-checkbox>

                <h3>EU-Richtlinie 2009/136/EG (ePrivacy)</h3>
                <v-checkbox v-model="checkbox" label="allgemeiner Cookie Hinweis"></v-checkbox>
                <p>
                  Cookies sollten dem Besucher auf der Datenschutzseite erklärt werden. Je nach Art und Bedeutung der
                  Cookie-Verwendung sollte diese Erklärung VOR Verwendung des Cookies aktiv eingewilligt werden.
                  <br><i>Hinweis: Die Wieleicht-Software verwendet seit dem 12.2.2020 in der Standardkonfiguration
                  keine Cookies. Ein <u>allgemeiner Cookie Hinweis</u> im Sinne der EU-Richtlinie 2009/136/EG macht
                  daher seit dem 12.2.2020 keinen Sinn.</i>
                </p>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Nachrichten -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Nachrichten
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <h3>Informationseinstellungen</h3>
                <v-checkbox v-model="checkbox" label="Nachrichtenportal aktivieren"></v-checkbox>
                <v-checkbox v-model="checkbox" label="Nachrichten als RSS-Feed veröffentlichen"></v-checkbox>
                <v-checkbox v-model="checkbox" label="Nachrichtenrubriken anzeigen"></v-checkbox>
                <v-checkbox v-model="checkbox" label="Nachrichtendatum immer anzeigen"></v-checkbox>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Suchmaschinen -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Suchmaschinen
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <v-radio-group v-model="radioGroup" row label="Suchmaschinenzugriff">
                  <v-radio
                      label="Ja"
                      :value="1"
                  ></v-radio>
                  <v-radio
                      label="Nein"
                      :value="0"
                  ></v-radio>
                </v-radio-group>

                <v-textarea
                    outlined
                    name="input-7-4"
                    label="Beschreibung für Suchmaschinen"
                    value="Ich will nicht gefunden werden! :-)"
                ></v-textarea>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Google Einstellungen -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Google Einstellungen
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <v-text-field label="Google Webmaster Tools (Verification CODE)"></v-text-field>

                <v-radio-group v-model="radioGroup" label="Goole Sitemap für Suchmaschinen erstellen">
                  <v-radio
                      label="XML-Datei für Suchmaschinen veröffentlichen"
                      :value="1"
                  ></v-radio>
                  <v-radio
                      label="keine XML-Datei für Suchmaschinen veröffentlichen"
                      :value="0"
                  ></v-radio>
                </v-radio-group>

                <v-text-field label="Google Tag Manager (analytics Code)"></v-text-field>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Frontend anpassen -->
            <v-expansion-panel>
              <v-expansion-panel-header dense color="#efefef">
                Frontend anpassen
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">

                <v-text-field label="Firma"
                              hint="Name der Firma (Verwendet auf Homepage und im Impressum)"
                              persistent-hint></v-text-field>
                <v-text-field label="Kontakt"
                              hint="Name des Ansprechpartners (Wird nur im Kopf dieser Anwendung verwendet)"></v-text-field>
                <v-select
                    :items="[0,1,2,3]"
                    label="Theme"
                ></v-select>
                <v-text-field label="ThemePX"></v-text-field>
                <v-text-field label="Mandant"></v-text-field>
                <v-text-field label="Host"></v-text-field>

                <v-checkbox v-model="checkbox" label="Thematischer Nachrichtenpool"></v-checkbox>
                <v-checkbox v-model="checkbox" label="load Vue 2019" disabled></v-checkbox>

              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "editorSettings",
  data: () => ({
    panel: 1,
    dialogSettings: true,
    dialogUrl: "",
    dialogTitle: "",
    checkbox: true,
    radioGroup: 0,
  })
}

</script>

<style lang="css">
#editor-settings-dialog {
  background-color: transparent;
  width: 75vw;
  height: 75vh;
  max-height: 75vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /*margin: 0 auto;*/
}

.v-text-field .v-label {
  left: 0px !important;
  right: auto !important;
}

</style>
