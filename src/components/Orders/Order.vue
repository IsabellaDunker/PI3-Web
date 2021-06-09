<template>
  <v-card>
    <v-card-title>
      Pedidos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        class="mr-6 search pb-2"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

        <v-dialog v-model="goToProducts" max-width="700px">
        <v-card>
          <template>
            <v-data-table
              :headers="headersP"
              :items="orders"
              :search="search"
              hide-default-footer
              no-data-text="Nenhum produto foi encontrado"
            ></v-data-table>
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="goToProducts = false; clearOrder()"
            >
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveProducts()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog persistent v-model="addDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Adicionar pedido
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ order.id ? `Editar pedido` : `Adicionar pedido` }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="order.waiter_id"
                      label="Garçom"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="order.tab_id"
                    label="Comanda"
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
              @click="addDialog = false; clearOrder()"
            >
              Cancelar
            </v-btn>
            <v-btn color="white darken-1" text @click="clearOrder">
              Limpar
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveOrder()">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteDialog" max-width="410px">
        <v-card>
          <v-card-title class="text-h5">Confirmar exclusão do pedido?</v-card-title>
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
      :items="orders"
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
      order: null,
      deleteDialog: false,
      addDialog: false,
      goToProducts: false,
      search: '',
      headers: [
        { text: 'Comanda', value: 'tab' },
        { text: 'Garçom', value: 'waiter_id' },
        { text: 'Feito em', value: 'createdAt', sortable: false },
        {
          text: 'Produtos', value: 'cart', sortable: false, filterable: false,
        },
        {
          text: 'Ações', value: 'actions', sortable: false, filterable: false,
        },
      ],
    };
  },
  created() {
    this.clearOrder();
  },
  computed: {
    orders() {
      const orders = this.$store.state.orders.orders?.map((order) => {
        const createdAt = order.createdAt.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1').substr(0, 10);
        return {
          id: order.id,
          waiter_id: order.waiter_id,
          tab: order.tab.id,
          createdAt,
        };
      });
      return orders;
    },
  },
  methods: {
    clearOrder() {
      this.order = {
        waiter_id: '',
        tab_id: '',
        created_at: '',
      };
    },
    editItem(order) {
      this.order = order;
      this.addDialog = true;
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
