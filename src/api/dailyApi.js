import axiosClient from "./axiosClient";

class DailyApi {
  get = (params) => {
    const url = "/onecall";
    return axiosClient.get(url, { params });
  };
}
const dailyApi = new DailyApi();
export default dailyApi;
