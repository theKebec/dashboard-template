import axios from "axios";
import type { AxiosResponse } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { getToken, removeToken } from "@/utils/token";
import { saveBlob, getFilename } from "@/utils/download";

interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

let isExpired = false;

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// ================= 请求拦截 =================
service.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && config.headers?.isToken !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================= 响应拦截 =================
service.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data, headers, config } = res;

    // ===== 下载处理 =====
    if (config.responseType === "blob") {
      if (headers["content-type"]?.includes("application/json")) {
        return Promise.reject("下载失败");
      }

      saveBlob(data, getFilename(headers));
      return data;
    }

    const response = data as ApiResponse;

    const code = response?.code ?? 200;
    const msg = response?.msg || "请求失败";

    if (code === 200) {
      return response.data; // ⭐ 返回 T
    }

    if (code === 401) {
      if (!isExpired) {
        isExpired = true;

        ElMessageBox.confirm("登录已失效，请重新进入系统", "提示", {
          type: "warning",
          showCancelButton: false,
        }).then(() => {
          removeToken();
          window.history.back();
        });
      }

      return Promise.reject(msg);
    }

    ElMessage.error(msg);
    return Promise.reject(msg);
  },

  (error) => {
    let msg = "请求失败";

    if (error.response) {
      const status = error.response.status;

      const map: Record<number, string> = {
        401: "未授权",
        403: "拒绝访问",
        404: "请求地址不存在",
        500: "服务器错误",
      };

      msg = map[status] || `请求失败(${status})`;
    } else if (error.message?.includes("timeout")) {
      msg = "请求超时";
    }

    ElMessage.error(msg);
    return Promise.reject(msg);
  },
);

// ⭐ 泛型 request（核心）
export function request<T = any>(config): Promise<T> {
  return service(config);
}

export default request;
