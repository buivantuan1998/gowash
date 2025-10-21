import React, { useEffect, useState } from "react";
import { Page, Box, Avatar, Button } from "zmp-ui";
import { animated, useSpring } from "@react-spring/web";
import { getUserInfo } from "zmp-sdk/apis";
import { getAccessToken, getPhoneNumber } from "zmp-sdk";
import { ZaloApi } from "@/api/zaloApi";

const Points: React.FunctionComponent = () => {
  const [user, setUser] = useState({} as any);
  const [phone, setPhone] = useState("");

  const avatarAnim = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 20 }
  });

  const formatPhoneNumber = (input: any) => {
    if (!input) return null;
    let localNumber = input.startsWith('84') ? '0' + input.slice(2) : input;
    return `${localNumber.slice(0, 4)}-${localNumber.slice(4, 7)}-${localNumber.slice(7)}`;
  }

  const getPhone = async () => {
    try {
      const {token} = await getPhoneNumber();
      const accessToken = await getAccessToken({});
      const res = await ZaloApi.getPhone(accessToken, token);
      setPhone(res.data?.data?.number);
    } catch (error) {
      console.error("authorize error", error);
    }
  };

  useEffect(() => {
    getUserInfo({
      success: (res) => {
        setUser((prev) => ({
          ...prev,
          name: res.userInfo.name,
          avatar: res.userInfo.avatar,
          id: res.userInfo.id
        }));
      },
      fail: (err) => {
        console.error("Lỗi lấy thông tin user:", err);
      },
    });
    getPhone();
    console.log("phone: ", phone);
    
  }, []);

  return (
    <Page className="bg-gradient-to-b from-blue-50 to-blue-100">
      <Box flex alignItems="center" justifyContent="space-between" className="p-4">
        <span className="text-lg font-semibold">Thông tin cá nhân</span>
      </Box>

      <Box flex justifyContent="center" className="mt-6 flex justify-center">
        <animated.div style={avatarAnim}>
          <Avatar src={user.avatar} size={96} />
        </animated.div>
      </Box>

      <h1 className="text-center text-xl font-bold mt-4">{user.name}</h1>
      <p className="text-center text-gray-600">ID: {user.id}</p>

      <Box className="bg-white rounded-2xl shadow-md mt-6 mx-4 p-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500 text-sm">Số điện thoại</span>
          <span className="text-gray-800 font-medium">{formatPhoneNumber(phone) || "Chưa cập nhật"}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-500 text-sm">Email</span>
          <span className="text-gray-800 font-medium">{user.email || "Chưa cập nhật"}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-500 text-sm">Ngày sinh</span>
          <span className="text-gray-800 font-medium">{user.joinDate || "—"}</span>
        </div>
      </Box>

      <Box flex className="mt-6 px-4">
        <div className="h-[10px]"></div>
      </Box>
    </Page>
  );
}

export default Points;