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

      <v-dialog v-model="addTabDialog" max-width="500px">
        <v-card>
          <v-card-title> Criar comanda </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-select
                  v-model="selectedUser"
                  item-text="name"
                  item-value="id"
                  :items="users"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="addTabDialog = false;"
            >
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="createTab()">
              Criar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addProdDialog" max-width="500px">
        <v-card>
          <v-card-title> Adicionar produto ao carrinho </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-select
                  v-model="selectedProduct"
                  item-text="name"
                  item-value="id"
                  return-object
                  :items="products"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="addProdDialog = false;"
            >
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="addProduct()">
              Adicionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="button" dark class="mb-2" v-bind="attrs" v-on="on">
            Fazer pedido
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">
              {{ `Fazer pedido` }}
            </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="11">
                  <v-autocomplete
                    v-model="selectedTab"
                    item-text="user.name"
                    item-value="id"
                    :items="tabs"
                    label="Comanda"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="1" class="pt-7">
                  <v-btn
                    color="white"
                    icon
                    @click="addTabDialog = true;"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <span class="text-h6 mb-3">Produtos</span>
              </v-row>
              <v-row>
                <v-col>
                  <v-data-table
                    :headers="headersCart"
                    :items="cart"
                    hide-default-footer
                    no-data-text="Nenhum produto foi adicionado"
                  >
                    <template v-slot:item.units="{ item }">
                      <v-icon
                        small
                        color="red"
                        @click="() => {
                          if(item.units > 1) {
                            item.units--;
                          }
                        }"
                      >
                        mdi-minus
                      </v-icon>
                      <span class="mx-1">{{item.units}}</span>
                      <v-icon
                        small
                        color="green"
                        @click="() => item.units++"
                      >
                        mdi-plus
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-btn
                    rounded
                    @click="addProdDialog = true"
                  >
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
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
            <v-btn
              color="white"
              text
              @click="makeOrder();"
              :disabled="cart.length === 0"
            >
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
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.cart="{ item }">
        <v-icon
          medium
          @click="editProducts(item)"
        >
          shopping_cart
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
      selectedUser: null,
      selectedProduct: null,
      deleteDialog: false,
      addDialog: false,
      addTabDialog: false,
      addProdDialog: false,
      selectedTab: null,
      goToProducts: false,
      search: '',
      cart: [],
      headersCart: [
        { text: 'Produto', value: 'name', sortable: false },
        { text: 'Preço', value: 'price', sortable: false },
        { text: 'Unidades', value: 'units', sortable: false },
      ],
      headers: [
        { text: 'Cliente', value: 'user_name' },
        { text: 'Valor total', value: 'total', sortable: true },
        { text: 'Feito em', value: 'createdAt', sortable: true },
        {
          text: 'Produtos', value: 'cart', sortable: false, filterable: false,
        },
        {
          text: 'Ações', value: 'actions', sortable: false, filterable: false,
        },
      ],
      headersP: [
        { text: 'Nome', value: 'name' },
        { text: 'Ambiente', value: 'environment' },
        { text: 'Unidades', value: 'units' },
        { text: 'Valor Total', value: 'price' },
      ],
    };
  },
  created() {
    this.clearOrder();
  },
  computed: {
    orders() {
      const orders = this.$store.state.orders.orders?.map((order) => {
        const createdAt = order.createdAt
        .replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$3/$2/$1 - $4:$5')
        .substr(0, 18);
        const totalPrice = order.products
        .reduce((t, product) => t + product.products_ordereds.price, 0);
        return {
          id: order.id,
          user_name: order.tab.user.name,
          total: `R$${totalPrice}`,
          tab: order.tab.id,
          createdAt,
          name: order.products[0].name,
          is_available: order.products[0].is_available,
          price: `R$${order.products[0].price}`,
          environment: order.products[0].environment.name,
          units: order.products[0].products_ordereds.units,
        };
      });
      return orders;
    },
    tabs() {
      return this.$store.state.orders.tabs || [];
    },
    products() {
      return this.$store.state.orders.products || [];
    },
    users() {
      return this.$store.state.users.users || [];
    },
  },
  methods: {
    clearOrder() {
      this.selectedTab = null;
      this.selectedUser = null;
      this.selectedProduct = null;
      this.cart = [];
    },
    editProducts(order) {
      this.order = order;
      this.goToProducts = true;
    },
    editItem(order) {
      this.order = order;
      this.addDialog = true;
    },
    async makeOrder() {
      const payload = {
        waiter_id: localStorage.getItem('userId'),
        tab_id: this.selectedTab,
        products: this.cart.map((product) => ({
          id: product.id,
          units: product.units,
        })),
      };

      await this.$store.dispatch('orders_makeOrder', payload);

      this.addDialog = false;
    },
    deleteItem(order) {
      this.orderToDelete = order.order;
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      await this.$store.dispatch('orders_deleteOrder', this.orderToDelete);
      this.deleteDialog = false;
    },
    async createTab() {
      await this.$store.dispatch('orders_createTab', this.selectedUser);
      await this.$store.dispatch('orders_fetchTabs');
      this.addTabDialog = false;
    },
    addProduct() {
      let isProductInCart = false;

      this.cart.forEach((product) => {
        if (product.id === this.selectedProduct.id) {
          isProductInCart = true;
        }
      });

      if (!isProductInCart) {
        this.cart.push({ ...this.selectedProduct, units: 1 });
      }

      this.addProdDialog = false;
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
