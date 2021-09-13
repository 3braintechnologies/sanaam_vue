<template>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style>
@font-face {
  font-family: "MARKPRO";
  src: url("./fonts/MARKPRO.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROBLACK";
  src: url("./fonts/MARKPROBLACK.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROBOLD";
  src: url("./fonts/MARKPROBOLD.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROBOOK";
  src: url("./fonts/MARKPROBOOK.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROEXTRALIGHT";
  src: url("./fonts/MARKPROEXTRALIGHT.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROHEAVY";
  src: url("./fonts/MARKPROHEAVY.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROLIGHT";
  src: url("./fonts/MARKPROLIGHT.OTF") format("truetype");
}
@font-face {
  font-family: "MARKPROMEDIUM";
  src: url("./fonts/MARKPROMEDIUM.OTF") format("truetype");
}

.react-datepicker__input-container {
  position: relative;
}

.react-datepicker__input-container::after {
  content: "";
  width: 15px;
  height: 15px;
  /* background-image: url("../public/images/chevron.png"); */
  background-size: 100%;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.canvasjs-chart-credit {
  display: none;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff !important;
  color: #150e4a;
  font-family: MARKPRO;
}
.MuiFormHelperText-contained {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.MuiButton-contained {
  box-shadow: none !important;
}
.error-container {
  color: #ff3b59;
  padding: 10px;
  margin-top: 15px;
  text-align: left;
  font-family: MARKPRO;
  border-radius: 5px;
  margin-bottom: 14px;
  background-color: #fde2e5;
}
.success-container {
  color: #150e4a;
  padding: 10px;
  margin-top: 15px;
  text-align: left;
  font-family: MARKPRO;
  border-radius: 5px;
  margin-bottom: 14px;
  background-color: #78f49e;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
}
.MuiPaginationItem-root {
  font-family: MARKPROBOOK;
  font-size: 13px;
}
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
