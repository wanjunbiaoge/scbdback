import axios from 'axios';
import {
  warningAlert
} from "@/utils/alert";
import BASE_URL from './env'
import router from '../router'
const fetchData = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000, // 请求超时时间
  method: 'post',
});

fetchData.interceptors.request.use((request) => {
  request.headers["x-access-token"] = localStorage.getItem("x-access-token")
  return request
});

fetchData.interceptors.response.use(function (response) {
  const res = response.data;
  if (res.outCode === 1) {
    return res;
  } else {
    if (res.outCode == (-1)) {
      router.push('/login')
    }
    return warningAlert(res.outMsg);
  }
});

export default fetchData;
