import React from "react";

const mockCart = [
  { title: "The Fundamentals of Fiqh", price: 1200, quantity: 1 },
  { title: "Tafsir Ibn Kathir", price: 2200, quantity: 2 },
];

const CheckoutPage = () => {
  const subtotal = mockCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 250;
  const discount = 300;
  const total = subtotal + delivery - discount;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <input
                className="w-full bg-gray-700 p-3 rounded text-white placeholder-gray-400"
                placeholder="Full Name"
              />
              <input
                className="w-full bg-gray-700 p-3 rounded text-white placeholder-gray-400"
                placeholder="Email Address"
              />
              <input
                className="w-full bg-gray-700 p-3 rounded text-white placeholder-gray-400"
                placeholder="Phone Number"
              />
              <textarea
                className="w-full bg-gray-700 p-3 rounded text-white placeholder-gray-400"
                placeholder="Delivery Address"
              />
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-purple-500" />
                M-Pesa
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-purple-500" />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-purple-500" />
                PayPal
              </label>
            </div>
          </div>
        </div>

        {/* Cart and Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            <ul className="divide-y divide-gray-700">
              {mockCart.map((item, idx) => (
                <li key={idx} className="py-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity} × KES {item.price}
                    </p>
                  </div>
                  <div className="font-semibold">
                    KES {item.quantity * item.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-3">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>KES {subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span>
              <span>KES {delivery}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>Discount</span>
              <span>-KES {discount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>KES {total}</span>
            </div>
            <button
              onClick={() => alert("Order placed!")}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
