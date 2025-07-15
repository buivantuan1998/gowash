import React, { FC, useEffect, useState } from "react";
import { Box, Page } from "zmp-ui";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import Paper from "@/static/images/order-delivery.png";
import Banner from "@/static/gowash.png";
import useGlobalState from "@/state/global_state";
import { AppStorage } from "@/storage/app_storate";
import { GetApi, PostApi } from "@/api/baseApi";
import { EndpointApp } from "@/api/endpoint";
import { authorize, getAccessToken, getPhoneNumber, showToast } from "zmp-sdk";
import { ZaloApi } from "@/api/zaloApi";

const ConfirmLink: FC = () => {
  const navigate = useNavigate();

  const {
    showLoading,
    hideLoading,
    updatePhoneNumber,
    updateTokenUser,
    updateAccountData,
  } = useGlobalState();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      showLoading();
      const token = await AppStorage.getTokenUser();
      console.log("tokentoken", token);
      if (!token) {
        hideLoading();
        return;
      }

      const res = await GetApi(EndpointApp.GET_INFO);
      console.log("checkLogin", res);

      // navigate("/home", {
      //   replace: true,
      // });
    } catch (error) {
      console.error("checkLogin", error);
    }
    hideLoading();
  };

  const boderButton = {
    border: "1px solid #1463f4",
  };

  const boderButtonCancel = {
    border: "1px solid #e9ebed",
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

  const phoneNumberLinkCancel = () => {
    console.log("Cancel phone number link");
  };

  return (
    <Box className="bg-background">
      <div className="">
        <div className="mt-[20px]"></div>
        <div>
          <Swiper
            // modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            autoplay
            loop
            cssMode
          >
            <SwiperSlide className="">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url('${Banner}')`, height: "270px" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="my-[20px]">
          <div className="text-center font-semibold text-[20px]">
            Chào mừng bạn đến với Gowash!
          </div>
        </div>
        <div className="px-[10px]">
          <div className="grid">
            <div className="grid charging-history-grid-1285 mb-[10px]">
              <div className="grid justify-center items-center">
                <img className="w-7 h-7" src={Paper} />
              </div>
              <div className="">
                Gowash là chuỗi vệ sinh xe và mũ bảo hiểm tại hệ thống siêu thị trên toàn quốc.
              </div>
            </div>
            <div className="grid charging-history-grid-1285 mb-[10px]">
              <div className="grid justify-center items-center">
                <img className="w-7 h-7" src={Paper} />
              </div>
              <div className="">Gowash luôn chú trọng đến chất lượng dịch vụ để mang đến trải nghiệm tuyệt vời hơn.</div>
            </div>
            <div className="grid charging-history-grid-1285 mb-[10px]">
              <div className="grid justify-center items-center">
                <img className="w-7 h-7" src={Paper} />
              </div>
              <div className="">
                Sử dụng dịch vụ của Gowash giúp tiết kiệm thời gian và tiền bạc của người dùng.
              </div>
            </div>
          </div>
        </div>
        <div className="px-[10px]">
          <div className="text-[16px] text-center">
            Vui lòng đồng ý chia sẻ số điện thoại để liên kết với tài khoản của
            bạn trên hệ thống Gowash.
          </div>
        </div>
        <div className="px-[15px] ">
          <div
            className="grid rounded-2xl text-[#fff] h-[35px] text-center items-center text-[18px] bg-[#1463f4] mt-[20px] mb-[20px] font-semibold"
            style={boderButton}
            onClick={() => phoneNumberLinkAgree()}
          >
            Liên kết số điện thoại
          </div>

          <div
            className="grid rounded-2xl text-[#f70707] h-[35px] text-center items-center text-[18px] bg-[#e9ebed] mb-[20px] font-semibold"
            style={boderButtonCancel}
            onClick={() => phoneNumberLinkCancel()}
          >
            Từ chối và thoát
          </div>
        </div>
      </div>
    </Box>
  );
};

const ConfirmLinkPage: FC = () => {
  return (
    <Page>
      <ConfirmLink />
    </Page>
  );
};

export default ConfirmLinkPage;
