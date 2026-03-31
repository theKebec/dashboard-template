import axios from "axios";
import { ElMessageBox, ElNotification, ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { tansParams } from "@/utils/snpit";
import cache from "@/utils/cache";
import { saveAs } from "file-saver";
let downloadLoadingInstance;
// 是否显示重新登录
export let isReLogin = { show: false };

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/api",
  // 超时
  timeout: 60000,
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    // ajax请求标识
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    // 是否需要token
    const isToken = config.headers?.isToken === false;

    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }

    // 防重复提交
    const isRepeatSubmit = config.headers?.repeatSubmit === false;

    if (!isRepeatSubmit && ["post", "put"].includes(config.method)) {
      const requestKey =
        config.url + JSON.stringify(config.data || config.params);

      const lastRequest = sessionStorage.getItem("lastRequest");

      if (lastRequest === requestKey) {
        return Promise.reject(new Error("请求重复提交"));
      }

      sessionStorage.setItem("lastRequest", requestKey);

      setTimeout(() => {
        sessionStorage.removeItem("lastRequest");
      }, 1000);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.status == 200 ? res.data.code : res.status || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401 || code === 302) {
      if (!isReLogin.show) {
        isReLogin.show = true;
        ElMessageBox.confirm(
          "登录状态已过期，您可以继续留在该页面，或者重新登录",
          "系统提示",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
            center: false,
          },
        )
          .then(() => {
            isReLogin.show = false;
            // location.href = "http://gateway.dev.snpit.com:8080/smartsite/oauth/login"
            // location.href = "http://127.0.0.1:8080/smartsite/oauth/login"
            // location.href = window.dynamicConfig.loginUrl;
            if (
              window.location.hostname.startsWith(window.dynamicConfig.agentIP)
            ) {
              location.href = window.dynamicConfig.loginUrlAgent;
            } else {
              location.href = window.dynamicConfig.loginUrl;
            }
            // location.href = "http://10.191.2.109:9309/smartsite/oauth/login"
          })
          .catch(() => {
            isReLogin.show = false;
          });
      }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      ElMessage({
        ElMessage: msg,
        type: "error",
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      ElNotification.error({
        title: msg,
      });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    let { ElMessage } = error;
    if (ElMessage == "Network Error") {
      ElMessage = "后端接口连接异常";
    } else if (ElMessage.includes("timeout")) {
      ElMessage = "系统接口请求超时";
    } else if (ElMessage.includes("Request failed with status code")) {
      ElMessage = "系统接口" + ElMessage.substr(ElMessage.length - 3) + "异常";
    }
    ElMessage({
      ElMessage: ElMessage,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
// 通用下载方法
export function download(url, params, filename) {
  ElMessage({
    ElMessage: "正在导出,请稍后查看",
    type: "success",
    duration: 3 * 1000,
  });
  // downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
  return service({
    method: "post",
    url: "/" + url,
    responseType: "blob",
    data: params,
  })
    .then(async (data) => {
      const blob = new Blob([data]);
      saveAs(blob, filename);
      // downloadLoadingInstance.close();
    })
    .catch((r) => {
      ElMessage.error("下载文件出现错误，请联系管理员！");
      downloadLoadingInstance.close();
    });
}
export default service;
