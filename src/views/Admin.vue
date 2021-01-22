<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-card-title>LCT Admin Portal</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              readonly
              label="ID"
              v-model="id"
              :prepend-icon="statusIcon"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field readonly label="Admin" v-model="admin"></v-text-field>
          </v-col>

          <v-col>
            <v-text-field readonly label="Purview" v-model="nsp"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {},

  data() {
    return {
      id: '',
      nsp: '',
      admin: '',
      statusIcon: 'mdi-lan-disconnect'
    };
  },
  sockets: {
    // socket.io reserved events
    connect() {
      if (this.$socket.io.opts?.query) {
        const { admin, id, nsp } = this.$socket.io.opts.query;
        console.log(`...Server connected using Id:${id}, Admin: ${admin}, and nsp ${nsp} `);
        this.id = id;
        this.admin = admin;
        this.nsp = nsp;
      }
      this.statusIcon = 'mdi-lan-connect';
    }
  },

  methods: {
    connectToServer() {
      console.log('Connecting to Server...');
      //   if (
      //     this.$socket.connected &&
      //     this.$socket.io.opts &&
      //     this.$socket.io.opts.query.id != id
      //   ) {
      //     // can we have two open connections?
      //     // yes, but you can still have only a Room or Visitor
      //     // and we still don't know if even the admin and Room or Visitor
      //     // sockets will work on the server independently
      //     //this.$socket.disconnect();
      //   }
      //   this.$socket.io.opts.query = {
      //     admin: 'Tao',
      //     id: id,
      //     nsp: '',
      //   };

      if (!this.$socket.io.opts.query) {
        let myOptions = {
          query: { admin: 'mpc', id: '4257650091', nsp: 'Sisters' }
        };
        localStorage.setItem('myOptions', JSON.stringify(myOptions));
        this.$socket.io.opts.query = myOptions;
      }
      this.$socket.connect();
    }
  },

  async mounted() {
    this.connectToServer();
    console.log('Admin.vue mounted');
  }
};
</script>

<style lang="scss" scoped></style>
