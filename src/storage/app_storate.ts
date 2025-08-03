import { getStorage, setStorage } from "zmp-sdk";

const saveTokenUser = async (token: string) => {
  try {
    await setStorage({
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(">>> saveLoginData error", error);
  }
};

const getTokenUser = async () => {
  try {
    const { token } = await getStorage({
      keys: ["token"],
    });
    return token;
  } catch (error) {
    console.log(">>> getTokenUser error", error);
  }
};

const savePhoneNumber = async (data: string) => {
  try {
    await setStorage({
      data: {
        phone: data,
      },
    });
  } catch (error) {
    console.log(">>> savePhoneNumber error", error);
  }
};

const getPhoneNumber = async () => {
  try {
    const { phone } = await getStorage({
      keys: ["phone"],
    });
    return phone;
  } catch (error) {
    console.log(">>> getPhoneNumber error", error);
  }
};

export const AppStorage = {
  saveTokenUser,
  getTokenUser,
  savePhoneNumber,
  getPhoneNumber,
};

