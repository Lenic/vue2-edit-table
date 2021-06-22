import VXETable from 'vxe-table';
import { Input } from 'ant-design-vue';

import { Region } from './region-cascader';
import { StaticSelect } from './static-select';
import { StringDatePicker } from './string-date-picker';

const defaultRenderCell = (h, _, { row, column }) => [<span class="text-main px-10">{row[column.property]}</span>];

const defaultErrorRenderCell = (h, _, { row, column }) => {
  if (row.$meta.hasError) {
    return [<span class="cursor-default">{row[column.property]}</span>];
  } else {
    return [<span class="text-success leading-48 text-16 cursor-default select-none">信息填写正确</span>];
  }
};

export const install = () => {
  VXETable.renderer.add('region-cascader', {
    // 默认显示模板
    renderEdit(h, renderOpts, params) {
      let { row, column } = params;
      let { props } = renderOpts;

      return [
        h(Region, {
          class: 'region-cascader',
          props: { ...props, value: row[column.property] },
          on: {
            change: (v) => {
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
          class: 'string-date-picker',
          props: { ...props, value: row[column.property] },
          on: {
            change: (v) => {
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
          class: 'static-select',
          props: { ...props, value: row[column.property] },
          on: {
            change: (v) => {
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
              row[column.property] = e.target.value;
            },
          },
        }),
      ];
    },
    renderCell: defaultRenderCell,
  });

  VXETable.renderer.add('error-info', {
    renderEdit: defaultErrorRenderCell,
    renderCell: defaultErrorRenderCell,
  });
};
