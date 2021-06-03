import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        button: '#8888ee',
        font: '#eeeeee',
        bg: '#bfbaef',
        abg: '#a5a0ef',
      },
    },
  },
});
