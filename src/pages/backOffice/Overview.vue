<template>
  <div id="overview-container">
    <div class="header-container"><div class="title">Overview</div></div>
    <div class="tab-container">
      <div class="tab">
        <div>
          <img src="/images/Salary Icon.svg" alt="Salary Icon" />
        </div>
        <div>
          <div class="title">Total Monthly Net Salaries</div>
          <div class="value">
            <span class="currency">
              JOD
            </span>
            1000
          </div>
        </div>
      </div>
      <div class="tab">
        <div>
          <img src="/images/Employees Icon.svg" alt="Employees Icon" />
        </div>
        <div>
          <div class="title">Number of Employees</div>
          <div class="value">
            25
          </div>
        </div>
      </div>
      <div class="tab">
        <div>
          <img src="/images/Fees Icon.svg" alt="Fees Icon" />
        </div>
        <div>
          <div class="title">Total Withdrawal fees</div>
          <div class="value">
            <span class="currency">
              JOD
            </span>
            100
          </div>
        </div>
      </div>
    </div>
    <div class="chart-main-container">
      <div class="inner-container">
        <div class="title">
          Total Net Salaries Vs.
          <br />
          Remaining Available Amounts
        </div>
        <div class="chart-container">
          <div class="chart" style="position:relative;">
            <chart-container
              id="salaries-chart"
              :options="getSalaryChartOptions"
            ></chart-container>
            <div class="middle-text-container">
              <div class="label">Total</div>
              <div class="value">
                <span class="currency">
                  JOD
                </span>
                1000
              </div>
            </div>
          </div>
          <div class="information" style="margin-top:100px;">
            <div class="chartLabelContainer" style="margin-bottom: 15px;">
              <div class="point" style="background-color: #3E83FB;"></div>
              <div style="margin-left: 20px;">
                <div class="label">
                  Remaining Available
                  <br />
                  Amounts
                </div>
                <div class="value">
                  <span class="currency">
                    JOD
                  </span>
                  1000
                </div>
              </div>
            </div>
            <div class="chartLabelContainer">
              <div class="point" style="background-color: #150E4A;"></div>
              <div style="margin-left: 20px;">
                <div class="label">
                  Total Net Salaries
                </div>
                <div class="value">
                  <span class="currency">
                    JOD
                  </span>
                  1000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-container">
        <div class="title">
          Withdrawal Requests Vs.
          <br />
          Confirmed Transfers Amounts
        </div>
        <div class="chart-container">
          <div class="chart" style="position:relative;">
            <chart-container
              id="requests-chart"
              :options="getWithdrawalChartOptions"
            ></chart-container>
            <div class="middle-text-container">
              <div class="label">Total</div>
              <div class="value">
                <span class="currency">
                  JOD
                </span>
                1000
              </div>
            </div>
          </div>
          <div class="information" style="margin-top:100px;">
            <div class="chartLabelContainer" style="margin-bottom: 15px;">
              <div class="point" style="background-color: #3E83FB;"></div>
              <div style="margin-left: 20px;">
                <div class="label">
                  Withdrawal Requests
                </div>
                <div class="value">
                  <span class="currency">
                    JOD
                  </span>
                  1000
                </div>
              </div>
            </div>
            <div class="chartLabelContainer">
              <div class="point" style="background-color: #150E4A;"></div>
              <div style="margin-left: 20px;">
                <div class="label">
                  Confirmed Transfers
                </div>
                <div class="value">
                  <span class="currency">
                    JOD
                  </span>
                  1000
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
import ChartContainer from "../../components/Chart/ChartContainer.vue";
export default {
  components: { ChartContainer },
  computed: {
    getSalaryChartOptions() {
      return {
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
              {
                y: 100,
                color: "#3E83FB"
              },
              {
                y: 1000,
                color: "#150E4A"
              }
            ]
          }
        ]
      };
    },
    getWithdrawalChartOptions() {
      return {
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
              { y: 100, color: "#3E83FB" },
              { y: 1000, color: "#150E4A" }
            ]
          }
        ]
      };
    }
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
#overview-container .tab-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
}
#overview-container .tab {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 10px;
  padding: 20px 50px 20px 30px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
#overview-container .chartLabelContainer {
  display: flex;
}
#overview-container .chartLabelContainer .point {
  height: 15px;
  width: 15px !important;
  border-radius: 50%;
  position: absolute;
}
#overview-container .chartLabelContainer .label {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROBOOK;
}
#overview-container .chartLabelContainer .value {
  color: #150e4a;
  font-size: 14px;
  font-family: MARKPROHEAVY;
}
#overview-container .chartLabelContainer .currency {
  font-size: 10px;
  position: relative;
  bottom: 3px;
}
</style>
