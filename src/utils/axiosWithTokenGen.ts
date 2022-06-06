import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { store } from "../app/store";
import { CONFIG } from "../config";
import { refreshTokenSignIn } from "../features/access-control/accountSlice";

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export async function getTokenizedAxios() {
  //   const dispatch = useAppDispatch();

  const instance = axios.create({
    //   baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //REQUEST INTERCEPTOR
  instance.interceptors.request.use(
    (config) => {
      const token = store.getState().account.idToken;
      if (config.headers && token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (
          (err.response.status === 401 || err.response.status === 403) &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          try {
            const refreshToken = getLocalRefreshToken();
            if (!refreshToken) return;
            await store.dispatch(refreshTokenSignIn({ refreshToken }));
            const idToken = store.getState().account.idToken;
            instance.defaults.headers.common["Authorization"] = idToken;
            return instance(originalConfig);
          } catch (_err) {
            const _error = _err as any;
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        // if (err.response.status === 403 && err.response.data) {
        //   return Promise.reject(err.response.data);
        // }
        console.log("Error Returned:", err);
      }
      return Promise.reject(err.response.data);
    }
  );

  return instance;
}
