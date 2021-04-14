import { API_KEY } from "../constants";
import axiosClient from "./axiosClient";

class CurrentApi {
  get = (params) => {
    const url = "/weather";
    return axiosClient.get(url, { params });
  };
}
const currentApi = new CurrentApi();
export default currentApi;
