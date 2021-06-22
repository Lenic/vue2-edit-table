import 'xe-utils';
import Vue from 'vue';
import VXETable from 'vxe-table';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';
import { Input } from 'ant-design-vue';
import { Region } from './components/region-cascader';
import { StaticSelect } from './components/static-select';

import 'vxe-table/lib/style.css';
import 'ant-design-vue/dist/antd.css';

import './styles/index.css';

// 必须在第一个注册
Vue.use(CompositionApi);

Vue.use(VXETable);

Vue.config.productionTip = false;

VXETable.renderer.add('region', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(Region, {
        class: 'w-full',
        props: { ...props, value: row[column.property] },
        on: {
          change: (v) => {
            console.log('region.changed', v);
            row[column.property] = v;
          },
        },
      }),
    ];
  },
  renderCell(h, renderOpts, { row, column }) {
    return [h('span', { class: 'abc' }, row[column.property])];
  },
});

VXETable.renderer.add('static-select', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(StaticSelect, {
        class: 'w-full',
        props: { ...props, value: row[column.property] },
        on: {
          change: (v) => {
            console.log('select.changed', v);
            row[column.property] = v;
          },
        },
      }),
    ];
  },
  renderCell(h, renderOpts, { row, column }) {
    return [h('span', { class: 'abc' }, row[column.property])];
  },
});

VXETable.renderer.add('static-input', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(Input, {
        class: 'edit',
        props: { ...props, value: row[column.property] },
        on: {
          change: (v) => {
            console.log('input.changed', v);
            row[column.property] = v;
          },
        },
      }),
    ];
  },
  renderCell(h, renderOpts, { row, column }) {
    return [h('span', { class: 'text-main px-10' }, row[column.property])];
  },
});

VXETable.renderer.add('error-info', {
  renderEdit(h, renderOpts, { row, column }) {
    return [h('span', { class: 'cursor-default' }, row[column.property])];
  },
  renderCell(h, renderOpts, { row, column }) {
    return [h('span', { class: 'cursor-default' }, row[column.property])];
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
