<template>
  <div class="container">
    <div id="overview-container">
      <base-spinner v-if="loading"></base-spinner>
      <div class="row">
        <div class="col">
          <div class="header-container">
            <div class="title">Overview</div>
            <div className="filter-container">
              <div className="title">Filter by</div>
              <div style="width:180px;margin-right:15px;">
                <base-select
                  placeholder="All"
                  :options="getCompanyOptions"
                  field="selectedCompany"
                  :value="selectedCompany"
                  @change-value="setValue"
                  :style="getCompanySelectStyle"
                />
              </div>
              <div style="width:180px;margin-right:15px;">
                <base-select
                  placeholder="Select Currency"
                  :options="getCurrencyOptions"
                  field="selectedCurrency"
                  :value="selectedCurrency"
                  @change-value="setValue"
                  :style="getCurrencySelectStyle"
                />
              </div>
              <div style="width:180px;">
                <base-input
                  type="date"
                  placeholder="Select Date"
                  field="selectedDate"
                  :value="selectedDate"
                  @change-value="setValue"
                  :style="getDatePickerSelectStyle"
                  :removeDefaultMargin="true"
                />
              </div>
            </div>
          </div>
          <div class="error-container" v-if="error">{{ error }}</div>
        </div>
      </div>
      <div class="tab-container">
        <div class="row">
          <div class="col">
            <div class="tab">
              <div>
                <img src="/images/Salary Icon.svg" alt="Salary Icon" />
              </div>
              <div>
                <div class="title">Total Monthly Net Salaries</div>
                <div class="value">
                  <span class="currency">
                    {{ overviewData?.currency }}
                  </span>
                  {{ overviewData?.salaries }}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="tab">
              <div>
                <img src="/images/Employees Icon.svg" alt="Employees Icon" />
              </div>
              <div>
                <div class="title">Number of Employees</div>
                <div class="value">
                  {{ overviewData?.employees }}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="tab">
              <div>
                <img src="/images/Fees Icon.svg" alt="Fees Icon" />
              </div>
              <div>
                <div class="title">Total Withdrawal fees</div>
                <div class="value">
                  <span class="currency">
                    {{ overviewData?.currency }}
                  </span>
                  {{ overviewData?.fees }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-main-container">
        <div class="row">
          <div class="col">
            <div class="inner-container">
              <div class="title">
                Total Net Salaries Vs.
                <br />
                Remaining Available Amounts
              </div>
              <div class="chart-container">
                <div class="chart" style="position:relative;">
                  <div
                    id="salaries-chart"
                    style="height: 250px; width: 250px;"
                  ></div>
                  <div class="middle-text-container">
                    <div class="label">Total</div>
                    <div class="value">
                      <span class="currency">
                        {{ overviewData?.currency }}
                      </span>

                      {{ overviewData?.balances }}
                    </div>
                  </div>
                </div>
                <div class="information" style="margin-top:100px;">
                  <div
                    class="chart-label-container"
                    style="margin-bottom: 15px;"
                  >
                    <div class="point" style="background-color: #3E83FB;"></div>
                    <div style="margin-left: 20px;">
                      <div class="label">
                        Remaining Available Amounts
                      </div>
                      <div class="value">
                        <span class="currency">
                          {{ overviewData?.currency }}
                        </span>
                        {{ overviewData?.balances }}
                      </div>
                    </div>
                  </div>
                  <div class="chart-label-container">
                    <div class="point" style="background-color: #150E4A;"></div>
                    <div style="margin-left: 20px;">
                      <div class="label">
                        Total Net Salaries
                      </div>
                      <div class="value">
                        <span class="currency">
                          {{ overviewData?.currency }}
                        </span>
                        {{ overviewData?.salaries }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="inner-container">
              <div class="title">
                Withdrawal Requests Vs.
                <br />
                Confirmed Transfers Amounts
              </div>
              <div class="chart-container">
                <div class="chart" style="position:relative;">
                  <div
                    id="requests-chart"
                    style="height: 250px; width: 250px;"
                  ></div>
                  <div class="middle-text-container">
                    <div class="label">Total</div>
                    <div class="value">
                      <span class="currency">
                        {{ overviewData?.currency }}
                      </span>
                      {{ overviewData?.withdrawals }}
                    </div>
                  </div>
                </div>
                <div class="information" style="margin-top:100px;">
                  <div
                    class="chart-label-container"
                    style="margin-bottom: 15px;"
                  >
                    <div class="point" style="background-color: #3E83FB;"></div>
                    <div style="margin-left: 20px;">
                      <div class="label">
                        Withdrawal Requests
                      </div>
                      <div class="value">
                        <span class="currency">
                          {{ overviewData?.currency }}
                        </span>
                        {{ overviewData?.pending }}
                      </div>
                    </div>
                  </div>
                  <div class="chart-label-container">
                    <div class="point" style="background-color: #150E4A;"></div>
                    <div style="margin-left: 20px;">
                      <div class="label">
                        Confirmed Transfers
                      </div>
                      <div class="value">
                        <span class="currency">
                          {{ overviewData?.currency }}
                        </span>
                        {{ overviewData?.withdrawals }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
let CanvasJS = require("../../lib/canvasjs.min");
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  data() {
    return {
      selectedCompany: "default",
      selectedCurrency: "default",
      selectedDate: moment().format("YYYY-MM-DD"),
      salaryChart: null,
      salaryChartOptions: {
        animationEnabled: true,
        data: [
          {
            explodeOnClick: false,
            innerRadius: "85%",
            legendMarkerType: "square",
            name: "Total Net Salaries Vs Remaining Available Amounts",
            radius: "100%",
            showInLegend: false,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
              { y: 0, color: "#3E83FB" },
              { y: 0, color: "#150E4A" }
            ]
          }
        ]
      },
      withdrawalChart: null,
      withdrawalChartOptions: {
        animationEnabled: true,
        data: [
          {
            explodeOnClick: false,
            innerRadius: "85%",
            legendMarkerType: "square",
            name: "Withdrawal Requests Vs Confirmed Transfers Amounts",
            radius: "100%",
            showInLegend: false,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
              { y: 0, color: "#3E83FB" },
              { y: 0, color: "#150E4A" }
            ]
          }
        ]
      }
    };
  },
  watch: {
    selectedCompany: function(val) {
      if (val && this.selectedCurrency !== "default" && this.selectedDate) {
        this.getOverviewData();
      }
    },
    selectedCurrency: function(val) {
      if (val && this.selectedDate) {
        this.getOverviewData();
      }
    },
    selectedDate: function(val) {
      if (val && this.selectedCurrency !== "default") {
        this.getOverviewData();
      }
    },
    overviewData: function(data) {
      if (data) {
        if (data?.balances) {
          this.salaryChartOptions.data[0].dataPoints[0].y = data.balances;
        }
        if (data?.salaries) {
          this.salaryChartOptions.data[0].dataPoints[1].y = data.salaries;
        }
        if (data?.pending) {
          this.withdrawalChartOptions.data[0].dataPoints[1].y = data.pending;
        }
        if (data?.withdrawals) {
          this.withdrawalChartOptions.data[0].dataPoints[1].y =
            data.withdrawals;
        }

        this.salaryChart = new CanvasJS.Chart(
          "salaries-chart",
          this.salaryChartOptions
        );
        this.salaryChart.render();
        this.withdrawalChart = new CanvasJS.Chart(
          "requests-chart",
          this.withdrawalChartOptions
        );
        this.withdrawalChart.render();
      }
    },
    getCurrencyOptions: function(data) {
      if (data && data.length && data[0].id) {
        this.selectedCurrency = data[0].id;
      }
    }
  },
  methods: {
    setValue(val, field) {
      this[field] = val;
    },
    getOverviewData() {
      let payload = {};
      if (this.selectedCompany !== "default") {
        payload.company_id = this.selectedCompany;
      }
      if (this.selectedCurrency !== "default") {
        payload.currency = this.selectedCurrency;
      }
      payload.start_time = new Date(
        new Date(this.selectedDate).setUTCHours(24, 0, 0, 0)
      ).toISOString();
      payload.end_time = new Date(
        new Date(this.selectedDate).setUTCHours(48, 0, 0, 0)
      ).toISOString();

      this.$store.dispatch("overview/getOverview", payload);
    }
  },
  computed: {
    getCompanySelectStyle() {
      return `border-radius:22px;border:1px solid #3E83FB`;
    },
    getCurrencySelectStyle() {
      return `border-radius:22px;border:1px solid ${
        this.selectedCurrency !== "default" ? "#3E83FB" : "#ECF3FF"
      };`;
    },
    getDatePickerSelectStyle() {
      return `font-size: 16px; font-family: MARKPROMEDIUM;border-radius:22px;border:1px solid ${
        this.selectedDate !== "default" ? "#3E83FB" : "#ECF3FF"
      };`;
    },
    loading() {
      return (
        this.$store.getters["enumerates/loading"] ||
        this.$store.getters["company/loading"] ||
        this.$store.getters["overview/loading"]
      );
    },
    getCurrencyOptions() {
      return this.$store.getters["enumerates/currenciesEnumerates"];
    },
    getCompanyOptions() {
      return this.$store.getters["company/companyList"]?.data;
    },
    overviewData() {
      return this.$store.getters["overview/overview"];
    },
    error() {
      return (
        this.$store.getters["enumerates/error"] ||
        this.$store.getters["company/error"] ||
        this.$store.getters["overview/error"]
      );
    }
  },
  beforeMount() {
    this.$store.dispatch("enumerates/getCurrenciesEnumerates");
    this.$store.dispatch("company/getCompanyList");
  }
};
</script>

<style scoped>
#overview-container .header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#overview-container .header-container .title {
  color: #150e4a;
  font-family: MARKPROMEDIUM;
  font-size: 24px;
}
#overview-container .header-container .filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#overview-container .header-container .filter-container .title {
  color: #3e83fa;
  font-family: MARKPROMEDIUM;
  font-size: 16px;
  margin-right: 15px;
}

#overview-container .tab-container {
  margin-top: 25px;
}
#overview-container .tab {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 10px;
  padding: 20px;
}
#overview-container .tab img {
  margin-right: 20px;
}
#overview-container .tab .title {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPRO;
}
#overview-container .tab .value {
  color: #150e4a;
  font-size: 24px;
  font-family: MARKPROHEAVY;
}
#overview-container .tab .currency {
  font-size: 14px;
  position: relative;
  bottom: 6px;
}
#overview-container .chart-main-container {
  margin-top: 25px;
}
#overview-container .chart-main-container .inner-container {
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 10px;
  padding: 25px;
}
#overview-container .chart-main-container .inner-container .title {
  font-size: 16px;
  font-family: MARKPROBOOK;
}
#overview-container .chart-main-container .chart-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#overview-container .middle-text-container {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
}
#overview-container .middle-text-container .label {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#overview-container .middle-text-container .value {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROHEAVY;
}
#overview-container .middle-text-container .currency {
  font-size: 10px;
  position: relative;
  bottom: 3px;
}
#overview-container .chart-label-container {
  display: flex;
}
#overview-container .chart-label-container .point {
  height: 15px;
  width: 15px !important;
  border-radius: 50%;
  position: absolute;
}
#overview-container .chart-label-container .label {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#overview-container .chart-label-container .value {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROHEAVY;
}
#overview-container .chart-label-container .currency {
  font-size: 10px;
  position: relative;
  bottom: 3px;
}
</style>
