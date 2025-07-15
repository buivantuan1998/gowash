import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

const HistoryWashPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box className="mx-[5px]">
        <div className="mt-[20xp]">
        {/* <div
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
          </div> */}
        </div>
    </Box>
  );
};

export default HistoryWashPage;
