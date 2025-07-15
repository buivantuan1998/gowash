import { useNavigate } from "react-router-dom";
import { Box } from "zmp-ui";
import OrderDelivery from "@/static/images/order-delivery.png";
import { useEffect, useState } from "react";

import { PostApi } from "@/api/baseApi";
import { formatPrice, formatDateTime } from "@/utils/format";

const OrderPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const redirectDetailPage = (id: any) => {
        navigate(`/order/${id}`);
    };

    const borderContent = {
        borderBottom: "1px solid #414752",
        borderTop: "1px solid #414752",
    };

    const getOrders = async () => {
        try {
            const response = await PostApi('/customer/invoice/get/', {});
            setOrders(response?.data);
        } catch (error) {
            console.log("errors: ", error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Box>
            <div className="mt-[20px]">
                {orders?.map((item: any, index) => (
                    <div
                        className="grid justify-center py-[5px] charging-history-grid-1285 w-[96%] m-[auto]"
                        style={borderContent} key={index}
                        onClick={() => redirectDetailPage(item?.invoice_code)}
                    >
                        <div className="grid items-center justify-center">
                            <img className="w-7 h-7" src={OrderDelivery} />
                        </div>
                        <div className="py-[10px] grid grid-6533">
                            <div>
                                <div className="pb-[5px]">{ item?.invoice_code }</div>
                                <div className="pb-[5px] font-[12px] text-gray">{ formatDateTime(item?.created_at) }</div>
                                <div className="pb-[5px] font-[12px] text-gray">{ item?.payment_method }</div>
                            </div>
                            <div className="text-center m-[auto]">
                                <div>{ formatPrice(item?.money) }</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Box>
    );
}

export default OrderPage;
