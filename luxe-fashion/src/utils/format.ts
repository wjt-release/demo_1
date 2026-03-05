export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: '待付款',
    paid: '待发货',
    shipped: '待收货',
    delivered: '已完成',
    cancelled: '已取消',
  }
  return statusMap[status] || status
}

export const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    unpaid: '未支付',
    paid: '已支付',
    refunded: '已退款',
  }
  return statusMap[status] || status
}

export const formatCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    tops: '上装',
    bottoms: '下装',
    dresses: '连衣裙',
    outerwear: '外套',
    accessories: '配饰',
  }
  return categoryMap[category] || category
}
