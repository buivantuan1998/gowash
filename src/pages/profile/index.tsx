import { Box } from "zmp-ui";
import ProfileActions from "./actions";
import FollowOA from "./follow-oa";
import Points from "./points";

export default function ProfilePage() {
  return (
    <Box>
      <Points />
      {/* <ProfileActions /> */}
      <FollowOA />
    </Box>
  );
}
