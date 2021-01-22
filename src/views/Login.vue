<template>
  <v-container>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="query.admin" label="Username" :prepend-icon="statusIcon" />
          <v-text-field v-model="query.nsp" label="Locale" prepend-icon="mdi-account-circle" />
          <v-text-field
            v-model="query.id"
            :type="showPassword ? 'text' : 'password'"
            label="Mobile"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-snackbar v-model="snackBar" :timeout="10000" color="primary" multi-line vertical centered>
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" to="admin" @click="snackBar = false">
            Thanks
          </v-btn>
        </template>
      </v-snackbar>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      statusIcon: 'mdi-lan-disconnect',

      key: 'query',
      snackBar: false,
      message: ` `,
      showPassword: false,
      query: { admin: '', id: '', nsp: '' }
    };
  },
  sockets: {
    // socket.io reserved events
    connect() {
      this.query = this.$socket.io.opts?.query;
      console.log('connecting:', JSON.stringify(this.query, null, 3));

      this.message = `You are connected with socket ${this.$socket.id} `;
      this.statusIcon = 'mdi-lan-connect';
      this.snackBar = true;
    }
  },
  methods: {
    login() {
      this.$socket.disconnect();
      this.$socket.io.opts.query = this.query;

      this.$socket.connect();

      localStorage.setItem(this.key, JSON.stringify(this.query));
      console.log('saving:', JSON.stringify(this.query, null, 3));
    }
  },
  mounted() {
    this.query = JSON.parse(localStorage.getItem(this.key)) || { admin: '', id: '', nsp: '' };
    console.log('getting:', JSON.stringify(this.query, null, 3));
    if (this.query) {
      this.login();
    }
  }
};
</script>

<style></style>
