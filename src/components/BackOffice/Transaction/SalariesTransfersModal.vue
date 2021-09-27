<template>
  <div
    class="modal fade"
    id="salariesTransfersModal"
    tabindex="-1"
    aria-labelledby="salariesTransfersModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" v-if="step === 1">
          <div class="error-container" v-if="error">{{ error }}</div>
          <div class="subText">
            Are you sure you want to transfer the remaining balance for employee
            name?
          </div>
          <div class="block">
            <div class="label">Employee Name</div>
            <div class="value">
              {{ employee?.first_name }} {{ employee?.last_name }}
            </div>
          </div>
          <div class="block">
            <div class="label">Company Name</div>
            <div class="value">{{ employee?.company?.name }}</div>
          </div>
          <div class="block">
            <div class="label">Salary</div>
            <div class="value">
              <span class="currency">
                {{ employee?.company?.currency }}
              </span>
              {{ employee?.profile?.salary }}
            </div>
          </div>
          <div class="block">
            <div class="label">Withdrawn</div>
            <div class="value">
              <span class="currency">
                {{ employee?.company?.currency }}
              </span>
              {{ employee?.profile?.withdrawals }}
            </div>
          </div>
          <div class="block">
            <div class="label">Leaves</div>
            <div class="value">
              <span class="currency">
                {{ employee?.company?.currency }}
              </span>
              {{ employee?.profile?.leaves }}
            </div>
          </div>

          <div :v-if="employee?.deductions?.length">
            <div
              class="block"
              v-for="(each, index) in employee?.deductions"
              :key="index"
            >
              <div class="label">{{ each.name }}</div>
              <div class="value">
                <span class="currency">
                  {{ employee?.company?.currency }}
                </span>
                {{ each.amount }}
              </div>
            </div>
          </div>

          <div class="amountContainer">
            <div class="amountLabel">Remaining Balance</div>
            <div class="amount">
              <span class="currency">
                {{ employee?.company?.currency }}
              </span>
              {{ employee?.profile?.balance }}
            </div>
          </div>

          <div class="buttonContainer">
            <base-button
              type="button"
              stylevariant="secondary1"
              style="font-size:16px;font-family:MARKPROMEDIUM;margin:20px 0px;"
              @click="confirmTransfer"
            >
              Confirm Transfer
            </base-button>

            <div class="cancelLink" data-bs-dismiss="modal">
              <span>Cancel</span>
            </div>
          </div>
        </div>
        <div class="modal-body" v-if="step === 2">
          <div class="imageContainer">
            <img src="/images/DoneIcon.svg" alt="DoneIcon" />
          </div>
          <div
            style="color: #150E4A;font-size: 24px;font-family: MARKPROLIGHT;text-align: center;"
          >
            Remaining balance transfer confirmed
          </div>
          <div class="buttonContainer">
            <base-button
              type="button"
              stylevariant="secondary1"
              style="font-size:16px;font-family:MARKPROMEDIUM;margin:20px 0px;"
              data-bs-dismiss="modal"
            >
              Done
            </base-button>
          </div>
          <div class="extraContentContainer">
            <img src="/images/exclamation-mark.png" alt="exclamation-mark" />
            <span class="label">
              All company transfer history are available in reports
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    };
  },
  methods: {
    confirmTransfer() {
      this.$store.dispatch(
        "employees/settleSalary",
        this.$store.getters["employees/employeeInfo"]?.id
      );
    }
  },
  watch: {
    settleSuccess(val) {
      if (val) {
        this.step = 2;
        if (this.$store.getters["employees/employeeInfo"]?.company?.id)
          this.$store.dispatch("employees/getEmployeeList", {
            company_id: this.$store.getters["employees/employeeInfo"].company.id
          });
      }
    },
    error(val) {
      if (val) {
        window.scrollTo(0, 0);
      }
    }
  },
  computed: {
    settleSuccess() {
      return this.$store.getters["employees/settleSuccess"];
    },
    error() {
      return this.$store.getters["payments/error"];
    },
    employee() {
      return this.$store.getters["employees/employeeInfo"];
    }
  }
};
</script>

<style scoped>
.modal-body {
  background-color: White;
  box-shadow: 0px 0px 10px #cfd9ea80;
  border-radius: 15px;
  padding: 40px 60px;
}
.title {
  color: #3e83fb;
  font-size: 24px;
  font-family: MARKPROBOLD;
  margin-bottom: 20px;
}
.subTitle {
  color: #3e83fb;
  font-size: 18px;
  font-family: MARKPROBOLD;
  margin-bottom: 20px;
}
.subText {
  color: #150e4a;
  font-size: 18px;
  font-family: MARKPRO;
  margin-bottom: 20px;
}
.block {
  margin-bottom: 20px;
}
.supportText {
  font-size: 12px;
  font-family: MARKPROBOOK;
  margin-top: 15px;
}
.supportText .label {
  position: relative;
  top: -4;
  margin-left: 5px;
}
.label {
  color: #150e4a;
  font-size: 18px;
  font-family: MARKPRO;
}
.value {
  color: #150e4a;
  font-size: 18px;
  font-family: MARKPROBOLD;
}
.amountContainer {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  background-color: #ecf3ff;
  padding: 20px;
  border-radius: 10px;
}
.amountLabel {
  color: #3e83fb;
  font-size: 20px;
  font-family: MARKPRO;
}
.amount {
  color: #3e83fb;
  font-size: 20px;
  font-family: MARKPROHEAVY;
}
.buttonContainer {
  margin-top: 20px;
}
.imageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.fileContainer {
  background-color: #ecf3ff;
  padding: 5px 10px;
  top: 10px;
  position: relative;
  border-radius: 3px;
  word-break: break-word;
}
.fileName {
  color: #3e83fb;
  font-size: 14px;
  font-family: MARKPROMEDIUM;
}
.crossIcon {
  margin-left: 8px;
  cursor: pointer;
}
.extraContentContainer {
  font-family: MARKPROBOLD;
  font-size: 12px;
  text-align: center;
}
.extraContentContainer .label {
  position: relative;
  top: 3px;
  margin-left: 5px;
}
.cancelLink {
  font-size: 18px;
  font-family: MARKPROHEAVY;
  color: #3e83fb;
  text-align: center;
}
.cancelLink span {
  text-decoration: underline;
  cursor: pointer;
}
</style>
