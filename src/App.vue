<template>
  <div id="app" class="bg-primary-light text-28">
    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      :loading="loading"
      :data="tableData"
      @edit-closed="saveRowEvent"
      :edit-config="{
        trigger: 'click',
        mode: 'row',
        activeMethod: activeRowMethod,
      }"
    >
      <vxe-table-column v-if="1 === 2" type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="Name"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-table-column>
      <vxe-table-column
        field="role"
        title="Role"
        :edit-render="{
          name: 'static-select',
          props: { options: roleList },
        }"
      ></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{ name: '$select', options: sexList }"></vxe-table-column>
      <vxe-table-column
        field="sex2"
        title="多选下拉"
        :edit-render="{
          name: '$select',
          options: sexList,
          props: { multiple: true },
        }"
      ></vxe-table-column>
      <vxe-table-column
        field="num6"
        title="Number"
        :edit-render="{
          name: '$input',
          props: { type: 'number', placeholder: '请输入数值' },
        }"
      ></vxe-table-column>
      <vxe-table-column
        field="date12"
        title="Date"
        :edit-render="{ name: '$input', props: { type: 'date' } }"
      ></vxe-table-column>
      <vxe-table-column
        field="date13"
        title="Week"
        :edit-render="{
          name: '$input',
          props: { type: 'week', placeholder: '请选择日期' },
        }"
      ></vxe-table-column>
      <vxe-table-column
        field="region"
        :edit-render="{
          name: 'region',
        }"
      ></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{ name: 'textarea' }"></vxe-table-column>
      <vxe-table-column title="操作" width="160">
        <template #default="{ row }">
          <div class="space-x-12">
            <span
              v-if="row.$meta.loading"
              class="bg-warning bg-opacity-30 text-left px-10 py-4 rounded inline-block hover:bg-opacity-70 select-none"
            >
              Saving...
            </span>
            <div
              v-if="row.$meta.saveError"
              @click="handleUpdateRow(row)"
              class="bg-danger bg-opacity-30 px-10 py-4 rounded hover:bg-opacity-70 cursor-pointer inline-block"
            >
              Save
            </div>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
const roleList = [
  { label: 'Develop', value: '1' },
  { label: 'Designer', value: '2' },
  { label: 'Tester', value: '3' },
  { label: 'PM', value: '4' },
];

export default {
  data() {
    return {
      loading: false,
      tableData: [
        {
          id: 10001,
          name: 'Test1',
          nickname: 'T1',
          role: 'Develop',
          sex: '0',
          sex2: ['0'],
          num1: 40,
          age: 28,
          address: 'Shenzhen',
          date12: '',
          date13: '',
          region: '河北省/石家庄市/藁城区',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10002,
          name: 'Test2',
          nickname: 'T2',
          role: 'Designer',
          sex: '1',
          sex2: ['0', '1'],
          num1: 44,
          age: 22,
          address: 'Guangzhou',
          date12: '',
          date13: '2020-08-20',
          region: '北京市/北京市/朝阳区',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10003,
          name: 'Test3',
          nickname: 'T3',
          role: 'Tester',
          sex: '0',
          sex2: ['1'],
          num1: 200,
          age: 32,
          address: 'Shanghai',
          date12: '2020-09-10',
          date13: '',
          region: '新疆维吾尔自治区/巴音郭楞蒙古自治州/焉耆回族自治县',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10004,
          name: 'Test4',
          nickname: 'T4',
          role: 'Designer',
          sex: '1',
          sex2: ['1'],
          num1: 30,
          age: 23,
          address: 'Shenzhen',
          date12: '',
          date13: '2020-12-04',
          region: '海南省/三沙市',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10005,
          name: 'Test5',
          nickname: 'T5',
          role: 'Develop',
          sex: '0',
          sex2: ['1', '0'],
          num1: 20,
          age: 30,
          address: 'Shanghai',
          date12: '2020-09-20',
          date13: '',
          region: '香港特别行政区',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10006,
          name: 'Test6',
          nickname: 'T6',
          role: 'Designer',
          sex: '1',
          sex2: ['0'],
          num1: 10,
          age: 21,
          address: 'Shenzhen',
          date12: '',
          date13: '',
          region: '浙江省/杭州市/西湖区',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10007,
          name: 'Test7',
          nickname: 'T7',
          role: 'Develop',
          sex: '0',
          sex2: ['0'],
          num1: 5,
          age: 29,
          address: 'Shenzhen',
          date12: '2020-01-02',
          date13: '2020-09-20',
          region: '浙江省/杭州市/临安区',
          $meta: { loading: false, saveError: false },
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'PM',
          sex: '1',
          sex2: ['0'],
          num1: 2,
          age: 35,
          address: 'Shenzhen',
          date12: '',
          date13: '',
          region: '河北省/石家庄市/无极县',
          $meta: { loading: false, saveError: false },
        },
      ],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' },
      ],
      roleList,
    };
  },
  methods: {
    editRowEvent(row) {
      const $table = this.$refs.xTable;
      $table.setActiveRow(row);
    },
    saveRowEvent({ row }) {
      const $table = this.$refs.xTable;
      $table.clearActived().then(() => {
        // this.loading = true;
        row.$meta.loading = true;
        row.$meta.saveError = false;
        setTimeout(() => {
          row.$meta.loading = false;
          if (Date.now() % 2 === 0) {
            console.log('数据提交成功！', row);
          } else {
            row.$meta.saveError = true;
            console.error('数据提交失败！', row);
          }
        }, 3000);
      });
    },
    handleUpdateRow(row) {
      row.$meta.saveError = false;
      row.$meta.loading = true;
      setTimeout(() => {
        row.$meta.loading = false;
        if (Date.now() % 2 === 0) {
          console.log('数据提交成功！', row);
        } else {
          row.$meta.saveError = true;
          console.error('数据提交失败！', row);
        }
      }, 3000);
    },
    cancelRowEvent(row) {
      const $table = this.$refs.xTable;
      $table.clearActived().then(() => {
        // 还原行数据
        $table.revertData(row);
      });
    },
    activeRowMethod({ row }) {
      if (row.$meta.loading) {
        console.log('正在提交数据，不能更改！');
        return false;
      }
      return true;
    },
  },
};
</script>
