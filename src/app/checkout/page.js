"use client"; // Marking this file as a client component

import React, { useState, useEffect } from "react";
import { useCart } from "../../context/cartContext";
import { useRouter } from "next/navigation";

// Input component to handle form inputs
const InputField = ({
  name,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const TextAreaField = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Function to load Paytm CheckoutJS script
const usePaytmScript = (onScriptLoad) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/javascript";
    script.src = `${process.env.NEXT_PUBLIC_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`;
    script.onload = onScriptLoad;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [onScriptLoad]);
};

export default function Checkout() {
  const router = useRouter();

  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
    paymentMethod: "Credit Card",
  });
  const [errors, setErrors] = useState({});

  // Script loading logic for Paytm
  const onScriptLoad = () => {
    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: "",
        token: "",
        tokenType: "TXN_TOKEN",
        amount: "",
      },
      handler: {
        notifyMerchant: (eventName, data) => {
          console.log("notifyMerchant handler:", eventName, data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.onLoad(() => {
        window.Paytm.CheckoutJS.init(config)
          .then(() => window.Paytm.CheckoutJS.invoke())
          .catch(console.error);
      });
    }
  };

  // Load the Paytm CheckoutJS script
  usePaytmScript(onScriptLoad);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.billingAddress.trim())
      newErrors.billingAddress = "Billing address is required.";
    if (!formData.shippingAddress.trim())
      newErrors.shippingAddress = "Shipping address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2 && !validateForm()) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handlePay = async () => {
    const orderDetails = {
      email: formData.email,
      orderId: `ORDER_${new Date().getTime()}`,
      paymentInfo: {
        paymentMethod: formData.paymentMethod,
        transactionId: `TXN_${new Date().getTime()}`,
      },
      products: cart.map((item) => ({
        productId: "P" + String(item[0].id),
        productName: item[0].title,
        price: item[0].price,
        quantity: 1,
      })),
      address: {
        billingAddress: formData.billingAddress,
        shippingAddress: formData.shippingAddress,
      },
      name: formData.name,
      amount: cart.reduce((total, item) => total + item[0].price, 0),
      orderStatus: "PENDING",
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/orders/pretransaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails), // Send the whole object as JSON
        }
      );

      if (!response.ok) throw new Error("Failed to initiate the transaction");

      const data = await response.json();
      if (data?.body?.txnToken) {
        alert("Payment Confirmed!");
        router.push(`/success/${data?.documentId}`);
      } else {
        throw new Error("Transaction token is missing");
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      alert("Payment failed. Please try again later.");
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
          Checkout Page
        </h1>
        <div className="lg:w-2/3 md:w-3/4 mx-auto bg-white rounded-lg shadow-lg p-8">
          {cart.length === 0 ? (
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-800 mb-6">
                Your cart is empty.
              </h2>
              <button className="text-white bg-blue-500 px-8 py-2 rounded-lg text-lg font-medium hover:bg-blue-600">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <>
                  <h2 className="text-lg font-medium text-gray-800 mb-3">
                    Cart Details
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center font-bold text-lg border-b pb-3">
                      <span>Item</span>
                      <span>Cost</span>
                    </li>
                    {cart.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b pb-3"
                      >
                        <span>{item[0].title}</span>
                        <span className="text-gray-600">${item[0].price}</span>
                      </li>
                    ))}
                    <li className="flex justify-between items-center font-bold text-lg mt-4">
                      <span>Subtotal</span>
                      <span className="text-gray-900">
                        $
                        {cart.reduce((total, item) => total + item[0].price, 0)}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleNext}
                      className="text-white bg-indigo-500 px-8 py-2 rounded-lg text-lg font-medium hover:bg-indigo-600"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h2 className="text-lg font-medium text-gray-800 mb-3">
                    Customer Details
                  </h2>
                  <InputField
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="Enter your name"
                  />
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="Enter your email"
                  />
                  <InputField
                    name="phone"
                    label="Phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="Enter your phone number"
                  />
                  <TextAreaField
                    name="billingAddress"
                    label="Billing Address"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    error={errors.billingAddress}
                    placeholder="Enter your billing address"
                  />
                  <TextAreaField
                    name="shippingAddress"
                    label="Shipping Address"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    error={errors.shippingAddress}
                    placeholder="Enter your shipping address"
                  />
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handlePrevious}
                      className="text-white bg-gray-500 px-8 py-2 rounded-lg text-lg font-medium hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePay}
                      className="text-white bg-green-500 px-8 py-2 rounded-lg text-lg font-medium hover:bg-green-600"
                    >
                      Pay Now
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
