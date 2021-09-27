<template>
  <nav aria-label="Page navigation example" v-if="totalPage">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: activePage === 1 }"
        @click="prevPage"
      >
        <span class="page-link"><span aria-hidden="true">&laquo;</span> </span>
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
        <span class="page-link"><span aria-hidden="true">&raquo;</span> </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ["set-page"],
  props: ["activePage", "totalPage"],
  methods: {
    prevPage() {
      if (this.activePage > 1) {
        this.$emit("set-page", this.activePage - 1);
      }
    },
    changePage(page) {
      this.$emit("set-page", page);
    },
    nextPage() {
      if (this.activePage < this.totalPage) {
        this.$emit("set-page", this.activePage + 1);
      }
    }
  }
};
</script>
