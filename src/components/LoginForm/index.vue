<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark class="d-flex justify-center">
              <v-toolbar-title>Bem-vindo ao XXXXXXX</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="cpf"
                  prepend-icon="person"
                  label="CPF"
                  type="text"
                  v-mask="masks.cpf"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  id="password"
                  label="Senha"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
          <v-card-actions class="mr-4">
            <v-spacer/>
            <v-btn color="button" @click.prevent="login">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { cpf } from 'cpf-cnpj-validator';

export default {
  data() {
    return {
      cpf: '',
      password: '',
      masks: {
        cpf: '###.###.###-##',
      },
    };
  },
  methods: {
    async login() {
      const ncpf = cpf.strip(this.cpf);
      const { password } = this;
      try {
        this.$store.dispatch('login', { cpf: ncpf, password });
        this.$router.push('/');
      } catch {
        console.log('Error');
      }
    },
  },
};
</script>
