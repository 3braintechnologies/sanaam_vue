<template>
  <div id="the-header-container">
    <div class="left-container">
      <div class="logo-container" @click="loadPage" />
    </div>
    <div class="user-info-container">
      <div style="marginRight:20px;">
        <div class="label">Today’s Date</div>
        <div class="value">{{ today }}</div>
      </div>
      <div style="marginRight:20px;">
        <img src="/images/bell_active.png" alt="bell" />
      </div>
      <div class="user-info-container">
        <div class="profile-pic">
          <img src="/images/default_user.svg" alt="default_user" />
        </div>
        <div>
          <div class="dropdown">
            <img
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              src="/images/chevron_dropdown_date.png"
              alt="bell"
              :style="getAnchorStyle"
              @click="toggleMenu"
            />
            <ul class="dropdown-menu profile-menu">
              <div
                style="borderBottom: 1px solid #EBF2FE;padding: 0px 5px;paddingBottom: 10px;"
              >
                <div class="label" style="color: #150e4a;">
                  {{ user?.first_name }}
                  {{ user?.last_name }}
                </div>
                <div class="value" style="color: #150e4a;">
                  {{ user?.email }}
                </div>
              </div>
              <li>
                <div class="dropdown-item">
                  <img
                    src="/images/setting_dark.png"
                    alt="setting"
                    style="margin-right:5px;"
                  />
                  <div class="menu-text">Settings</div>
                </div>
              </li>
              <li>
                <div class="dropdown-item" @click="logout">
                  <img
                    src="/images/logout.png"
                    alt="setting"
                    style="margin-right:5px;"
                  />
                  <div class="menu-text">Log out</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      today: moment().format("DD/MM/YYYY"),
      menuOpen: false,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    toggleMenu() {
      // this.menuOpen = !this.menuOpen;
    },
    loadPage() {
      this.$router.push("/");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  },
  computed: {
    getAnchorStyle() {
      return `height:25px;width:25px;cursor:pointer;transform: ${
        this.menuOpen ? "rotate(180deg)" : "none"
      };`;
    }
  }
};
</script>

<style scoped>
#the-header-container {
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 0px 15px #cfd9ea99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1299;
  top: 0;
}
#the-header-container .left-container {
  display: flex;
  align-items: center;
}
#the-header-container .logo-container {
  height: 58px;
  width: 78px;
  background: transparent url("/images/logo_name.svg") 0% 0% no-repeat
    padding-box;
  margin-left: 20px;
  cursor: pointer;
}
#the-header-container .user-info-container {
  display: flex;
  align-items: center;
  padding-right: 20px;
}
#the-header-container .label {
  font-size: 14px;
  font-family: MARKPROBOLD;
  color: #3e83fb;
}
#the-header-container .value {
  font-size: 12px;
  font-family: MARKPRO;
  color: #3e83fb;
}
#the-header-container .profile-pic {
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#the-header-container .profile-menu {
  border: 1px solid #d3d4d5;
  padding: 10px;
  border-radius: 15px;
}
#the-header-container .profile-menu .dropdown-item {
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
#the-header-container .profile-menu .menu-text {
  font-size: "16px";
  font-family: MARKPROMEDIUM;
  color: #150e4a;
}
</style>
