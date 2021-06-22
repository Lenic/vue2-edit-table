import 'xe-utils';
import Vue from 'vue';
import VXETable from 'vxe-table';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';
import { install } from './install';

import 'vxe-table/lib/style.css';
import 'ant-design-vue/dist/antd.css';

import './styles/index.css';

// 必须在第一个注册
Vue.use(CompositionApi);

Vue.use(VXETable);

Vue.config.productionTip = false;

install();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
