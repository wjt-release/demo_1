import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Plus, Check } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/common';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';
import type { Address } from '@/types';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated, addAddress } = useAuthStore();
  const { createOrder } = useOrderStore();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    user?.addresses.find((a) => a.isDefault)?.id || null
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiver: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/checkout' } });
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const shipping = totalPrice >= 299 ? 0 : 15;
  const finalTotal = totalPrice + shipping;

  const validateAddressForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newAddress.receiver.trim()) newErrors.receiver = '请输入收货人姓名';
    if (!newAddress.phone.trim()) newErrors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(newAddress.phone)) newErrors.phone = '请输入有效的手机号码';
    if (!newAddress.province.trim()) newErrors.province = '请输入省份';
    if (!newAddress.city.trim()) newErrors.city = '请输入城市';
    if (!newAddress.district.trim()) newErrors.district = '请输入区/县';
    if (!newAddress.detail.trim()) newErrors.detail = '请输入详细地址';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = () => {
    if (!validateAddressForm()) return;

    addAddress(newAddress);
    setShowAddressForm(false);
    setNewAddress({
      receiver: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false,
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('请选择收货地址');
      return;
    }

    const address = user?.addresses.find((a) => a.id === selectedAddress);
    if (!address) return;

    const orderItems = items.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      productImage: item.product.images[0],
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const order = createOrder(user!.id, orderItems, address, finalTotal);
    clearCart();
    navigate(`/payment?orderId=${order.id}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <span className="text-neutral-900">购物车</span>
          <ChevronRight size={14} />
          <span className="text-neutral-900 font-medium">确认订单</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8">
          确认订单
        </h1>

        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-neutral-900">收货地址</h2>
              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  <Plus size={16} />
                  新增地址
                </button>
              )}
            </div>

            {showAddressForm ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-neutral-200 p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="收货人"
                    value={newAddress.receiver}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, receiver: e.target.value })
                    }
                    error={errors.receiver}
                  />
                  <Input
                    label="手机号码"
                    value={newAddress.phone}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                    error={errors.phone}
                  />
                  <Input
                    label="省份"
                    value={newAddress.province}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, province: e.target.value })
                    }
                    error={errors.province}
                  />
                  <Input
                    label="城市"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    error={errors.city}
                  />
                  <Input
                    label="区/县"
                    value={newAddress.district}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, district: e.target.value })
                    }
                    error={errors.district}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="详细地址"
                      value={newAddress.detail}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, detail: e.target.value })
                      }
                      error={errors.detail}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Button onClick={handleAddAddress}>保存地址</Button>
                  <Button variant="ghost" onClick={() => setShowAddressForm(false)}>
                    取消
                  </Button>
                </div>
              </motion.div>
            ) : user?.addresses && user.addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {selectedAddress === address.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <p className="font-medium text-neutral-900">{address.receiver}</p>
                    <p className="text-sm text-neutral-600 mt-1">{address.phone}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      {address.province} {address.city} {address.district} {address.detail}
                    </p>
                    {address.isDefault && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-neutral-900 text-white text-xs rounded">
                        默认
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-neutral-50 rounded-lg">
                <p className="text-neutral-500">暂无收货地址</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-2 text-sm text-neutral-900 underline"
                >
                  添加收货地址
                </button>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-base font-medium text-neutral-900 mb-4">商品清单</h2>
            <div className="bg-white rounded-lg border border-neutral-100 divide-y divide-neutral-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-xs text-neutral-500">数量: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium text-neutral-900 mb-4">订单信息</h2>
            <div className="bg-white rounded-lg border border-neutral-100 p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">商品小计</span>
                <span className="text-neutral-900">¥{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">运费</span>
                <span className={shipping === 0 ? 'text-green-600' : 'text-neutral-900'}>
                  {shipping === 0 ? '免运费' : `¥${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-100">
                <span className="font-medium text-neutral-900">应付金额</span>
                <span className="text-xl font-semibold text-neutral-900">
                  ¥{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => navigate('/cart')}>
              返回购物车
            </Button>
            <Button onClick={handlePlaceOrder}>
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
