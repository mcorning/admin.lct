<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-card-title>{{ title }}</v-card-title>
        <v-row v-if="connected">
          <v-col>
            <v-text-field
              readonly
              label="ID"
              v-model="query.id"
              :prepend-icon="statusIcon"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field readonly label="Admin" v-model="query.admin"></v-text-field>
          </v-col>

          <v-col>
            <v-text-field readonly label="Purview" v-model="query.nsp"></v-text-field>
          </v-col>
        </v-row>
        <v-snackbar
          v-else
          v-model="snackBar"
          :timeout="10000"
          color="primary"
          multi-line
          vertical
          top
        >
          You are not connected right now. Please login on the Login page.
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" to="/" @click="snackBar = false">
              Login
            </v-btn>
          </template>
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    connected() {
      return this.$socket.connected && this.$socket.io.opts.query;
    },
    title() {
      return this.$socket.connected ? 'Connected Admin' : 'Disconnected Admin';
    },

    query() {
      return this.$socket.io.opts.query || { admin: '', id: '', nsp: '' };
    },

    statusIcon() {
      return this.$socket.connected ? 'mdi-lan-connect' : 'mdi-lan-disconnect';
    }
  },

  data() {
    return {
      snackBar: false
    };
  },

  methods: {},

  async mounted() {
    console.log('Admin.vue mounted');
    this.snackBar = !this.connected;
  }
};
</script>

<style lang="scss" scoped></style>
