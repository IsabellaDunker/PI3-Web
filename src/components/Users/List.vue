<template>
  <v-card>
    <v-card-title>
      Usuários
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      hide-default-footer
      no-data-text="Nenhum usuário foi encontrado"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Nome',
          value: 'name',
        },
        { text: 'CPF', value: 'cpf' },
        { text: 'Celular', value: 'cellphone', filterable: false },
        { text: 'Data de nascimento', value: 'birth_date', filterable: false },
        { text: 'Tipo', value: 'type' },
      ],
    };
  },
  computed: {
    users() {
      const users = this.$store.state.users.users?.map((user) => {
        const cpf = user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        const cellphone = user.cellphone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        const birthDate = user.birth_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1').substr(0, 10);
        return {
          user: user.id,
          name: user.name,
          cpf,
          cellphone,
          birth_date: birthDate,
          type: user.type,
        };
      }) || [];
      return users;
    },
  },
};
</script>
