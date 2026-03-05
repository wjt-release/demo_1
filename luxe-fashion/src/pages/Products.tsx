import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { products, categories, sizes, sortOptions } from '../data/products'
import { ProductCard } from '../components/product/ProductCard'
import { Button } from '../components/common/Button'
import type { Category, Size } from '../types'

type FilterCategory = Category | 'new' | 'sale'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const selectedCategory = searchParams.get('category') as FilterCategory | null
  const selectedSizes = searchParams.get('sizes')?.split(',').filter(Boolean) as Size[]
  const sortBy = searchParams.get('sortBy') || 'newest'
  const priceMin = searchParams.get('priceMin')
  const priceMax = searchParams.get('priceMax')

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  const toggleSize = (size: Size) => {
    const currentSizes = selectedSizes || []
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size]
    updateFilter('sizes', newSizes.length > 0 ? newSizes.join(',') : null)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory && selectedCategory !== 'new' && selectedCategory !== 'sale') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (selectedCategory === 'new') {
      result = result.filter((p) => p.isNew)
    }

    if (selectedCategory === 'sale') {
      result = result.filter((p) => p.originalPrice)
    }

    if (selectedSizes && selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      )
    }

    if (priceMin) {
      result = result.filter((p) => p.price >= parseInt(priceMin))
    }

    if (priceMax) {
      result = result.filter((p) => p.price <= parseInt(priceMax))
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        result.sort((a, b) => b.sales - a.sales)
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [selectedCategory, selectedSizes, sortBy, priceMin, priceMax])

  const clearFilters = () => {
    setSearchParams({})
  }

  const hasFilters = selectedCategory || (selectedSizes && selectedSizes.length > 0) || priceMin || priceMax

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-h1 font-display mb-2">
            {selectedCategory === 'new' ? '新品上市' : 
             selectedCategory === 'sale' ? '特惠专区' :
             categories.find((c) => c.id === selectedCategory)?.name || '全部商品'}
          </h1>
          <p className="text-body text-gray-600">
            共 {filteredProducts.length} 件商品
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-body text-gray-600 hover:text-black transition-colors md:hidden"
          >
            <SlidersHorizontal className="w-5 h-5" />
            筛选
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-10 text-body focus:border-black focus:outline-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`fixed md:static inset-0 z-40 md:z-auto bg-white md:bg-transparent ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="h-full md:h-auto w-72 md:w-56 lg:w-64 md:block overflow-auto md:overflow-visible">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
                <h3 className="text-h3 font-medium">筛选</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:p-0">
                <div className="mb-6">
                  <h4 className="text-body font-medium mb-3">分类</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter('category', null)}
                      className={`block w-full text-left py-1.5 text-body transition-colors ${
                        !selectedCategory ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      全部商品
                    </button>
                    <button
                      onClick={() => updateFilter('category', 'new')}
                      className={`block w-full text-left py-1.5 text-body transition-colors ${
                        selectedCategory === 'new' ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      新品上市
                    </button>
                    <button
                      onClick={() => updateFilter('category', 'sale')}
                      className={`block w-full text-left py-1.5 text-body transition-colors ${
                        selectedCategory === 'sale' ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      特惠专区
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => updateFilter('category', category.id)}
                        className={`block w-full text-left py-1.5 text-body transition-colors ${
                          selectedCategory === category.id ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-body font-medium mb-3">尺码</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 text-body border transition-colors ${
                          selectedSizes?.includes(size)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-body font-medium mb-3">价格区间</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="最低"
                      value={priceMin || ''}
                      onChange={(e) => updateFilter('priceMin', e.target.value || null)}
                      className="w-full input-field text-center"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="最高"
                      value={priceMax || ''}
                      onChange={(e) => updateFilter('priceMax', e.target.value || null)}
                      className="w-full input-field text-center"
                    />
                  </div>
                </div>

                {hasFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    清除筛选
                  </Button>
                )}

                <div className="mt-6 md:hidden">
                  <Button fullWidth onClick={() => setShowFilters(false)}>
                    查看结果
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-body text-gray-600 mb-4">没有找到符合条件的商品</p>
                <Button variant="outline" onClick={clearFilters}>
                  清除筛选
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
