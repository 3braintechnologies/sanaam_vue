<template>
  <div>
    <div id="table-container">
      <table class="table" :style="getContainerStyle">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="column in columns"
              :key="column.Header"
              class="header-cell"
              :style="
                `width:${
                  column.width ? column.width : 'auto'
                };background-color: ${subTable ? '#F9FBFF' : 'auto'};`
              "
            >
              <div
                v-if="column.HeaderCell"
                v-html="column.HeaderCell(column.Header)"
              />
              <div v-else>{{ column.Header }}</div>
            </th>
          </tr>
        </thead>

        <tbody v-for="(record, index) in data" :key="record">
          <tr
            class="table-row"
            :style="`width:${onRowClick ? 'pointer' : 'auto'};`"
          >
            <td
              v-for="column in columns"
              :key="column.Header"
              class="column-cell"
              :style="
                `width:${
                  column.width ? column.width : 'auto'
                };background-color: ${subTable ? '#F9FBFF' : 'auto'};`
              "
            >
              <div
                v-if="column.Cell"
                v-html="column.Cell(record[column.accessor], record, index)"
              />
              <div v-else>{{ record[column.accessor] }}</div>
            </td>
          </tr>
          <tr class="table-row" v-if="showSubTableFor === index">
            <td
              class="column-cell"
              :colspan="columns && columns.length"
              style="padding:0px;"
            >
              <slot></slot>
            </td>
          </tr>
        </tbody>

        <tbody v-if="!data || !data.length">
          <tr class="no-data-container">
            <div class="no-data-text">No data found</div>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      aria-label="Page navigation example"
      v-if="totalPage && data && data.length"
    >
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: activePage === 1 }"
          @click="prevPage"
        >
          <span class="page-link"
            ><span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li
          class="page-item"
          v-for="page in totalPage"
          :key="page"
          :class="{ active: page === activePage }"
          @click="changePage(page)"
        >
          <span class="page-link">
            {{ page }}
          </span>
        </li>
        <li
          class="page-item"
          :class="{ disabled: activePage === totalPage }"
          @click="nextPage"
        >
          <span class="page-link"
            ><span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: [
    "columns",
    "data",
    "showSubTableFor",
    "onRowClick",
    "subTable",
    "fullRadius",
    "totalPage",
    "activePage",
    "setActivePage"
  ],
  methods: {
    prevPage() {
      if (this.activePage > 1) {
        this.setActivePage(this.activePage - 1);
      }
    },
    changePage(page) {
      this.setActivePage(page);
    },
    nextPage() {
      if (this.activePage < this.totalPage) {
        this.setActivePage(this.activePage + 1);
      }
    }
  },
  computed: {
    getContainerStyle() {
      return `margin-bottom:${
        this.subTable ? "0px" : "auto"
      };background-color: #ffffff;box-shadow:${
        this.subTable ? "none" : "0px 2px 15px #D0CFDB99"
      };border-radius:${
        this.subTable ? "none" : this.fullRadius ? "15px" : "0px 10px 10px 10px"
      };`;
    }
  }
};
</script>

<style scoped>
#table-container .header-cell {
  color: #3e83fb;
  font-size: 13px;
  font-family: MARKPROBOLD;
  border-bottom: 1px solid #f6faff;
  padding: 16px;
}
#table-container .column-cell {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
  border-bottom: 1px solid #f6faff;
  padding: 16px;
}
#table-container .table-row:hover {
  background-color: #ecf3ff;
}
#table-container .no-data-container {
  height: 200px;
  position: relative;
}
#table-container .no-data-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #150e4a;
  font-size: 20px;
  font-family: MARKPROBOOK;
}
.page-item {
  cursor: pointer;
}
</style>
