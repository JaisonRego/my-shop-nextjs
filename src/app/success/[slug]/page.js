"use client"; // Marking this file as a client component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();
  const slug = params?.slug;

  // Only render when slug is available
  if (!slug) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/orders/posttransaction?documentId=${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transaction data");
        }

        const data = await response.json();
        setTransactionData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  const { order } = transactionData; // Destructure order object from transaction data

  return (
    <div className="success-page" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Transaction Success
      </h1>
      <p style={{ textAlign: "center" }}>
        Your transaction ID: {order?.transactionId}
      </p>

      {/* Order Details Table */}
      <h2>Order Details</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Field
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Order ID</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.orderId}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Name</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.name}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Email</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.email}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Billing Address</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.billingAddress}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Shipping Address</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.shippingAddress}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Amount</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              ${order?.amount}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Order Status</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.orderStatus}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Transaction ID</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {order?.transactionId}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <strong>Created At</strong>
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {new Date(order?.createdAt).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Products Table */}
      <h3>Products</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Product Name
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products?.map((product, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product?.productName}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ${product?.price}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product?.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuccessPage;
