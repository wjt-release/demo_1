import React from 'react';
import { useCartStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-6">Looks like you haven't added any items yet.</p>
        <Link to="/shop">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-12">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items */}
        <section className="lg:col-span-7">
          <ul className="border-t border-b border-zinc-200 divide-y divide-zinc-200">
            {items.map((item) => (
              <li key={item.cartId} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-gray-800 uppercase tracking-wide">
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500 border-r border-zinc-200 pr-2 mr-2">{item.color}</p>
                        <p className="text-gray-500">{item.size}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">{item.currency} {item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="text-gray-500 hover:text-black p-1"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-gray-900 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="text-gray-500 hover:text-black p-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="absolute top-0 right-0">
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary */}
        <section className="mt-16 bg-zinc-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
          <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide mb-4">Order Summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">CNY {getTotal()}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">CNY 20.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
              <dt className="text-base font-medium text-gray-900 uppercase tracking-wide">Order total</dt>
              <dd className="text-base font-medium text-gray-900">CNY {getTotal() + 20}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <Link to="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
