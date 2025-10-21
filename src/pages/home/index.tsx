import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import RatingStart from "@/static/images/rating_start_white.png";
import Bills from "@/static/images/bill.png";
import HistoryWash from "@/static/images/history-wash.png";
import { PostApi } from "@/api/baseApi";
import { useEffect, useState } from "react";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [invoiceCode, setInvoiceCode] = useState("");

  const qrScan = async () => {
    try {
      const response = await PostApi("/qr_scan/", { invoice_code: invoiceCode });
      if (response?.success === 1) {
        navigate(`/order`);
      }
      console.log("response: ", response);
    } catch (error) {
      console.error("errors: ", error);
    }
  };

  useEffect(() => {
    if (invoiceCode) {
      qrScan();
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
              onClick={() => navigate(`/star-rate`)}
            >
              <img className="w-12 h-12 m-[auto]" src={RatingStart} />
              <Text size="xxSmall" className="text-[#FFFFFF] font-bold mt-[5px]">
                Lịch sử dánh giá
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
            onClick={() => navigate(`/order`)}
          >
            <img className="w-12 h-12 m-[auto]" src={Bills} />
            <Text size="xxSmall" className="text-[#fff] font-bold mt-[5px]">
              Hóa đơn
            </Text>
          </div>

          <div
            className="bg-[#1E90FF] grid justify-center py-[25px] rounded-xl"
            onClick={() => navigate(`/history-wash`)}
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

export default HomePage;
