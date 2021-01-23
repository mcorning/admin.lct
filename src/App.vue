<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span class="pr-3"> <soteria-icon /></span>
      <v-toolbar-title>LCT Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="link in links" :key="`${link.label}-header-link`" text rounded :to="link.url">
        {{ link.label }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>

        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          <v-btn @click="toggleTheme" text class="white--text"
            >{{ new Date().getFullYear() }} —
            <strong>
              Soteria Institute
            </strong>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Admin.LCT',
  data: () => ({
    links: [
      {
        label: 'Login',
        url: '/'
      },
      {
        label: 'Admin',
        url: '/admin'
      },

      {
        label: 'About',
        url: '/about'
      }
    ]
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = '#41B883';
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme', this.$vuetify.theme.dark);
    }
  },
  mounted() {
    this.$vuetify.theme.dark = localStorage.getItem('theme');
  }
};
</script>
