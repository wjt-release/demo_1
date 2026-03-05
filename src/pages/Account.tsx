import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, Input, Modal } from '@/components/common';
import { useAuthStore } from '@/store/authStore';
import { useAddressStore } from '@/store/addressStore';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const { addresses, deleteAddress, setDefault } = useAddressStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');

  if (!isAuthenticated || !user) {
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

  const handleUpdateProfile = () => {
    updateProfile({ name: editName, phone: editPhone });
    setShowEditModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <MapPin className="w-5 h-5" />, label: '收货地址', count: addresses.length, link: '/account#addresses' },
    { icon: <Mail className="w-5 h-5" />, label: '联系客服', link: '/contact' },
  ];

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mb-8">
            个人中心
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white font-medium">
                      {user.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-medium">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                    编辑资料
                  </Button>
                </div>
              </div>

              <div className="bg-white">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link || '#'}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span className="text-sm text-gray-500">{item.count}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>

              {addresses.length > 0 && (
                <div className="bg-white p-6" id="addresses">
                  <h2 className="font-medium mb-4">收货地址</h2>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-4 border border-gray-100 flex items-start justify-between"
                      >
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
                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefault(address.id)}
                              className="text-sm text-gray-500 hover:text-primary"
                            >
                              设为默认
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-sm text-gray-500 hover:text-status-error"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-white p-4 flex items-center justify-center gap-2 text-status-error hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h2 className="font-medium mb-4">快捷入口</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/orders"
                    className="p-4 bg-secondary-light text-center hover:bg-gray-200 transition-colors"
                  >
                    <p className="text-2xl font-medium text-primary">0</p>
                    <p className="text-sm text-gray-500 mt-1">待支付</p>
                  </Link>
                  <Link
                    to="/orders"
                    className="p-4 bg-secondary-light text-center hover:bg-gray-200 transition-colors"
                  >
                    <p className="text-2xl font-medium text-primary">0</p>
                    <p className="text-sm text-gray-500 mt-1">待发货</p>
                  </Link>
                  <Link
                    to="/orders"
                    className="p-4 bg-secondary-light text-center hover:bg-gray-200 transition-colors"
                  >
                    <p className="text-2xl font-medium text-primary">0</p>
                    <p className="text-sm text-gray-500 mt-1">待收货</p>
                  </Link>
                  <Link
                    to="/favorites"
                    className="p-4 bg-secondary-light text-center hover:bg-gray-200 transition-colors"
                  >
                    <p className="text-2xl font-medium text-primary">0</p>
                    <p className="text-sm text-gray-500 mt-1">收藏夹</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="编辑资料"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="姓名"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            icon={<User className="w-5 h-5" />}
          />
          <Input
            label="手机号"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            icon={<Phone className="w-5 h-5" />}
          />
          <div className="flex gap-4 pt-4">
            <Button variant="outline" fullWidth onClick={() => setShowEditModal(false)}>
              取消
            </Button>
            <Button variant="primary" fullWidth onClick={handleUpdateProfile}>
              保存
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </Layout>
  );
}
