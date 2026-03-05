import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, Input, Modal } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useAddressStore } from '@/store/addressStore';
import { useOrderStore, generateOrderId } from '@/store/orderStore';
import { Address } from '@/types';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const { addresses, addAddress, setDefault, getDefaultAddress } = useAddressStore();
  const { addOrder } = useOrderStore();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(getDefaultAddress() || null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
  });

  const shippingFee = getTotal() >= 299 ? 0 : 15;
  const total = getTotal() + shippingFee;

  if (!isAuthenticated) {
    return (
      <Layout>
        <Header />
        <main className="page-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">请先登录</h1>
            <Link to="/login">
              <Button variant="primary">去登录</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <Header />
        <main className="page-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">购物车是空的</h1>
            <Link to="/products">
              <Button variant="primary">去购物</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.province || !newAddress.city || !newAddress.district || !newAddress.detail) {
      alert('请填写完整的地址信息');
      return;
    }

    const address: Address = {
      id: `addr-${Date.now()}`,
      userId: user!.id,
      ...newAddress,
    };

    addAddress(address);
    setSelectedAddress(address);
    setShowAddressModal(false);
    setNewAddress({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false,
    });
  };

  const handleSubmit = () => {
    if (!selectedAddress) {
      alert('请选择收货地址');
      return;
    }

    const order = {
      id: generateOrderId(),
      userId: user!.id,
      address: selectedAddress,
      items: items.map(item => ({
        productId: item.productId,
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      status: 'pending' as const,
      createdAt: new Date(),
    };

    addOrder(order);
    clearCart();
    navigate(`/payment?id=${order.id}`);
  };

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>

          <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mb-8">
            确认订单
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium text-lg">收货地址</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    新增地址
                  </Button>
                </div>

                {addresses.length === 0 ? (
                  <p className="text-gray-500 py-4">暂无收货地址，请添加新地址</p>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-4 border cursor-pointer transition-colors ${
                          selectedAddress?.id === address.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{address.name}</span>
                              <span className="text-gray-500">{address.phone}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary text-white px-2 py-0.5">
                                  默认
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {address.province} {address.city} {address.district} {address.detail}
                            </p>
                          </div>
                          {selectedAddress?.id === address.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-6">
                <h2 className="font-medium text-lg mb-4">商品清单</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">尺码: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                          <span className="font-medium">
                            ¥{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h2 className="font-medium text-lg mb-6">订单摘要</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">商品小计</span>
                    <span>¥{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">运费</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-status-success">免运费</span>
                      ) : (
                        `¥${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="font-medium">合计</span>
                    <span className="text-xl font-medium text-primary">
                      ¥{total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button variant="primary" fullWidth className="mt-6" onClick={handleSubmit}>
                  提交订单
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="新增地址"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="收货人"
              placeholder="请输入收货人姓名"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <Input
              label="手机号"
              placeholder="请输入手机号"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="省份"
              placeholder="如：上海市"
              value={newAddress.province}
              onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
            />
            <Input
              label="城市"
              placeholder="如：上海市"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <Input
              label="区县"
              placeholder="如：静安区"
              value={newAddress.district}
              onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
            />
          </div>
          <Input
            label="详细地址"
            placeholder="请输入详细地址"
            value={newAddress.detail}
            onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">设为默认地址</span>
          </label>
          <div className="flex gap-4 pt-4">
            <Button variant="outline" fullWidth onClick={() => setShowAddressModal(false)}>
              取消
            </Button>
            <Button variant="primary" fullWidth onClick={handleAddAddress}>
              保存
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </Layout>
  );
}
