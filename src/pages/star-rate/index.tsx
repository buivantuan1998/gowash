import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

const StarRatePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box className="mx-[5px]">
        <div>This is rate star</div>
    </Box>
  );
};

export default StarRatePage;
