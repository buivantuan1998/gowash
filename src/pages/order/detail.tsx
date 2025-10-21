import { useNavigate, useParams } from "react-router-dom";
import { Box, Modal } from "zmp-ui";
import { useEffect, useState } from "react";
import { PostApi } from "@/api/baseApi";
import { formatPrice, formatDateTime } from "@/utils/format";

import StarWhite from "@/static/images/star_white.png";
import StarYellow from "@/static/images/star_yellow.png";

const OrderDetailPage: React.FunctionComponent = () => {
  const [order, setOrder] = useState({} as any);
  const [showModalVote, setShowModalVote] = useState(false);
  const [star01, setStar01] = useState(false);
  const [star02, setStar02] = useState(false);
  const [star03, setStar03] = useState(false);
  const [star04, setStar04] = useState(false);
  const [star05, setStar05] = useState(false);
  const [rateStar, setRateStar] = useState(0);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const invoiceCode = params.get('invoice_code');

  const { id } = useParams();
  const stars = Array(5).fill(null);

  const getOrders = async () => {
    try {
      const response = await PostApi('/customer/invoice/get/', {});
      const data = response?.data?.filter((item: any) => item?.invoice_code == id)?.[0];
      setOrder(data);
    } catch (error) {
      console.log("errors: ", error);
    }
  };

  useEffect(() => {
    getOrders();
    // setShowModalVote(true);
  }, []);

  const voteStar = async () => {
    try {
      const fromData = {
        code: id,
        voted: rateStar,
      };
      await PostApi('/customer/invoice/voted/', fromData);
      setShowModalVote(false)
    } catch (error) {
      console.log("errors: ", error);
    }
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

  return (
    <Box>
      <div className="text-center">
        <div>Hotline CSKH: 0909.49.00.98</div>
        <div className="mb-[7px]">{order?.shop_addr}</div>
        <div>* * * * * * *</div>
      </div>
      <div className="text-center">
        <div className="text-[18px] font-[700]">Hóa Đơn Dịch Vụ</div>
        <div className="flex justify-center mt-[5px]">
          {
            stars?.map((_, index) => (
              <div key={index} className="grid justify-center items-center">
                <img className="w-5 h-5" src={StarYellow} alt="Star" />
              </div>
            ))
          }
        </div>
      </div>
      <div>
        <table id="order-detail-id">
          <thead>
            <tr>
              <th className="w-[30%]">Dịch vụ</th>
              <th className="w-[15%]">Số lượng</th>
              <th>Đơn giá</th>
              <th className="w-[30%]">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order?.data?.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item?.product_name}</td>
                <td className="text-center">{item?.amount}</td>
                <td className="text-center">{item?.money}</td>
                <td className="text-center">{item?.amount * item?.money}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex place-content-between mx-[7px]">
          <div className="text-[18px] font-[700]">Tổng Cộng</div>
          <div className="text-[18px] font-[700]">{formatPrice(order?.money)}</div>
        </div>
        <div className="text-center mt-[7px]">Thanh Toán {order?.payment_method}</div>
        <div className="flex place-content-between mx-[7px] mt-[5px]">
          <div>Bill:</div>
          <div>{order?.invoice_code}</div>
          <div>{formatDateTime(order?.created_at)}</div>
        </div>
      </div>

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
                    <img className="w-7 h-7" src={star01 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(2)}>
                    <img className="w-7 h-7" src={star02 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(3)}>
                    <img className="w-7 h-7" src={star03 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(4)}>
                    <img className="w-7 h-7" src={star04 ? StarYellow : StarWhite} />
                  </div>
                  <div className="grid justify-center items-center" onClick={() => selectVote(5)}>
                    <img className="w-7 h-7" src={star05 ? StarYellow : StarWhite} />
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
    </Box>
  );
};

export default OrderDetailPage;
