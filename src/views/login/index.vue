<template>
  <div class="login" style="perspective: 500px">
    <el-form class="form face" :model="model" :rules="rules" ref="loginForm">
      <el-form-item prop="username">
        <el-input
          class="text"
          v-model="model.username"
          prefix-icon="User"
          clearable
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="text"
          v-model="model.password"
          prefix-icon="Lock"
          show-password
          clearable
          placeholder="密码"
          @keydown.enter="submit"
        />
      </el-form-item>
      <el-form-item>
        <el-button-group style="width: 100%">
          <el-button
            :loading="loading"
            type="primary"
            class="btn"
            @click="submit"
            >登录</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
} from "vue";
import { Login } from "@/api/login";
import { useStore } from "vuex";
import { encryptByMd5 } from "@/utils/encrypt.js";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "login",
  setup() {
    //getCurrentInstance函数返回当前组件的实例对象
    //获取组件的上下文
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loginForm = ref(null);
    const state = reactive({
      model: {
        username: "ymx",
        password: "157617",
        type: false,
      },
      title: "社团成员",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
      btnText: computed(() => (state.loading ? "登录中..." : "登录")),
      submit: () => {
        if (state.loading) return;

        loginForm.value.validate(async (valid) => {
          if (valid) {
            state.loading = true;
            try {
              const { code, data, message } = await Login({
                ...state.model,
                password: encryptByMd5(state.model.password),
              });
              if (+code === 0) {
                ctx.$message.success({
                  message: "登录成功",
                  duration: 1000,
                });

                const targetPath = decodeURIComponent(route.query.redirect);
                if (targetPath.startsWith("/")) {
                  // 如果是内部路由地址
                  router.push(targetPath);
                } else {
                  router.push("/");
                }
                store.dispatch("app/setToken", data);
              } else {
                ctx.$message.error(message);
              }
            } catch (e) {
            } finally {
              state.loading = false;
            }
          }
        });
      },
    });

    return {
      ...toRefs(state),
      loginForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;

  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;

    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }

    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        // background: rgba(40, 52, 67, 0.1);
        background: regba(0, 0, 0, 0.1);
        color: black;
        height: 48px;
        line-height: 48px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.9);
          // color: white();
        }
      }
    }

    .btn {
      width: 100%;
    }

    .face {
      position: absolute;
      transition: 0.5s;
      backface-visibility: hidden;
    }

    .back {
      position: absolute;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transition: 0.5s;
    }
  }
}
</style>
