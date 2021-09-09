<template>
  <div id="login-container">
    <base-spinner v-if="loading"></base-spinner>
    <div class="flex-container">
      <img class="logo" src="/images/logo.svg" alt="logo" />
    </div>
    <div class="welcome-text">
      Welcome to Sanaam!
    </div>
    <div class="flex-container">
      <div class="form-container">
        <div class="error-container" v-if="error">{{ error }}</div>
        <div class="form-title">Login</div>
        <form @submit.prevent="submitForm">
          <base-input
            label="Email"
            placeholder="Enter Email"
            type="text"
            field="email"
            :value="email"
            @change-value="setValue"
            :isValid="!!validEmail"
            :helperText="validEmail"
          ></base-input>
          <base-input
            label="Password"
            placeholder="Enter Password"
            type="password"
            field="password"
            :value="password"
            @change-value="setValue"
            :isValid="!!validPassword"
            :helperText="validPassword"
          ></base-input>

          <div class="forgotPassContainer">
            Forgot password?
          </div>
          <div style="margin-top:10px;">
            <base-button type="submit" stylevariant="secondary1">
              <span style="font-size: 16px; font-family: MARKPROMEDIUM;">
                submit
              </span>
            </base-button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex-container">
      <div class="bottomContainer">
        <div class="flex-container">
          <a class="link" href="http://localhost:3000">
            About
          </a>
          <a class="link" href="http://localhost:3000">
            Contact us
          </a>
        </div>
        <div class="copyright">
          Copyright © 2021 Sanaam. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isValidated: false
    };
  },
  methods: {
    submitForm() {
      this.isValidated = true;
      if (!this.validEmail && !this.validPassword) {
        const actionPayload = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("auth/login", actionPayload);
      }
    },
    setValue(val, field) {
      this[field] = val;
    }
  },
  computed: {
    loading() {
      return this.$store.getters["auth/loading"];
    },
    success() {
      return this.$store.getters["auth/success"];
    },
    error() {
      return this.$store.getters["auth/error"];
    },
    validEmail() {
      return (
        this.isValidated &&
        ((!this.email && "Email is required.") ||
          (this.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email) &&
            "Email is invalid."))
      );
    },
    validPassword() {
      return this.isValidated && !this.password && "Password is required.";
    }
  }
};
</script>

<style scoped>
#login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#login-container .flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login-container .logo {
  width: 100px;
  height: 76px;
}
#login-container .welcome-text {
  margin-top: 10px;
  text-align: center;
  font-size: 28px;
  font-family: MARKPROLIGHT;
}
#login-container .form-container {
  box-shadow: 0px 0px 10px #cfd9ea80;
  padding: 20px 30px;
  border-radius: 10px;
  margin: 20px 0px;
  width: 370px;
}
#login-container .form-title {
  margin-bottom: 20px;
  color: #3e83fb;
  font-size: 24px;
  font-weight: bold;
  font-family: MARKPROBOLD;
}
#login-container .bottomContainer {
  color: #150e4a;
  font-size: 16px;
}
#login-container .link {
  margin: 0px 10px;
  color: #150e4a;
  margin-bottom: 10px;
  font-family: MARKPROBOOK;
}
#login-container .copyright {
  font-family: MARKPRO;
}
#login-container .forgotPassContainer {
  font-family: MARKPRO;
  color: #150e4a;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
}
#login-container .forgotPassContainer:hover {
  text-decoration: underline;
}
</style>
