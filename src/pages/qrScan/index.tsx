import React, { useEffect, useState } from "react";
import { Page, Header, Button, Text } from "zmp-ui";
import { scanQRCode, showToast } from "zmp-sdk";
import { PostApi } from "@/api/baseApi";
import { useNavigate } from "react-router";

const QrScan: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState("");
  const [invoiceCode, setInvoiceCode] = useState<string | null>(null);

  const handleScan = async () => {
    try {
      const { content } = await scanQRCode();
      setScanResult(content);

      try {
        const url = new URL(content);
        const code = url.searchParams.get("invoice_code");
        console.log("code: ", code);

        const response = await PostApi("/qr_scan/", { invoice_code: code });
        console.log("response: ", response);

        setInvoiceCode(code);
        if (response?.success === 1) {
          navigate("/order");
        } else if (response?.success === 0) {
          showToast({
            message: response?.message || "Mã QR không hợp lệ, vui lòng quét lại!",
          });
          setTimeout(() => {
            handleScan();
          }, 5000);
        }
      } catch (err) {
        console.error("Lỗi khi xử lý QR:", err);
        showToast({
          message: "Định dạng mã QR không hợp lệ!",
        });

        // Cho quét lại
        setTimeout(() => {
          handleScan();
        }, 5000);

        setInvoiceCode(null);
      }
    } catch (error) {
      console.error("Lỗi quét QR:", error);
      showToast({
        message: "Không thể quét mã, vui lòng thử lại!",
      });

      // Cho phép quét lại
      setTimeout(() => {
        handleScan();
      }, 5000);
    }
  };

  useEffect(() => {
    handleScan();
  }, []);

  return (
    <Page className="bg-black text-center min-h-screen flex flex-col">
      <Header
        title="Quét mã QR"
        showBackIcon
        onBackClick={() => window.history.back()}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Khung quét */}
        <div className="relative w-64 h-64 border-4 border-white rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scan"></div>
        </div>
        <Text className="mt-6 text-white text-base">
          Đưa mã QR vào vùng quét
        </Text>

        {invoiceCode && (
          <Text className="mt-4 text-green-400 break-all">
            Kết quả: {invoiceCode}
          </Text>
        )}

        <Button className="mt-6" type="highlight" onClick={handleScan}>
          Quét lại
        </Button>
      </div>
    </Page>
  );
}

export default QrScan;
