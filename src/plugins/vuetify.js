import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        loadingSkeleton: '#e6e6e6'
      },
      dark: {
        loadingSkeleton: '#5d5d5d'
      },
    },
  },
});