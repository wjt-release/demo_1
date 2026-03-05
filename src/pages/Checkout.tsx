import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { useCartStore, useOrderStore, useAuthStore } from '@/stores';
import { formatPrice } from '@/utils/format';
import { validatePhone, validateRequired } from '@/utils/validation';
import type { Address } from '@/types';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { user } = useAuthStore();

  const [address, setAddress] = useState<Address>({
    receiver: user?.name || '',
    phone: user?.phone || '',
    province: '',
    city: '',
    district: '',
    detail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};

    const receiverError = validateRequired(address.receiver, '收货人');
    if (receiverError) newErrors.receiver = receiverError;

    const phoneError = validatePhone(address.phone);
    if (phoneError) newErrors.phone = phoneError;

    const provinceError = validateRequired(address.province, '省份');
    if (provinceError) newErrors.province = provinceError;

    const cityError = validateRequired(address.city, '城市');
    if (cityError) newErrors.city = cityError;

    const districtError = validateRequired(address.district, '区县');
    if (districtError) newErrors.district = districtError;

    const detailError = validateRequired(address.detail, '详细地址');
    if (detailError) newErrors.detail = detailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateAddress()) return;

    const orderItems = items.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      price: item.product.price,
      size: item.size,
      quantity: item.quantity,
      image: item.product.images[0],
    }));

    const order = createOrder(orderItems, address);
    clearCart();
    navigate(`/payment?orderId=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">购物车为空</p>
          <Button onClick={() => navigate('/products')}>去购物</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-32 md:pb-6">
        <h1 className="text-2xl font-serif font-bold mb-6">确认订单</h1>

        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin size={18} />
            <h2 className="font-medium">收货地址</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="收货人"
              value={address.receiver}
              onChange={e => setAddress({ ...address, receiver: e.target.value })}
              placeholder="请输入收货人姓名"
              error={errors.receiver}
            />
            <Input
              label="手机号"
              value={address.phone}
              onChange={e => setAddress({ ...address, phone: e.target.value })}
              placeholder="请输入手机号"
              error={errors.phone}
            />
            <Input
              label="省份"
              value={address.province}
              onChange={e => setAddress({ ...address, province: e.target.value })}
              placeholder="请输入省份"
              error={errors.province}
            />
            <Input
              label="城市"
              value={address.city}
              onChange={e => setAddress({ ...address, city: e.target.value })}
              placeholder="请输入城市"
              error={errors.city}
            />
            <Input
              label="区县"
              value={address.district}
              onChange={e => setAddress({ ...address, district: e.target.value })}
              placeholder="请输入区县"
              error={errors.district}
            />
            <div className="col-span-2">
              <Input
                label="详细地址"
                value={address.detail}
                onChange={e => setAddress({ ...address, detail: e.target.value })}
                placeholder="请输入详细地址"
                error={errors.detail}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
          <h2 className="font-medium mb-4">商品清单</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">尺码: {item.size} | 数量: {item.quantity}</p>
                  <p className="text-sm font-medium mt-1">{formatPrice(item.product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">商品金额</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">运费</span>
              <span>免运费</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-medium">应付金额</span>
              <span className="text-xl font-bold">{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:mt-6">
          <div className="max-w-3xl mx-auto">
            <Button onClick={handleSubmit} className="w-full" size="lg">
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
