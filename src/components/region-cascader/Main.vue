<template>
  <Cascader
    :options="regions"
    :field-names="{
      label: 'name',
      value: 'districtCode',
      children: 'children',
    }"
    :value="values"
    placeholder="Please select"
    @change="handleChanged"
  />
</template>

<script>
import { Cascader } from "ant-design-vue";
import { defineComponent, ref, watch } from "@vue/composition-api";

import Regions from "./regions.json";

const getRegionValues = (labelString, splitter) => {
  if (!labelString) return [];

  const result = [];
  const labels = labelString.split(splitter);

  let list = Regions;
  for (let i = 0; i < labels.length; i++) {
    const item = labels[i];

    const value = list.find((v) => v.name === item);
    if (!value) break;

    result.push(value.districtCode);
    list = value.children;
  }
  return result;
};

const getRegionLabel = (values, splitter) => {
  if (!values || !values.length) return [];

  const result = [];
  let list = Regions;
  for (let i = 0; i < values.length; i++) {
    const item = values[i];

    const value = list.find((v) => v.districtCode === item);
    if (!value) break;

    result.push(value.name);
    list = value.children;
  }

  return result.join(splitter);
};

export default defineComponent({
  name: "RegionCascader",
  components: { Cascader },
  model: {
    prop: "value",
    event: "input",
  },
  emits: ["input", "change", "blur"],
  props: {
    value: {
      type: String,
      required: true,
    },
    splitter: {
      type: String,
      default: "/",
    },
  },
  setup(props, context) {
    const valuesRef = ref("");

    watch(
      [() => props.value, () => props.splitter],
      ([value, splitter]) => {
        valuesRef.value = getRegionValues(value, splitter);
      },
      { immediate: true }
    );

    const handleChanged = (e) => {
      debugger;
      const selectValue = getRegionLabel(e, props.splitter);

      context.emit("input", selectValue);
      context.emit("change", { value: selectValue, $event: e });
    };

    return {
      regions: Regions,
      values: valuesRef,

      handleChanged,
    };
  },
});
</script>