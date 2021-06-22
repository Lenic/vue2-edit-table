import 'xe-utils';
import Vue from 'vue';
import VXETable from 'vxe-table';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';
import { Input } from 'ant-design-vue';
import { Region } from './components/region-cascader';
import { StaticSelect } from './components/static-select';
import { StringDatePicker } from './components/string-date-picker';

import 'vxe-table/lib/style.css';
import 'ant-design-vue/dist/antd.css';

import './styles/index.css';

// 必须在第一个注册
Vue.use(CompositionApi);

Vue.use(VXETable);

Vue.config.productionTip = false;

const defaultRenderCell = (h, renderOpts, { row, column }) => {
  return [h('span', { class: 'text-main px-10' }, row[column.property])];
};

VXETable.renderer.add('region-cascader', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(Region, {
        class: 'w-full region-cascader',
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
  renderCell: defaultRenderCell,
});

VXETable.renderer.add('string-date-picker', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(StringDatePicker, {
        class: 'w-full string-date-picker',
        props: { ...props, value: row[column.property] },
        on: {
          change: (v) => {
            console.log('string-date-picker.changed', v);
            row[column.property] = v;
          },
        },
      }),
    ];
  },
  renderCell: defaultRenderCell,
});

VXETable.renderer.add('static-select', {
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(StaticSelect, {
        class: 'w-full outline-none static-select',
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
  renderCell: defaultRenderCell,
});

VXETable.renderer.add('static-input', {
  autofocus: '.static-input',
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;

    return [
      h(Input, {
        class: 'static-input',
        props: { ...props, value: row[column.property] },
        on: {
          change: (e) => {
            console.log('input.changed', e.target.value);
            row[column.property] = e.target.value;
          },
        },
      }),
    ];
  },
  renderCell: defaultRenderCell,
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
