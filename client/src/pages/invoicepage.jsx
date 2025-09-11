import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`https://green-pitch-server-production.up.railway.app//invoice/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoice(res.data.invoice);
        setLoading(false);
      } catch (e) {
        console.error("Could not fetch invoice:", e.response?.data || e.message);
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handlePayNow = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        `https://green-pitch-server-production.up.railway.app//payment/initiate/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.gateway_url) {
        // Redirect to SSLCommerz sandbox
        window.location.href = res.data.gateway_url;
      } else {
        alert("Payment gateway not available");
      }
    } catch (e) {
      console.error("Payment initiation failed:", e.response?.data || e.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div>
        <Navbar/>
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Invoice #{invoice.TranID}</h1>
      <p><strong>User ID:</strong> {invoice.UserID}</p>
      <p><strong>Price:</strong> ৳ {invoice.price}</p>
      <p><strong>VAT (5%):</strong> ৳ {invoice.vat}</p>
      <p><strong>Total Payable:</strong> ৳ {invoice.payable}</p>
      <div className="mt-6">
        <button
          onClick={handlePayNow}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition cursor-pointer"
        >
          Pay Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default InvoicePage;
