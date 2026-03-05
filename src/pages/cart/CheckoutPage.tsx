import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useUserStore } from '../../store/useUserStore';
import { Button } from '../../components/ui/Button';
import { Order, Address } from '../../types';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  province: z.string().min(2, 'Province is required'),
  city: z.string().min(2, 'City is required'),
  district: z.string().min(2, 'District is required'),
  detail: z.string().min(5, 'Detailed address is required'),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user, addOrder } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const total = getCartTotal();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const onSubmit = async (data: AddressFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user?.id || 'guest',
      items: [...items],
      total: total,
      status: 'paid',
      shippingAddress: data,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">CHECKOUT</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-bold mb-6">SHIPPING ADDRESS</h2>
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input {...register('fullName')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input {...register('phone')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Province</label>
                <input {...register('province')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.province && <p className="text-red-500 text-xs">{errors.province.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input {...register('city')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input {...register('district')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Detailed Address</label>
              <textarea {...register('detail')} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              {errors.detail && <p className="text-red-500 text-xs">{errors.detail.message}</p>}
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 h-fit">
          <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>¥{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>¥{total}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-4">PAYMENT METHOD (MOCK)</h3>
            <div className="flex gap-4">
              <div className="border p-4 rounded cursor-pointer hover:border-black flex-1 text-center bg-white">
                WeChat Pay
              </div>
              <div className="border p-4 rounded cursor-pointer hover:border-black flex-1 text-center bg-white">
                Alipay
              </div>
            </div>
          </div>

          <Button 
            fullWidth 
            size="lg" 
            form="checkout-form" 
            type="submit" 
            disabled={isProcessing}
          >
            {isProcessing ? 'PROCESSING...' : `PAY ¥${total}`}
          </Button>
        </div>
      </div>
    </div>
  );
};
