<template>
  <v-card>
    <v-card-title>
      Pessoas
      <v-spacer />
      <v-text-field
        v-model="search"
        class="mr-6 search pb-2"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      />
      <v-dialog
          v-model="addDialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="button"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Adicionar pessoa
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">
              {{ user.user ? `Editar usuário` : `Adicionar usuário` }}
              </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="user.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-mask="masks.cpf"
                      v-model="user.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-mask="masks.cellphone"
                      v-model="user.cellphone"
                      label="Celular"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-mask="masks.birth_date"
                      v-model="user.birth_date"
                      label="Data de nascimento"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="user.type"
                      :items='types'
                      label="Tipo"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="addDialog = false; clearUser()"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="white darken-1"
                text
                @click="clearUser"
              >
                Limpar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
         <v-dialog v-model="deleteDialog" max-width="395px">
          <v-card>
            <v-card-title class="text-h5">Confirmar exclusão do usuário?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      hide-default-footer
      no-data-text="Nenhum usuário foi encontrado"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      masks: {
        cpf: '###.###.###-##',
        cellphone: '(##) #####-####',
        birth_date: '##/##/####',
      },
      types: [
        'Admin',
        'Customer',
        'Waiter',
      ],
      user: null,
      deleteDialog: false,
      addDialog: false,
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
        {
          text: 'Ações', value: 'actions', sortable: false, filterable: false,
        },
      ],
    };
  },
  created() {
    this.clearUser();
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
  methods: {
    clearUser() {
      this.user = {
        name: '',
        cpf: '',
        cellphone: '',
        birth_date: '',
        type: '',
      };
    },
    editItem(user) {
      this.user = user;
      this.addDialog = true;
    },
    deleteItem(user) {
      this.userToDelete = user.user;
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch('users_deleteUser', this.userToDelete);
      this.deleteDialog = false;
    },
  },
};
</script>

<style scoped>
.search {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>
