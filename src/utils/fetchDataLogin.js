import axios from 'axios';
import {
  warningAlert
} from "@/utils/alert";
import BASE_URL from './env'

const fetchDataLogin = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000, // 请求超时时间
  method: 'post',
});


fetchDataLogin.interceptors.response.use(function (response) {
  const res = response.data;
  if (res.outCode === 1) {
    sessionStorage.setItem("x-access-token", response.headers["x-access-token"]);
    return res;
  } else {
    return warningAlert(res.outMsg);
  }
});

export default fetchDataLogin;
