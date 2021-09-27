<template>
  <div
    class="modal fade"
    id="withdrawalRequestsModal"
    tabindex="-1"
    aria-labelledby="withdrawalRequestsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" v-if="step === 1">
          <div class="error-container" v-if="error">{{ error }}</div>
          <div class="title">Confirm Withdraw Transfer</div>
          <div class="subText">
            The following employee has requested a withdraw:
          </div>
          <div class="block">
            <div class="label">Employee Name</div>
            <div class="value">
              {{
                paymentInfo?.employee?.name ? paymentInfo.employee.name : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Company Name</div>
            <div class="value">
              {{
                paymentInfo?.company?.name ? paymentInfo.company.name : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Withdraw Amount</div>
            <div class="value">
              {{
                paymentInfo?.amount
                  ? `${paymentInfo.amount} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Fees</div>
            <div class="value">
              {{
                paymentInfo?.fees
                  ? `${paymentInfo.fees} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Net Amount</div>
            <div class="value">
              {{
                paymentInfo?.net
                  ? `${paymentInfo.net} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Total Amount</div>
            <div class="value">
              {{
                paymentInfo?.total
                  ? `${paymentInfo.total} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Salary</div>
            <div class="value">
              {{
                paymentInfo?.employee?.profile?.salary
                  ? `${paymentInfo.employee.profile.salary} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Date</div>
            <div class="value">
              {{ getCreatedDate(paymentInfo?.created_at) }}
            </div>
          </div>
          <div class="subTitle">Bank Account Information</div>
          <div class="block">
            <div class="label">Account Holder Name</div>
            <div class="value">
              {{
                paymentInfo?.employee?.name ? paymentInfo.employee.name : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Bank Name</div>
            <div class="value">
              {{
                paymentInfo?.employee?.banks?.length
                  ? paymentInfo.employee.banks.find(each => each.is_default)
                      ?.name
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">Account Number</div>
            <div class="value">
              {{
                paymentInfo?.employee?.banks?.length
                  ? paymentInfo.employee.banks.find(each => each.is_default)
                      ?.number
                  : "N/A"
              }}
            </div>
          </div>
          <div class="block">
            <div class="label">IBAN</div>
            <div class="value">
              {{
                paymentInfo?.employee?.banks?.length
                  ? paymentInfo.employee.banks.find(each => each.is_default)
                      ?.iban
                  : "N/A"
              }}
            </div>
          </div>
          <div class="amountContainer">
            <div class="amountLabel">Withdraw Amount</div>
            <div class="amount">
              {{
                paymentInfo?.total
                  ? `${paymentInfo.total} ${paymentInfo?.company?.currency}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="label">
            Upload transfer bank receipt, will be added to the employee’s
            records
          </div>
          <div class="supportText">
            <img
              src="/images/exclamation-mark-gray.png"
              alt="exclamation-mark"
            />
            <span class="label">Supported files: JPEG, PNG</span>
          </div>
          <div class="buttonContainer">
            <div>
              <base-button
                type="button"
                stylevariant="secondary2"
                style="font-size: 16px; font-family: MARKPROMEDIUM;"
                @click="openFileUploader"
              >
                <img
                  src="/images/upload.png"
                  alt="upload"
                  style="marginRight:8px;marginBottom:3px"
                /><span> Upload Bank Receipt</span>
              </base-button>
              <input
                id="fileUploader"
                type="file"
                style="display:none;"
                accept="image/*"
                @click="clickFile"
                @change="changeFile"
              />
              <span class="fileContainer" v-if="file?.name">
                <span class="fileName">{{ file.name }}</span>
                <img
                  src="/images/cross.png"
                  alt="cross"
                  class="crossIcon"
                  @click="removeFile"
                />
              </span>
            </div>
            <base-button
              type="button"
              stylevariant="secondary1"
              style="font-size:16px;font-family:MARKPROMEDIUM;margin:20px 0px;"
              :disabled="!paymentInfo?.employee?.name || !file?.name"
              @click="confirmTransfer"
            >
              Confirm Transfer
            </base-button>
          </div>
        </div>
        <div class="modal-body" v-if="step === 2">
          <div class="imageContainer">
            <img src="/images/DoneIcon.svg" alt="DoneIcon" />
          </div>
          <div
            style="color: #150E4A;font-size: 24px;font-family: MARKPROLIGHT;text-align: center;"
          >
            Withdraw request confirmed
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
              All withdrawal requests are available in employee records
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["getPaymentListMethod"],
  data() {
    return { file: null, step: 1 };
  },
  methods: {
    openFileUploader() {
      document.getElementById("fileUploader").click();
    },
    clickFile(event) {
      event.target.value = null;
    },
    changeFile(event) {
      this.file = event.target.files[0];
    },
    removeFile() {
      this.file = null;
    },
    confirmTransfer() {
      if (this.file) {
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.$store.dispatch("payments/settlePayment", {
            payload: { receipt: reader.result },
            payment_id: this.$store.getters["payments/paymentInfo"]?.id
          });
        };
        reader.onerror = error => {
          console.log("Error: ", error);
        };
      }
    },
    getCreatedDate(created_at) {
      return created_at ? moment(created_at).format("DD/MM/YYYY") : "N/A";
    }
  },
  watch: {
    settleSuccess(val) {
      if (val) {
        this.step = 2;
        this.getPaymentListMethod(1);
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
      return this.$store.getters["payments/settleSuccess"];
    },
    error() {
      return this.$store.getters["payments/error"];
    },
    paymentInfo() {
      return this.$store.getters["payments/paymentInfo"];
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
</style>
