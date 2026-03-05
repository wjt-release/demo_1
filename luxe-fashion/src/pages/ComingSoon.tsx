import { motion } from 'framer-motion'
import { Clock, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'

interface ComingSoonProps {
  title?: string
}

export function ComingSoon({ title = '此页面' }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md px-4"
      >
        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-h1 font-display mb-3">敬请期待</h1>
        <p className="text-body text-gray-600 mb-8">
          {title}正在开发中，即将上线，请耐心等待。
        </p>
        <Link to="/">
          <Button variant="primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
