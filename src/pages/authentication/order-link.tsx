import { useNavigate } from "react-router-dom";
import { Box, Modal, Text } from "zmp-ui";
import RatingStart from "@/static/images/rating_start_white.png";
import Bills from "@/static/images/bill.png";
import HistoryWash from "@/static/images/history-wash.png";
import { useEffect, useState } from "react";

import StarWhite from "@/static/images/star_white.png";
import StarYellow from "@/static/images/star_yellow.png";
import { GetApi, PostApi } from "@/api/baseApi";
import useGlobalState from "@/state/global_state";
import { AppStorage } from "@/storage/app_storate";
import { EndpointApp } from "@/api/endpoint";
import { authorize, getAccessToken, getPhoneNumber, showToast } from "zmp-sdk";
import { ZaloApi } from "@/api/zaloApi";

const OrderLinkPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const invoiceCode = params.get('invoice_code');

  const {
    showLoading,
    hideLoading,
    updatePhoneNumber,
    updateTokenUser,
    updateAccountData,
  } = useGlobalState();

  const redirectOrderPage = () => {
    navigate(`/order`);
  };

  const redirectWashHistoryPage = () => {
    navigate(`/history-wash`);
  };

  const redirectStarRatePage = () => {
    navigate(`/star-rate`);
  };

  const checkLogin = async () => {
    try {
      showLoading();
      const token = await AppStorage.getTokenUser();
      if (!token) {
        hideLoading();
        return;
      }
      const res = await GetApi(EndpointApp.GET_INFO);
    } catch (error) {
      console.error("checkLogin", error);
    }
    hideLoading();
  };

  const phoneNumberLinkAgree = async () => {
    try {
      showLoading();
      await authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      });

      const { token } = await getPhoneNumber();
      console.log("token", token);
      const accessToken = await getAccessToken({});
      console.log("accessToken", accessToken);
      const res = await ZaloApi.getPhone(accessToken, token);
      console.log("ZaloApi.getPhone", res);
      const phoneNumber = res.data?.data?.number;
      console.log("checkLogin23", phoneNumber);

      const resRegister = await PostApi(EndpointApp.LOGIN, {
        token: accessToken,
        phone: phoneNumber,
      });

      console.log("resRegister", resRegister, resRegister?.success);
      if (resRegister?.success == 1) {
        updatePhoneNumber(phoneNumber);
        updateTokenUser(resRegister?.token);
        updateAccountData(resRegister?.account ?? {});
        showToast({
          message: "Đăng nhập thành công",
          fail: (error) => {
            console.log(error);
          },
        });
        hideLoading();
        navigate("/home", {
          replace: true,
        });
      } else {
        showToast({
          message: "Không thể đăng nhập, vui lòng thử lại.",
          fail: (error) => {
            console.log(error);
          },
        });
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error("authorize error", error);
      showToast({
        message: "Không thể đăng nhập, vui lòng thử lại.",
        fail: (error) => {
          console.log(error);
        },
      });
    }
  };

  useEffect(() => {
    if (invoiceCode) {
      checkLogin();
      // phoneNumberLinkAgree();
    }
  }, [invoiceCode]);

  return (
    <div className="min-h-full bg-section">
      <Box>
        <div className="mt-[20px]">
          <div className="ml-[16px]">
            <div className="text-[18px] font-[600]">Tiện ích</div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div
              className="bg-[#1E90FF] grid justify-center py-[25px] rounded-xl"
              onClick={() => redirectStarRatePage()}
            >
              <img className="w-12 h-12 m-[auto]" src={RatingStart} />
              <Text size="xxSmall" className="text-[#FFFFFF] font-bold mt-[5px]">
                Đánh giá dịch vụ
              </Text>
            </div>
          </div>
        </div>
        <div className="ml-[16px]">
          <div className="text-[18px] font-[600]">Dịch vụ</div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div
            className="bg-[#1E90FF] grid justify-center py-[25px] rounded-xl"
            onClick={() => redirectOrderPage()}
          >
            <img className="w-12 h-12 m-[auto]" src={Bills} />
            <Text size="xxSmall" className="text-[#fff] font-bold mt-[5px]">
              Hóa đơn
            </Text>
          </div>

          <div
            className="bg-[#1E90FF] grid justify-center py-[25px] rounded-xl"
            onClick={() => redirectWashHistoryPage()}
          >
            <img className="w-12 h-12 m-[auto]" src={HistoryWash} />
            <Text size="xxSmall" className="text-[#fff] font-bold mt-[5px]">
              Lịch sử rửa xe
            </Text>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default OrderLinkPage;
