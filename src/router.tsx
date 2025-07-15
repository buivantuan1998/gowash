import Layout from "@/components/layout";
import CartPage from "@/pages/cart";
import ProductListPage from "@/pages/catalog/product-list";
import CategoryListPage from "@/pages/catalog/category-list";
import ProductDetailPage from "@/pages/catalog/product-detail";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import SearchPage from "@/pages/search";
import OrderPage from "@/pages/order/index";
import OrderDetailPage from "@/pages/order/detail";
import NotifyPage from "@/pages/notify/index";
import NotifyDetailPage from "@/pages/notify/detail";
import StarRatePage from "@/pages/star-rate/index";
import HistoryWashPage from "@/pages/history-wash/index";
import ConfirmLink from "@/pages/authentication/confirm-link";
import HomeOrderDetail from "@/pages/home/order-detail";
import OrderLinkPage from "@/pages/authentication/order-link";

import { createBrowserRouter, Form } from "react-router-dom";
import { getBasePath } from "@/utils/zma";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ConfirmLink />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/home",
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/categories",
          element: <CategoryListPage />,
          handle: {
            title: "Danh mục sản phẩm",
            back: false,
          },
        },
        {
          path: "/cart",
          element: <CartPage />,
          handle: {
            title: "Giỏ hàng",
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/flash-sales",
          element: <ProductListPage />,
          handle: {
            title: "Flash Sales",
          },
        },
        {
          path: "/category/:id",
          element: <ProductListPage />,
          handle: {
            title: ({ categories, params }) =>
              categories.find((c) => c.id === Number(params.id))?.name,
          },
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0, // when user selects another product in related products, scroll to the top of the page
          },
        },
        {
          path: "/search",
          element: <SearchPage />,
          handle: {
            title: "Tìm kiếm",
          },
        },
        {
          path: "/order",
          element: <OrderPage />,
          handle: {
            title: "Hoá đơn",
          },
        },
        {
          path: "/order/:id",
          element: <OrderDetailPage />,
          handle: {
            title: "Chi tiết hóa đơn",
          },
        },

        // Notify
        {
          path: "/notify",
          element: <NotifyPage />,
          handle: {
            title: "Thông báo",
          },
        },
        {
          path: "/notify/:id",
          element: <NotifyDetailPage />,
          handle: {
            title: "Chi tiết thông báo",
          },
        },

        // Star rate
        {
          path: "/star-rate",
          element: <StarRatePage />,
          handle: {
            title: "Danh sách đánh giá",
          },
        },

        // History wash
        {
          path: "/history-wash",
          element: <HistoryWashPage />,
          handle: {
            title: "Lịch sử bảo dưỡng",
          },
        },

        {
          path: "/invoice/:id",
          element: <HomeOrderDetail />,
          handle: {
            logo: true,
          },
        },

        {
          path: "/order-detail",
          element: <OrderLinkPage />,
          handle: {
            logo: true,
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);

export default router;
