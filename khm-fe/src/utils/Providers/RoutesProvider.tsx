import AboutPage from "@/pages/AboutPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import HomePage from "@/pages/HomePage";
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoute from "./AuthContextProvider";
import AdminLayout from "@/admin/Layout";
import ProfilePage from "@/pages/ProfilePage";
import BlogList from "@/admin/pages/BlogList";
import UserList from "@/admin/pages/UserList";
import GuestLayout from "@/components/layouts/GuestLayout";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ErrorPage from "@/pages/ErrorPage";
import Overview from "@/admin/pages/Overview";
import ProductList from "@/admin/pages/Product";
import OrderList from "@/admin/pages/Order";
import DeliveryList from "@/admin/pages/Delivery";
import TransactionList from "@/admin/pages/Transaction";

const RoutesProvider = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "orders",
          element: <OrderList />,
        },
        {
          path: "delivery",
          element: <DeliveryList />,
        },
        {
          path: "transactions",
          element: <TransactionList />,
        },
      ],
    },
    {
      path: "/auth",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "reset-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RoutesProvider;
