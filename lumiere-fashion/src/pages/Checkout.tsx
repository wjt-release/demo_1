import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button, Input } from '../components/common';
import { useCartStore, useUserStore, useOrderStore } from '../stores';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useUserStore();
  const { createOrder, updateOrderStatus } = useOrderStore();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user || items.length === 0) {
    navigate('/');
    return null;
  }

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};

    if (!address.name.trim()) newErrors.name = '请输入收货人姓名';
    if (!address.phone.trim()) {
      newErrors.phone = '请输入手机号码';
    } else if (!/^1[3-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }
    if (!address.province.trim()) newErrors.province = '请输入省份';
    if (!address.city.trim()) newErrors.city = '请输入城市';
    if (!address.district.trim()) newErrors.district = '请输入区/县';
    if (!address.detail.trim()) newErrors.detail = '请输入详细地址';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    const order = createOrder(user.id, items, getTotal(), address);
    setOrderId(order.id);

    setTimeout(() => {
      updateOrderStatus(order.id, 'paid');
      clearCart();
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-8 lg:py-12">
          <button
            onClick={() => (step === 'payment' ? setStep('address') : navigate('/cart'))}
            className="flex items-center gap-2 text-sm text-primary-gray hover:text-primary-black mb-8"
          >
            <ArrowLeft size={16} />
            {step === 'payment' ? '返回修改地址' : '返回购物车'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 'address' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-xl text-primary-black mb-6">填写收货地址</h2>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="收货人姓名"
                        placeholder="请输入姓名"
                        value={address.name}
                        onChange={e => setAddress({ ...address, name: e.target.value })}
                        error={errors.name}
                      />
                      <Input
                        label="手机号码"
                        placeholder="请输入手机号"
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        error={errors.phone}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="省份"
                        placeholder="如: 上海市"
                        value={address.province}
                        onChange={e => setAddress({ ...address, province: e.target.value })}
                        error={errors.province}
                      />
                      <Input
                        label="城市"
                        placeholder="如: 上海市"
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        error={errors.city}
                      />
                      <Input
                        label="区/县"
                        placeholder="如: 静安区"
                        value={address.district}
                        onChange={e => setAddress({ ...address, district: e.target.value })}
                        error={errors.district}
                      />
                    </div>
                    <Input
                      label="详细地址"
                      placeholder="街道、楼栋、门牌号等"
                      value={address.detail}
                      onChange={e => setAddress({ ...address, detail: e.target.value })}
                      error={errors.detail}
                    />
                    <div className="pt-4">
                      <Button type="submit">确认地址</Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-xl text-primary-black mb-6">确认订单并支付</h2>

                  <div className="bg-background-light p-6 mb-6">
                    <h3 className="text-sm font-medium mb-3">收货信息</h3>
                    <p className="text-sm text-primary-gray">
                      {address.name} {address.phone}
                    </p>
                    <p className="text-sm text-primary-gray">
                      {address.province} {address.city} {address.district} {address.detail}
                    </p>
                  </div>

                  <div className="border border-gray-200 mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-sm font-medium">商品清单</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {items.map(item => (
                        <div key={`${item.product.id}-${item.size}`} className="p-4 flex gap-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-20 object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-primary-gray mt-1">
                              {item.color} / {item.size}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-primary-gray">x{item.quantity}</span>
                              <span className="text-sm">¥{(item.product.price * item.quantity).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 p-6">
                    <h3 className="text-sm font-medium mb-4">支付方式</h3>
                    <div className="flex items-center gap-3 p-4 border-2 border-primary-black bg-background-light">
                      <CreditCard size={20} />
                      <span className="text-sm">在线支付（模拟）</span>
                      <Check size={16} className="ml-auto text-primary-black" />
                    </div>
                    <p className="text-xs text-primary-gray mt-3">
                      点击支付按钮将模拟完成支付流程
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button fullWidth onClick={handlePayment} disabled={isProcessing}>
                      {isProcessing ? '支付处理中...' : `支付 ¥${getTotal().toLocaleString()}`}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl text-primary-black mb-2">支付成功</h2>
                  <p className="text-primary-gray mb-2">感谢您的购买！</p>
                  <p className="text-sm text-primary-gray mb-8">
                    订单号: {orderId}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="secondary" onClick={() => navigate('/orders')}>
                      查看订单
                    </Button>
                    <Button onClick={() => navigate('/products')}>
                      继续购物
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {step !== 'success' && (
              <div className="lg:col-span-1">
                <div className="bg-background-light p-6 sticky top-24">
                  <h3 className="font-medium text-primary-black mb-4">订单摘要</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-gray">商品数量</span>
                      <span>{items.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-gray">商品金额</span>
                      <span>¥{getTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-gray">运费</span>
                      <span>免运费</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">合计</span>
                      <span className="text-xl font-medium">¥{getTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
