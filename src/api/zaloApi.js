import axios from "axios";
import { MINI_APP_PRIVATE_KEY } from "@/env";

const getPhone = (token, code) => {
  return axios.get(`https://graph.zalo.me/v2.0/me/info`, {
    headers: {
      access_token: token,
      code: code,
      secret_key: MINI_APP_PRIVATE_KEY,
    },
  });
};

export const ZaloApi = { getPhone };
