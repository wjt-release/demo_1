import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Plus } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Modal } from '../components/common/Modal'
import { validatePhone, validateRequired } from '../utils/validation'
import type { Address } from '../types'

export function Account() {
  const { user, isAuthenticated, logout, updateUserInfo, addAddress, updateAddress, deleteAddress } = useAuthStore()
  const { getOrdersByUser } = useOrderStore()

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>('profile')
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const [profileForm, setProfileForm] = useState({
    nickname: user?.nickname || '',
  })

  const [addressForm, setAddressForm] = useState({
    recipient: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
  })
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({})

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">请先登录</h2>
        <Link to="/login">
          <Button variant="primary">去登录</Button>
        </Link>
      </div>
    )
  }

  const orders = getOrdersByUser(user.id)
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const paidOrders = orders.filter((o) => o.status === 'paid').length
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length

  const handleSaveProfile = () => {
    updateUserInfo({ nickname: profileForm.nickname })
    alert('保存成功')
  }

  const validateAddressForm = () => {
    const errors: Record<string, string> = {}
    if (!validateRequired(addressForm.recipient)) {
      errors.recipient = '请输入收货人姓名'
    }
    if (!validatePhone(addressForm.phone)) {
      errors.phone = '请输入正确的手机号'
    }
    if (!validateRequired(addressForm.province)) {
      errors.province = '请输入省份'
    }
    if (!validateRequired(addressForm.city)) {
      errors.city = '请输入城市'
    }
    if (!validateRequired(addressForm.district)) {
      errors.district = '请输入区县'
    }
    if (!validateRequired(addressForm.detail)) {
      errors.detail = '请输入详细地址'
    }
    setAddressErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveAddress = () => {
    if (!validateAddressForm()) return

    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm)
    } else {
      addAddress(addressForm)
    }
    setShowAddressModal(false)
    setEditingAddress(null)
    setAddressForm({
      recipient: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false,
    })
  }

  const openAddAddressModal = () => {
    setEditingAddress(null)
    setAddressForm({
      recipient: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: user.addresses.length === 0,
    })
    setAddressErrors({})
    setShowAddressModal(true)
  }

  const openEditAddressModal = (address: Address) => {
    setEditingAddress(address)
    setAddressForm({
      recipient: address.recipient,
      phone: address.phone,
      province: address.province,
      city: address.city,
      district: address.district,
      detail: address.detail,
      isDefault: address.isDefault,
    })
    setAddressErrors({})
    setShowAddressModal(true)
  }

  const tabs = [
    { key: 'profile', label: '个人资料', icon: User },
    { key: 'addresses', label: '收货地址', icon: MapPin },
  ]

  return (
    <div className="min-h-screen pb-16">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-h3 font-medium">{user.nickname}</h2>
                <p className="text-small text-gray-500">{user.email}</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-body transition-colors ${
                      activeTab === tab.key
                        ? 'bg-gray-100 text-black font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <Link
                  to="/orders"
                  className="flex items-center justify-between px-4 py-3 text-body text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    我的订单
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-4 py-3 text-body text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5" />
                    收藏夹
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-body text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              </nav>
            </div>

            <div className="bg-white border border-gray-200 p-6 mt-4">
              <h3 className="text-body font-medium mb-4">订单状态</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <Link to="/orders" className="group">
                  <div className="text-xl font-medium text-black group-hover:text-gray-600">
                    {pendingOrders}
                  </div>
                  <div className="text-small text-gray-500">待付款</div>
                </Link>
                <Link to="/orders" className="group">
                  <div className="text-xl font-medium text-black group-hover:text-gray-600">
                    {paidOrders}
                  </div>
                  <div className="text-small text-gray-500">待发货</div>
                </Link>
                <Link to="/orders" className="group">
                  <div className="text-xl font-medium text-black group-hover:text-gray-600">
                    {shippedOrders}
                  </div>
                  <div className="text-small text-gray-500">待收货</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 p-6"
              >
                <h3 className="text-h3 font-medium mb-6">个人资料</h3>
                <div className="max-w-md space-y-4">
                  <Input
                    label="昵称"
                    value={profileForm.nickname}
                    onChange={(e) => setProfileForm({ ...profileForm, nickname: e.target.value })}
                  />
                  <Input
                    label="邮箱"
                    value={user.email}
                    disabled
                    helperText="邮箱不可修改"
                  />
                  <Button variant="primary" onClick={handleSaveProfile}>
                    保存修改
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-h3 font-medium">收货地址</h3>
                  <Button variant="outline" size="sm" onClick={openAddAddressModal}>
                    <Plus className="w-4 h-4 mr-1" />
                    新增地址
                  </Button>
                </div>

                {user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-body font-medium">{address.recipient}</span>
                              <span className="text-body text-gray-600">{address.phone}</span>
                              {address.isDefault && (
                                <span className="text-small px-2 py-0.5 bg-black text-white">
                                  默认
                                </span>
                              )}
                            </div>
                            <p className="text-body text-gray-600">
                              {address.province} {address.city} {address.district} {address.detail}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => openEditAddressModal(address)}
                              className="text-body text-gray-600 hover:text-black"
                            >
                              编辑
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('确定删除此地址吗？')) {
                                  deleteAddress(address.id)
                                }
                              }}
                              className="text-body text-gray-600 hover:text-error"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="mb-4">暂无收货地址</p>
                    <Button variant="outline" onClick={openAddAddressModal}>
                      添加收货地址
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title={editingAddress ? '编辑地址' : '新增地址'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="收货人"
              value={addressForm.recipient}
              onChange={(e) => setAddressForm({ ...addressForm, recipient: e.target.value })}
              error={addressErrors.recipient}
              required
            />
            <Input
              label="手机号"
              value={addressForm.phone}
              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
              error={addressErrors.phone}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="省份"
              value={addressForm.province}
              onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
              error={addressErrors.province}
              required
            />
            <Input
              label="城市"
              value={addressForm.city}
              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
              error={addressErrors.city}
              required
            />
            <Input
              label="区县"
              value={addressForm.district}
              onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
              error={addressErrors.district}
              required
            />
          </div>
          <Input
            label="详细地址"
            value={addressForm.detail}
            onChange={(e) => setAddressForm({ ...addressForm, detail: e.target.value })}
            error={addressErrors.detail}
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={addressForm.isDefault}
              onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
              className="w-4 h-4 border-gray-300"
            />
            <span className="ml-2 text-body text-gray-600">设为默认地址</span>
          </label>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" fullWidth onClick={() => setShowAddressModal(false)}>
              取消
            </Button>
            <Button variant="primary" fullWidth onClick={handleSaveAddress}>
              保存
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
