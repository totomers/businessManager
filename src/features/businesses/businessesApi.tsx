// import axios from "axios";
import { store } from "../../app/store";
import { CONFIG } from "../../config";
import { getTokenizedAxios } from "../../utils/axiosWithTokenGen";

export async function getBusinessesFromServer() {
  //gets all users owners and their businesses

  const axios = await getTokenizedAxios();
  const path = "/businesses/getAll";
  return axios.get(CONFIG.SERVER.BASE_URL + path).then((data) => data.data);
}

export async function getBusinessDetailsFromServer(_id: string) {
  //gets all users owners and their businesses
  const axios = await getTokenizedAxios();
  const path = "/businesses/getBusinessDetails/";
  console.log("_id", _id);

  return axios
    .get(CONFIG.SERVER.BASE_URL + path + _id)
    .then((data) => data.data);
}

export async function approveBusinessServer(props: {
  _id: string;
  email: string;
  merchantId: string;
}) {
  const { _id, email, merchantId } = props;
  const axios = await getTokenizedAxios();
  const path = "/businesses/approve";
  return axios
    .patch(CONFIG.SERVER.BASE_URL + path, { _id, email, merchantId })
    .then((data) => data.data);
}
export async function declineBusinessServer(props: {
  _id: string;
  email: string;
}) {
  const { _id, email } = props;
  const axios = await getTokenizedAxios();
  const path = "/businesses/decline";
  return axios
    .patch(CONFIG.SERVER.BASE_URL + path, { _id, email })
    .then((data) => data.data);
}
// export async function markBusinessAsPendingActionServer(props: {
//   _id: string;
// }) {
//   const { _id } = props;
//   const axios = await getTokenizedAxios();
//   const path = "/businesses/updateBusinessStatus";
//   return axios
//     .patch(CONFIG.SERVER.BASE_URL + path, { _id, status: "pendingAction" })
//     .then((data) => data.data);
// }
export async function markBusinessAsPendingVerificationServer(props: {
  _id: string;
}) {
  const { _id } = props;
  const axios = await getTokenizedAxios();
  const path = "/businesses/updateBusinessStatus";
  return axios
    .patch(CONFIG.SERVER.BASE_URL + path, {
      _id,
      status: "pendingVerification",
    })
    .then((data) => data.data);
}
