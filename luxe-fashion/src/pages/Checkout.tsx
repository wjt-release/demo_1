import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Plus, Check, MapPin, CreditCard, Package } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Modal } from '../components/common/Modal'
import { formatPrice } from '../utils/format'
import { validatePhone, validateRequired } from '../utils/validation'
import type { Address } from '../types'

export function Checkout() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const { user, addAddress, updateAddress, deleteAddress } = useAuthStore()
  const { createOrder, updatePaymentStatus } = useOrderStore()

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    user?.addresses.find((a) => a.isDefault)?.id || null
  )
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)

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

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-h2 mb-2">购物车是空的</h2>
        <p className="text-body text-gray-600 mb-6">请先添加商品到购物车</p>
        <Link to="/products">
          <Button variant="primary">去购物</Button>
        </Link>
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const selectedAddress = user.addresses.find((a) => a.id === selectedAddressId)

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

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert('请选择收货地址')
      return
    }

    setPaymentProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = createOrder(user.id, items, selectedAddress)
    updatePaymentStatus(order.id, 'paid')
    clearCart()
    setPaymentProcessing(false)
    navigate(`/orders/${order.id}`)
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="container-custom py-8">
        <nav className="flex items-center text-small text-gray-500 mb-6">
          <Link to="/cart" className="hover:text-black">购物车</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-black">确认订单</span>
        </nav>

        <h1 className="text-h1 font-display mb-8">确认订单</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h3 font-medium flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  收货地址
                </h2>
                <Button variant="ghost" size="sm" onClick={openAddAddressModal}>
                  <Plus className="w-4 h-4 mr-1" />
                  新增地址
                </Button>
              </div>

              {user.addresses.length > 0 ? (
                <div className="space-y-3">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`relative p-4 border cursor-pointer transition-colors ${
                        selectedAddressId === address.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {selectedAddressId === address.id && (
                        <Check className="absolute top-4 right-4 w-5 h-5 text-black" />
                      )}
                      <div className="pr-8">
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
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditAddressModal(address)
                          }}
                          className="text-small text-gray-600 hover:text-black"
                        >
                          编辑
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('确定删除此地址吗？')) {
                              deleteAddress(address.id)
                              if (selectedAddressId === address.id) {
                                setSelectedAddressId(user.addresses[0]?.id || null)
                              }
                            }
                          }}
                          className="text-small text-gray-600 hover:text-error"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">暂无收货地址</p>
                  <Button variant="outline" onClick={openAddAddressModal}>
                    添加收货地址
                  </Button>
                </div>
              )}
            </section>

            <section className="bg-white p-6">
              <h2 className="text-h3 font-medium flex items-center gap-2 mb-4">
                <Package className="w-5 h-5" />
                商品清单
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-24 object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="text-body font-medium line-clamp-2">{item.productName}</p>
                      <p className="text-small text-gray-500 mt-1">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-body">{formatPrice(item.price)}</span>
                        <span className="text-body text-gray-600">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6">
              <h2 className="text-h3 font-medium flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                支付方式
              </h2>
              <div className="border border-black p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-body font-medium">
                  支
                </div>
                <div>
                  <p className="text-body font-medium">在线支付</p>
                  <p className="text-small text-gray-500">支持支付宝、微信支付等</p>
                </div>
                <Check className="w-5 h-5 ml-auto" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6">
              <h3 className="text-h3 font-medium mb-4">订单摘要</h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between">
                  <span className="text-gray-600">商品小计</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">运费</span>
                  <span className="text-success">免运费</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">优惠</span>
                  <span>- {formatPrice(0)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-body font-medium">应付金额</span>
                  <span className="text-xl font-medium">{formatPrice(getTotal())}</span>
                </div>
              </div>
              <Button
                variant="primary"
                fullWidth
                className="mt-6"
                onClick={handlePayment}
                loading={paymentProcessing}
                disabled={!selectedAddress}
              >
                立即支付
              </Button>
              <p className="text-small text-gray-500 text-center mt-4">
                点击支付即表示您同意我们的服务条款
              </p>
            </div>
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
