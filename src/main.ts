import Vue from 'vue';

import App from '@/components/App.vue';

import store from '@/services/storage';

import './registerServiceWorker';

import '@/assets/styles.scss';

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
