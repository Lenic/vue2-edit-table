import "xe-utils";
import Vue from "vue";
import VXETable from "vxe-table";
import CompositionApi from "@vue/composition-api";

import App from "./App.vue";
import { Region } from "./components/region-cascader";

import "vxe-table/lib/style.css";
import "ant-design-vue/dist/antd.css";

// 必须在第一个注册
Vue.use(CompositionApi);

Vue.use(VXETable);

Vue.config.productionTip = false;

VXETable.renderer.add("region", {
  autofocus: ".ant-cascader-input",
  // 默认显示模板
  renderEdit(h, renderOpts, params) {
    let { row, column } = params;
    let { props } = renderOpts;
    debugger;
    return [
      h(Region, {
        props: { ...props, value: row[column.property] },
        on: {
          input: (v) => {
            debugger;
            console.log("region.changed", v);
            row[column.property] = v;
          }
        }
      })
    ];
  },
  renderCell(h, renderOpts, { row, column }) {
    return [h("span", { class: "abc" }, row[column.property])];
  }
});

new Vue({
  render: (h) => h(App)
}).$mount("#app");
