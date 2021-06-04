<template>
  <v-card>
    <v-card-title>
      Ambientes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        class="mr-6 search pb-2"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

      <v-dialog v-model="addDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Adicionar ambiente
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ environment.environment ? `Editar ambiente` : `Adicionar ambiente` }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="environment.name"
                      label="Nome"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="environment.is_active"
                      label="Ativo"
                    ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="addDialog = false; clearEnvironment()"
            >
              Cancelar
            </v-btn>
            <v-btn color="white darken-1" text @click="clearEnvironment">
              Limpar
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteDialog" max-width="395px">
        <v-card>
          <v-card-title class="text-h5">Confirmar exclusão do ambiente?</v-card-title>
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
      :items="environments"
      :search="search"
      hide-default-footer
      no-data-text="Nenhum ambiente foi encontrado"
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
      environment: null,
      deleteDialog: false,
      addDialog: false,
      search: '',
      headers: [
        { text: 'Nome', value: 'name' },
        {
          text: 'Ativo',
          value: 'is_active',
          filterable: false,
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.clearEnvironment();
  },
  computed: {
    environments() {
      const environments = this.$store.state.environments.environments?.map((environment) => {
        const isActive = environment.is_active ? 'Sim' : 'Não';
        return {
          name: environment.name,
          is_active: isActive,
        };
      });
      return environments;
    },
  },
  methods: {
    clearEnvironment() {
      console.log(this.environment);
      this.environment = {
        name: '',
        is_active: '',
      };
    },
    editItem(environment) {
      this.environment = environment;
      this.addDialog = true;
    },
    deleteItem(environment) {
      this.environmentToDelete = environment.environment;
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch('environments_deleteEnvironment', this.environmentToDelete);
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
