<template>
  <DatePicker
    :value="current"
    @change="handleChange"
    dropdownClassName="string-date-picker vxe-table--ignore-clear rounded-0"
    v-bind="$attrs"
  />
</template>

<script>
import moment from 'moment';
import { DatePicker } from 'ant-design-vue';
import { defineComponent, ref, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'StringDatePicker',
  components: { DatePicker },
  model: { prop: 'value', event: 'change' },
  emits: ['change'],
  props: {
    value: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
  },
  setup(props, context) {
    const currentRef = ref();
    watch(
      () => props.value,
      (val) => {
        currentRef.value = val ? moment(val) : null;
      },
      { immediate: true }
    );

    const handleChange = (value) => context.emit('change', value.format(props.format));

    return {
      current: currentRef,

      handleChange,
    };
  },
});
</script>
