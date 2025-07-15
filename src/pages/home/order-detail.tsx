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

const HomeOrderPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [showModalVote, setShowModalVote] = useState(false);
  const [star01, setStar01] = useState(false);
  const [star02, setStar02] = useState(false);
  const [star03, setStar03] = useState(false);
  const [star04, setStar04] = useState(false);
  const [star05, setStar05] = useState(false);
  const [rateStar, setRateStar] = useState(0);

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

  const selectVote = (numberStart: any) => {
    if (numberStart == 1) {
      setStar01(true);
      setStar02(false);
      setStar03(false);
      setStar04(false);
      setStar05(false);
    } else if (numberStart == 2) {
      setStar01(true);
      setStar02(true);
      setStar03(false);
      setStar04(false);
      setStar05(false);
    } else if (numberStart == 3) {
      setStar01(true);
      setStar02(true);
      setStar03(true);
      setStar04(false);
      setStar05(false);
    } else if (numberStart == 4) {
      setStar01(true);
      setStar02(true);
      setStar03(true);
      setStar04(true);
      setStar05(false);
    } else if (numberStart == 5) {
      setStar01(true);
      setStar02(true);
      setStar03(true);
      setStar04(true);
      setStar05(true);
    }
    setRateStar(numberStart);
  }

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
        navigate("/invoice", {
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

  const voteStar = async () => {
    try {
      const fromData = {
        code: invoiceCode,
        voted: rateStar,
      };
      await PostApi('/customer/invoice/voted/', fromData);
      setShowModalVote(false)
    } catch (error) {
      console.log("errors: ", error);
    }
  };

  useEffect(() => {
    if (invoiceCode) {
      setShowModalVote(true);
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

      <Modal
        visible={showModalVote}
        title="Bạn có hài lòng với dịch vụ không ?"
        onClose={() => {
          setShowModalVote(false);
        }}
        verticalActions
      >
        <Box>
          <div className="">
            <div className="overflow-y-scroll">
              <div className="form-submit form">
                <div className="grid grid-1918191919 mb-[10px] mt-[15px]">
                  <div className="grid justify-center items-center" onClick={() => selectVote(1)}>
                    <img className="w-7 h-7" src={ star01 ? StarYellow : StarWhite } />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(2)}>
                    <img className="w-7 h-7" src={ star02 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(3)}>
                    <img className="w-7 h-7" src={ star03 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(4)}>
                    <img className="w-7 h-7" src={ star04 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(5)}>
                    <img className="w-7 h-7" src={ star05 ? StarYellow : StarWhite} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid justify-center">
            <div
              className="grid bg-[#28A745] w-[110px] h-[30px] text-center items-center rounded-xl font-bold mt-[20px] text-[#ffffff]"
              onClick={() => voteStar()}
            >
              Đóng
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HomeOrderPage;
