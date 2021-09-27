<template>
  <div id="employee-detail-container">
    <div class="block">
      <div class="header">
        <div class="employeeName">
          {{ employeeInfo?.first_name }}
          {{ employeeInfo?.last_name }}
        </div>
        <div
          v-if="setEditEmployeeDetail"
          class="editContainer"
          @click="setEditEmployeeDetail(employeeInfo)"
        >
          <img src="/images/editIcon.png" alt="editIcon" />
          <span class="editText">Edit</span>
        </div>
      </div>
      <div class="information">
        <div class="left">
          <div class="flexContainer">
            <div class="label">Employee</div>
            <div class="val" style="padding:10px 0px;">
              {{ employeeInfo?.first_name }}
              {{ employeeInfo?.last_name }}
              <a href="#" class="changeLink">
                Change
              </a>
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Email</div>
            <div class="val" style="padding:10px 0px;">
              {{ employeeInfo?.email }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Phone Number</div>
            <div class="val" style="padding:10px 0px;">
              {{ employeeInfo?.profile?.phone }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Gender</div>
            <div class="val" style="padding:10px 0px;">
              {{
                employeeInfo?.gender
                  ? employeeInfo.gender === "F"
                    ? "Female"
                    : employeeInfo.gender === "M"
                    ? "Male"
                    : ""
                  : ""
              }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Account</div>
            <div class="val">
              <span style="font-size:12px;">Activated</span>
              {{ employeeInfo.is_active }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Job Title</div>
            <div class="val" style="padding:10px 0px;">
              {{ employeeInfo?.profile?.position }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Monthly Pay</div>
            <div class="val" style="padding:10px 0px;">
              <span class="currency">
                {{ companyInfo?.currency }}
              </span>
              {{ employeeInfo?.profile?.salary }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Savings</div>
            <div class="val" style="padding:10px 0px;">
              <span class="currency">
                {{ companyInfo?.currency }}
              </span>
              {{ employeeInfo?.profile?.savings }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Leaves</div>
            <div class="val" style="padding:10px 0px;">
              <span class="currency">
                {{ companyInfo?.currency }}
              </span>
              {{ employeeInfo?.profile?.leaves }}
            </div>
          </div>
          <div v-if="employeeInfo?.deductions?.length">
            <div
              class="flexContainer"
              v-for="each in employeeInfo.deductions"
              :key="each.id"
            >
              <div class="label">{{ each.name }}</div>
              <div class="val" style="padding:10px 0px;">
                <span class="currency">
                  {{ companyInfo?.currency }}
                </span>
                {{ each.amount }}
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">Bank Information</div>
          <div class="flexContainer">
            <div class="label">Account Holder Name</div>
            <div class="val" style="padding:10px 0px;">
              {{ employeeInfo?.first_name }}
              {{ employeeInfo?.last_name }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Bank Name</div>
            <div class="val" style="padding:10px 0px;">
              {{
                employeeInfo?.banks?.length ? employeeInfo.banks[0].name : null
              }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">Account Number</div>
            <div class="val" style="padding:10px 0px;">
              {{
                employeeInfo?.banks?.length
                  ? employeeInfo.banks[0].number
                  : null
              }}
            </div>
          </div>
          <div class="flexContainer">
            <div class="label">IBAN</div>
            <div class="val" style="padding:10px 0px;">
              {{
                employeeInfo?.banks?.length ? employeeInfo.banks[0].iban : null
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <transaction-history></transaction-history>
  </div>
</template>

<script>
import TransactionHistory from "./transactionHistory.vue";
export default {
  components: { TransactionHistory },
  computed: {
    employeeInfo() {
      return this.$store.getters["employees/employeeInfo"];
    },
    companyInfo() {
      return this.$store.getters["company/companyInfo"];
    }
  }
};
</script>

<style scoped>
#employee-detail-container {
  margin-top: 10px;
}
#employee-detail-container .block {
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 2px 15px #d0cfdb99;
  border-radius: 15px;
  padding: 30px;
}

#employee-detail-container .block .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#employee-detail-container .block .header .employeeName {
  font-family: MARKPROBOLD;
  font-size: 22px;
}
#employee-detail-container .block .header .editContainer {
  display: flex;
  align-items: center;
}
#employee-detail-container .block .header .editContainer img {
  height: 24px;
  width: 24px;
}
#employee-detail-container .block .header .editContainer .editText {
  font-family: MARKPRO;
  font-size: 12px;
  color: #3e83fb;
  text-decoration: underline;
  cursor: pointer;
}

#employee-detail-container .block .information {
  display: flex;
}

#employee-detail-container .block .information .left {
  flex: 0.5;
}
#employee-detail-container .block .information .right {
  flex: 0.5;
}
#employee-detail-container .block .information .right .title {
  font-size: 13px;
  font-family: MARKPROHEAVY;
  opacity: 0.3;
  padding: 10px 0px;
}
#employee-detail-container .block .information .flexContainer {
  display: flex;
  align-items: center;
  font-size: 12px;
}
#employee-detail-container .block .information .flexContainer .label {
  flex: 0.5;
  font-family: MARKPRO;
}
#employee-detail-container .block .information .flexContainer .val {
  flex: 0.5;
  font-family: MARKPROBOLD;
}
#employee-detail-container .block .information .flexContainer .val .currency {
  font-size: 8px;
  position: relative;
  bottom: 3px;
  margin-right: 2px;
}
#employee-detail-container .block .information .flexContainer .changeLink {
  color: #3e83fb;
  margin-left: 5px;
  display: none;
}
</style>
