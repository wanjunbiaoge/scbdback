import axios from 'axios';
import {
  warningAlert
} from "@/utils/alert";
import BASE_URL from './env'

const fetchData = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000, // 请求超时时间
  method: 'post',
});


fetchData.interceptors.response.use(function (response) {
  const res = response.data;
  if (res.outCode === 1) {
    return res;
  } else {
    return warningAlert(res.outMsg);
  }
});

export default fetchData;
