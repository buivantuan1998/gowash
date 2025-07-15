import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import RatingStart from "@/static/images/rating_start_white.png";
import Bills from "@/static/images/bill.png";
import HistoryWash from "@/static/images/history-wash.png";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const redirectOrderPage = () => {
    navigate(`/order`);
  };

  const redirectWashHistoryPage = () => {
    navigate(`/history-wash`);
  };

  const redirectStarRatePage = () => {
    navigate(`/star-rate`);
  };

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

export default HomePage;
