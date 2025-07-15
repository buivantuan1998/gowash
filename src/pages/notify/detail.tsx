import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

const NotifyDetailPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const item = {
    id: 1,
    title: "Bảo dưỡng định kỳ",
    time: "2024-12-24 14:39:45",
    address: "Cửa hàng A",
    content: "Vệ sinh xe phổ thông, thay nhớt Lab, thay dàu."
  }
  return (
    <Box className="mx-[5px]">
      <div className="text-[18px] font-[600] mb-[10px] text-center">Thông tin dịch vụ</div>
      <div className="grid grid-2573 text-[16px] mb-[6px]">
        <div className="font-[500]">Dịch vụ:</div>
        <div>{ item.title }</div>
      </div>
      <div className="grid grid-2573 text-[16px] mb-[6px]">
        <div className="font-[500]">Thời gian:</div>
        <div>{ item.time }</div>
      </div>
      <div className="grid grid-2573 text-[16px] mb-[6px]">
        <div className="font-[500]">Địa chỉ:</div>
        <div>{ item.address }</div>
      </div>
      <div className="grid grid-2573 text-[16px] mb-[6px]">
        <div className="font-[500]">Nội dung:</div>
        <div>{ item.content }</div>
      </div>
    </Box>
  );
};

export default NotifyDetailPage;
