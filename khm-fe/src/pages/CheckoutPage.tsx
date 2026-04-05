/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { assets } from "@/assets/Assets";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDelivery } from "@/apis/delivery";
import { CardFormData, DeliveryFormData, MobileFormData } from "@/types/common";
import { createPayment } from "@/apis/payment";
import { DELIVERY, PAYMENT } from "@/utils/constants/queryKeys";
import { formatNumberWithCommas } from "@/utils/formats/formats";

const initialDeliveryFormData: DeliveryFormData = {
  customerFirstName: "",
  customerLastName: "",
  customerEmail: "",
  address: "",
  customerPhone: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
  orderId: "",
};

const initialCardFormData: CardFormData = {
  cardName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
  method: "CARD",
  orderId: "",
};

const initialMobileFormData: MobileFormData = {
  accountNumber: "",
  amount: 0,
  method: "",
  orderId: "",
};

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId") || "";
  const orderNumber = searchParams.get("orderNumber") || "";

  const [formDeliveryData, setFormDeliveryData] = useState<DeliveryFormData>({
    ...initialDeliveryFormData,
    orderId,
  });
  const [formCardData, setFormCardData] = useState<CardFormData>({
    ...initialCardFormData,
    orderId,
  });
  const [formMobileData, setFormMobileData] = useState<MobileFormData>({
    ...initialMobileFormData,
    orderId,
  });
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("mtn");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { cart, cartTotal, clearCart } = useCart();
  const queryClient = useQueryClient();
  const shippingCost = cartTotal > 100 ? 0 : 10;
  const totalAmount = cartTotal + shippingCost;

  const createDeliveryMutation = useMutation({
    mutationFn: (data: DeliveryFormData) => createDelivery(data),
  });

  const createPaymentMutation = useMutation({
    mutationFn: (data: MobileFormData) => createPayment(data),
  });

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  // Validate expiry date (MM/YY format)
  const isValidExpiryDate = (value: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [month, year] = value.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) return false;
    if (year < currentYear || (year === currentYear && month < currentMonth))
      return false;

    return true;
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Remove error for a specific field
  const removeError = (field: string) => {
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  // Handle input changes with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    // Handle different input types
    switch (name) {
      case "customerFirstName":
      case "customerLastName":
        // Only allow letters and spaces
        cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "customerEmail":
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: value,
        }));
        if (value && !isValidEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Please enter a valid email address.",
          }));
        } else {
          removeError(name);
        }
        break;

      case "address":
      case "city":
      case "province":
        // Allow letters, numbers, spaces, and common punctuation
        cleanedValue = value.replace(/[^a-zA-Z0-9\s\-.,]/g, "");
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "postalCode":
        // Allow alphanumeric characters
        cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "country":
        // Only allow letters and spaces
        cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "customerPhone":
        // Allow numbers, spaces, hyphens, parentheses, and plus sign
        cleanedValue = value.replace(/[^0-9\s\-\(\)\+]/g, "");
        setFormDeliveryData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "cardName":
        cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
        setFormCardData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        removeError(name);
        break;

      case "accountNumber":
        cleanedValue = value.replace(/\D/g, "").slice(0, 10);

        if (paymentMethod === "mtn") {
          setFormMobileData((prev) => ({
            ...prev,
            accountNumber: cleanedValue,
            amount: totalAmount,
            method: "MTN_MOBILE_MONEY",
          }));

          if (
            cleanedValue &&
            (!/^(078|079)/.test(cleanedValue) || cleanedValue.length !== 10)
          ) {
            setErrors((prev) => ({
              ...prev,
              [name]: "MTN number must start with 078 or 079 and be 10 digits.",
            }));
          } else {
            removeError(name);
          }
        } else if (paymentMethod === "airtel") {
          setFormMobileData((prev) => ({
            ...prev,
            accountNumber: cleanedValue,
            amount: totalAmount,
            method: "AIRTEL_MONEY",
          }));

          if (
            cleanedValue &&
            (!/^(072|073)/.test(cleanedValue) || cleanedValue.length !== 10)
          ) {
            setErrors((prev) => ({
              ...prev,
              [name]: "Airtel number must start with 072 or 073 and be 10 digits.",
            }));
          } else {
            removeError(name);
          }
        }
        break;

      case "expDate":
        cleanedValue = formatExpiryDate(value);
        setFormCardData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        if (cleanedValue.length === 5 && !isValidExpiryDate(cleanedValue)) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Please enter a valid expiry date (MM/YY).",
          }));
        } else {
          removeError(name);
        }
        break;

      case "cvv":
        cleanedValue = value.replace(/\D/g, "").slice(0, 4);
        setFormCardData((prev) => ({
          ...prev,
          [name]: cleanedValue,
        }));
        if (cleanedValue && !/^\d{3,4}$/.test(cleanedValue)) {
          setErrors((prev) => ({ ...prev, [name]: "CVV must be 3 or 4 digits." }));
        } else {
          removeError(name);
        }
        break;

      case "cardNumber":
        if (paymentMethod === "bank") {
          cleanedValue = value.replace(/\D/g, "").slice(0, 16);
          setFormCardData((prev) => ({
            ...prev,
            [name]: cleanedValue,
          }));
          if (cleanedValue && cleanedValue.length !== 16) {
            setErrors((prev) => ({
              ...prev,
              [name]: "Card number must be 16 digits.",
            }));
          } else {
            removeError(name);
          }
        }
        break;

      default:
        break;
    }
  };

  // Validate delivery form
  const validateDeliveryForm = (): boolean => {
    const requiredFields = [
      "customerFirstName",
      "customerLastName",
      "customerEmail",
      "address",
      "city",
      "province",
      "postalCode",
      "country",
      "customerPhone",
    ];

    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!formDeliveryData[field as keyof DeliveryFormData]) {
        newErrors[field] = "This field is required.";
      }
    });

    // Additional email validation
    if (
      formDeliveryData.customerEmail &&
      !isValidEmail(formDeliveryData.customerEmail)
    ) {
      newErrors.customerEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment form
  const validatePaymentForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "bank") {
      // Bank payment validation
      if (!formCardData.cardName) {
        newErrors.cardName = "Name on card is required.";
      }
      if (!formCardData.cardNumber) {
        newErrors.cardNumber = "Card number is required.";
      } else if (formCardData.cardNumber.length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!formCardData.expDate) {
        newErrors.expDate = "Expiry date is required.";
      } else if (!isValidExpiryDate(formCardData.expDate)) {
        newErrors.expDate = "Please enter a valid expiry date (MM/YY).";
      }
      if (!formCardData.cvv) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3,4}$/.test(formCardData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits.";
      }
    } else {
      // Mobile money validation
      if (!formMobileData.accountNumber) {
        newErrors.accountNumber = "Mobile number is required.";
      } else {
        if (
          paymentMethod === "mtn" &&
          (!/^(078|079)/.test(formMobileData.accountNumber) ||
            formMobileData.accountNumber.length !== 10)
        ) {
          newErrors.accountNumber =
            "MTN number must start with 078 or 079 and be 10 digits.";
        } else if (
          paymentMethod === "airtel" &&
          (!/^(072|073)/.test(formMobileData.accountNumber) ||
            formMobileData.accountNumber.length !== 10)
        ) {
          newErrors.accountNumber =
            "Airtel number must start with 072 or 073 and be 10 digits.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setFormDeliveryData((prev) => ({ ...prev, orderId }));
    setFormCardData((prev) => ({ ...prev, orderId }));
    setFormMobileData((prev) => ({ ...prev, orderId }));
  }, [orderId]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePaymentForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // First create delivery
      await createDeliveryMutation.mutateAsync(formDeliveryData);
      queryClient.invalidateQueries({ queryKey: [DELIVERY] });

      if (paymentMethod === "bank") {
        toast.error(
          "Payment with credit card is not available. Please try another method.",
        );
        setIsProcessing(false);
        return;
      }

      // Then process payment
      if (paymentMethod === "mtn" || paymentMethod === "airtel") {
        await createPaymentMutation.mutateAsync(formMobileData);
        queryClient.invalidateQueries({ queryKey: [PAYMENT] });
        toast.success("Order placed successfully!");
        setIsCompleted(true);
        clearCart();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle delivery form submission
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    if (!validateDeliveryForm()) return;

    setStep(2);
    window.scrollTo(0, 0);
  };

  // Handle back navigation
  const goBack = () => {
    if (!orderId) {
      navigate("/cart");
    } else if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // Clear mobile number error when payment method changes
  useEffect(() => {
    if (
      formMobileData.accountNumber &&
      (paymentMethod === "mtn" || paymentMethod === "airtel")
    ) {
      // Re-validate mobile number with new payment method
      const event = {
        target: { name: "accountNumber", value: formMobileData.accountNumber },
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Button
          variant='ghost'
          onClick={goBack}
          className='mb-4'
          disabled={isCompleted || isProcessing || step === 1}
        >
          <ChevronLeft className='h-4 w-4 mr-2' />
          Back
        </Button>

        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

        {isCompleted ? (
          <div className='bg-white rounded-lg shadow-sm p-8 text-center'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='h-8 w-8 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold mb-2'>Thank you for your order!</h2>
            <p className='text-gray-600 mb-6'>
              Your order has been placed and will be processed soon. We've sent a
              confirmation email to {formDeliveryData.customerEmail}.
            </p>
            <p className='font-medium mb-6'>Order number: #{orderNumber}</p>{" "}
            {/* Display orderNumber */}
            <Button asChild>
              <a href='/'>Return to Home Page</a>
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                <div className='border-b'>
                  <div className='flex'>
                    <div
                      className={`flex-1 py-4 px-6 text-center border-r font-medium ${
                        step === 1 ? "bg-blue-50 text-blue-600" : "text-gray-500"
                      }`}
                    >
                      1. Delivery
                    </div>
                    <div
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        step === 2 ? "bg-blue-50 text-blue-600" : "text-gray-500"
                      }`}
                    >
                      2. Payment
                    </div>
                  </div>
                </div>

                {/* Delivery Info Form */}
                {step === 1 && (
                  <form onSubmit={handleDeliverySubmit} className='p-6 space-y-4'>
                    <h2 className='text-xl font-medium mb-4'>
                      Delivery Information
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='customerFirstName'>First Name *</Label>
                        <Input
                          name='customerFirstName'
                          value={formDeliveryData.customerFirstName}
                          onChange={handleInputChange}
                          className={
                            errors.customerFirstName ? "border-red-500" : ""
                          }
                        />
                        {errors.customerFirstName && (
                          <p className='text-sm text-red-500'>
                            {errors.customerFirstName}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='customerLastName'>Last Name *</Label>
                        <Input
                          name='customerLastName'
                          value={formDeliveryData.customerLastName}
                          onChange={handleInputChange}
                          className={errors.customerLastName ? "border-red-500" : ""}
                        />
                        {errors.customerLastName && (
                          <p className='text-sm text-red-500'>
                            {errors.customerLastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='customerEmail'>Email Address *</Label>
                      <Input
                        type='email'
                        name='customerEmail'
                        value={formDeliveryData.customerEmail}
                        onChange={handleInputChange}
                        className={errors.customerEmail ? "border-red-500" : ""}
                      />
                      {errors.customerEmail && (
                        <p className='text-sm text-red-500'>
                          {errors.customerEmail}
                        </p>
                      )}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='customerPhone'>Customer Phone *</Label>
                        <Input
                          name='customerPhone'
                          value={formDeliveryData.customerPhone}
                          onChange={handleInputChange}
                          className={errors.customerPhone ? "border-red-500" : ""}
                        />
                        {errors.customerPhone && (
                          <p className='text-sm text-red-500'>
                            {errors.customerPhone}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='address'>Street Address *</Label>
                        <Input
                          name='address'
                          value={formDeliveryData.address}
                          onChange={handleInputChange}
                          className={errors.address ? "border-red-500" : ""}
                        />
                        {errors.address && (
                          <p className='text-sm text-red-500'>{errors.address}</p>
                        )}
                      </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='city'>City *</Label>
                        <Input
                          name='city'
                          value={formDeliveryData.city}
                          onChange={handleInputChange}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && (
                          <p className='text-sm text-red-500'>{errors.city}</p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='province'>State / Province *</Label>
                        <Input
                          name='province'
                          value={formDeliveryData.province}
                          onChange={handleInputChange}
                          className={errors.province ? "border-red-500" : ""}
                        />
                        {errors.province && (
                          <p className='text-sm text-red-500'>{errors.province}</p>
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='postalCode'>ZIP / Postal Code *</Label>
                        <Input
                          name='postalCode'
                          value={formDeliveryData.postalCode}
                          onChange={handleInputChange}
                          className={errors.postalCode ? "border-red-500" : ""}
                        />
                        {errors.postalCode && (
                          <p className='text-sm text-red-500'>{errors.postalCode}</p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='country'>Country *</Label>
                        <Input
                          name='country'
                          value={formDeliveryData.country}
                          onChange={handleInputChange}
                          className={errors.country ? "border-red-500" : ""}
                        />
                        {errors.country && (
                          <p className='text-sm text-red-500'>{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type='submit'
                      className='w-full mt-6'
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Loading..." : "Continue to Payment"}
                    </Button>
                  </form>
                )}

                {/* Payment Form */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className='p-6 space-y-4'>
                    {/* Payment Methods */}
                    <div className='flex flex-wrap gap-3 mb-6'>
                      {["mtn", "airtel", "bank"].map((method) => (
                        <div
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`flex-1 min-w-[120px] relative flex items-center justify-center cursor-pointer p-3 rounded-lg font-medium transition-all ${
                            method === "mtn"
                              ? "bg-[#ffcb04] text-black"
                              : method === "airtel"
                              ? "bg-[#E20010] text-white"
                              : "bg-blue-500 text-white"
                          } ${
                            paymentMethod === method
                              ? "ring-2 ring-offset-2 ring-gray-400"
                              : ""
                          }`}
                        >
                          {paymentMethod === method && (
                            <CheckBadgeIcon
                              className={`h-5 w-5 absolute top-1 right-1 ${
                                method === "mtn"
                                  ? "text-green-600"
                                  : method === "airtel"
                                  ? "text-white"
                                  : "text-white"
                              }`}
                            />
                          )}
                          <img
                            src={assets.icons[method]}
                            alt={method}
                            className='h-6 mr-2 rounded'
                          />
                          <span className='hidden sm:inline'>
                            {method === "mtn"
                              ? "MTN MoMo"
                              : method === "airtel"
                              ? "Airtel Money"
                              : "Bank Card"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <h2 className='text-xl font-medium mb-4'>Payment Information</h2>

                    {/* Mobile Money Payment */}
                    {paymentMethod !== "bank" && (
                      <>
                        <div className='space-y-2'>
                          <Label className='font-medium'>Total Amount</Label>
                          <h3 className='font-bold text-2xl text-green-600'>
                            RWF {formatNumberWithCommas(totalAmount)}
                          </h3>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='mobileNumber'>Mobile Number *</Label>
                          <Input
                            name='accountNumber'
                            value={formMobileData.accountNumber}
                            onChange={handleInputChange}
                            placeholder={
                              paymentMethod === "mtn" ? "078XXXXXXX" : "073XXXXXXX"
                            }
                            className={errors.accountNumber ? "border-red-500" : ""}
                          />
                          {errors.accountNumber && (
                            <p className='text-sm text-red-500'>
                              {errors.accountNumber}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Bank Card Payment */}
                    {paymentMethod === "bank" && (
                      <>
                        <div className='space-y-2'>
                          <Label htmlFor='cardName'>Name on Card *</Label>
                          <Input
                            name='cardName'
                            value={formCardData.cardName}
                            onChange={handleInputChange}
                            className={errors.cardName ? "border-red-500" : ""}
                          />
                          {errors.cardName && (
                            <p className='text-sm text-red-500'>{errors.cardName}</p>
                          )}
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='cardNumber'>Card Number *</Label>
                          <Input
                            name='cardNumber'
                            value={formCardData.cardNumber}
                            onChange={handleInputChange}
                            placeholder='1234567890123456'
                            className={errors.cardNumber ? "border-red-500" : ""}
                          />
                          {errors.cardNumber && (
                            <p className='text-sm text-red-500'>
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='expDate'>Expiration Date *</Label>
                            <Input
                              name='expDate'
                              placeholder='MM/YY'
                              value={formCardData.expDate}
                              onChange={handleInputChange}
                              className={errors.expDate ? "border-red-500" : ""}
                            />
                            {errors.expDate && (
                              <p className='text-sm text-red-500'>
                                {errors.expDate}
                              </p>
                            )}
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='cvv'>CVV *</Label>
                            <Input
                              name='cvv'
                              placeholder='123'
                              value={formCardData.cvv}
                              onChange={handleInputChange}
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && (
                              <p className='text-sm text-red-500'>{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    <Button
                      type='submit'
                      className='w-full mt-6'
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Processing..."
                        : `Pay RWF ${formatNumberWithCommas(totalAmount)}`}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className='bg-white rounded-lg shadow-sm p-6 h-fit'>
              <h2 className='text-xl font-medium mb-4'>Order Summary</h2>
              <div className='mb-4 space-y-3'>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className='flex justify-between items-center text-sm'
                  >
                    <div className='flex-1'>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-gray-500'>Qty: {item.quantity}</p>
                    </div>
                    <span className='font-medium'>
                      RWF {formatNumberWithCommas(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className='border-t pt-4 space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>RWF {formatNumberWithCommas(cartTotal)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className='text-green-600 font-medium'>Free</span>
                    ) : (
                      `RWF ${formatNumberWithCommas(shippingCost)}`
                    )}
                  </span>
                </div>
                <div className='flex justify-between font-semibold text-base pt-2 border-t'>
                  <span>Total</span>
                  <span>RWF {formatNumberWithCommas(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
