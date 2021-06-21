<template>
  <Select :value="current" @change="handleChange" dropdownClassName="vxe-table--ignore-clear" v-bind="$attrs">
    <slot :list="options">
      <Option :key="item.value" :value="item.value" v-for="item in options">{{ item.label }}</Option>
    </slot>
  </Select>
</template>

<script>
import { Select } from 'ant-design-vue';
import { defineComponent, ref, watch } from '@vue/composition-api';

const getSelectedValue = (label, list) => {
  const item = list.find((v) => v.label === label);

  if (item) {
    return item.value;
  }

  return null;
};

const getSelectedLabel = (value, list) => {
  const item = list.find((v) => v.value === value);

  if (item) {
    return item.label;
  }

  return null;
};

export default defineComponent({
  name: 'StaticSelect',
  components: { Select, Option: Select.Option },
  model: { prop: 'value', event: 'change' },
  emits: ['change'],
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const currentRef = ref();
    watch(
      () => props.value,
      (val) => {
        currentRef.value = getSelectedValue(val, props.options);
      },
      { immediate: true }
    );

    const handleChange = (value) => {
      const label = getSelectedLabel(value, props.options);

      context.emit('change', label);
    };

    return {
      current: currentRef,

      handleChange,
    };
  },
});
</script>
