import axios, { AxiosError } from "axios";
import { store } from "../../app/store";
import { CONFIG } from "../../config";
import { getTokenizedAxios } from "../../utils/axiosWithTokenGen";

// (function () {
//   const token = store.getState().session.token;
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     axios.defaults.headers.common["Authorization"] = "";
//     /*if setting null does not remove `Authorization` header then try
//           delete axios.defaults.headers.common['Authorization'];
//         */
//   }
// })();

export async function signInServer(props: {
  email: string;
  password: string;
}): Promise<{ session: string }> {
  const axiosWithToken = await getTokenizedAxios();
  const { email, password } = props;
  //gets all users owners and their businesses
  console.log(email, password);

  const path = "/account/signIn";
  return axiosWithToken
    .post(CONFIG.SERVER.BASE_URL + path, { email, password })
    .then((data) => data.data);
}

export function respondToSignInServer(props: {
  session: string;
  confirmationCode: string;
  username: string;
}): Promise<
  | {
      tokens: { idToken: string; refreshToken: string };
    }
  | { session: string }
> {
  const { session, confirmationCode, username } = props;

  const path = "/account/respondToSignInChallenge";
  return axios
    .post(CONFIG.SERVER.BASE_URL + path, {
      session,
      confirmationCode,
      username,
    })
    .then((data) => data.data);
}

export function refreshTokenSignInServer(props: {
  refreshToken: string;
}): Promise<{ idToken: string }> {
  const { refreshToken } = props;
  const path = "/account/refreshTokenSignIn";
  return axios
    .post(CONFIG.SERVER.BASE_URL + path, {
      refreshToken,
    })
    .then((data) => data.data);
}
export async function logoutServer(props: {
  refreshToken: string;
}): Promise<{}> {
  const { refreshToken } = props;
  const axios = await getTokenizedAxios();
  const path = "/account/logout";
  return axios
    .post(CONFIG.SERVER.BASE_URL + path, {
      refreshToken,
    })
    .then((data) => data.data);
}
