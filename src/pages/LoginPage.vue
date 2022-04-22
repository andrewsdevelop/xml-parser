<template>
  <div class="LoginPage">
    <img class="rusMap" :src="require('../assets/icons/Russia_vector.svg')" />
    <form class="form" @submit.prevent="onLogin">
      <span class="form-title">Вход в систему</span>
      <div class="form-row">
        <label for="login">Логин</label>
        <input
          type="login"
          name="login"
          placeholder="Login"
          v-model="UserData.login"
        />
        <div class="error"></div>
      </div>
      <div class="form-row">
        <label for="pass">Пароль</label>
        <input
          type="password"
          name="pass"
          placeholder="Password"
          v-model="UserData.pass"
        />
        <div class="error">
          <template v-if="error">
            Длинна логина или пароля должна составлять 6 символов
          </template>
        </div>
      </div>
      <button class="form-button" type="submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoginPage extends Vue {
  private error = false;
  private UserData = {
    login: "",
    pass: "",
  };

  private onLogin() {
    this.error = false;
    if (this.UserData.login.length >= 6 && this.UserData.pass.length >= 6) {
      this.$router.push({ name: "home" });
    } else {
      this.error = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  .rusMap {
    width: 90vw;
    height: 80vh;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;

    position: absolute;
    z-index: 2;
    // height: 318px;
    left: auto;
    right: auto;
    top: 71px;

    background: #ffffff;

    box-shadow: 0px 0px 4px rgba(147, 112, 176, 0.5);
    border-radius: 5px;
    .form-title {
      font-family: "Manrope";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      color: #800080;
      margin-bottom: 30px;
    }
    .form-row {
      width: 216px;
      input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: 196px;
        height: 16px;

        background: #f0eef3;
        border-radius: 5px;

        margin: 5px 0px;
        outline: none;
        font-weight: 300;
        border: none;
      }
      .error {
        text-align: center;
        min-height: 15px;
        color: #b83232;
      }
    }

    .form-button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;

      width: 216px;
      height: 39px;
      color: #fff;

      background: #800080;
      border-radius: 5px;

      margin-top: 10px;
    }
  }
}
</style>
