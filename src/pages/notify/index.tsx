import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import Notify from "@/static/images/notify.png";

const NotifyPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const redirectDetailPage = (id: any) => {
    navigate(`/notify/${id}`);
  };

  const borderContent = {
    borderBottom: "1px solid #414752",
    borderTop: "1px solid #414752",
  };

  const data = [
    { id: 1, title: "Bảo dưỡng định kỳ", time: '2024-12-24 14:34:54' },
    { id: 2, title: "Ưu đãi cuối năm sử dụng dịch vụ ...", time: '2024-12-24 14:34:54' },
    { id: 3, title: "Thanh toán dịch vụ thành công ...", time: '2024-12-24 14:34:54' },
    { id: 4, title: "Thanh toán dịch vụ thành công ...", time: '2024-12-24 14:34:54' },
  ];

  return (
    <Box>
      <div className="mt-[20px]">
        {data?.map((item, index) => (
          <div
            className="grid justify-center py-[5px] charging-history-grid-1285 w-[96%] m-[auto]"
            style={borderContent} key={index}
            onClick={() => redirectDetailPage('2833721056')}
          >
            <div className="grid items-center justify-center">
              <img className="w-7 h-7" src={Notify} />
            </div>
            <div className="py-[10px]">
              <div>
                <div className="pb-[5px]">{ item.title }</div>
                <div className="pb-[5px] font-[12px] text-gray">{ item.time }</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default NotifyPage;
