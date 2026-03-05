import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { validateEmail, validateRequired } from '../utils/validation'

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!validateRequired(form.name)) {
      newErrors.name = '请输入您的姓名'
    }
    if (!validateEmail(form.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!validateRequired(form.subject)) {
      newErrors.subject = '请输入主题'
    }
    if (!validateRequired(form.message)) {
      newErrors.message = '请输入留言内容'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-success rounded-full mx-auto flex items-center justify-center mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-h2 mb-2">发送成功</h2>
          <p className="text-body text-gray-600 mb-6">
            感谢您的留言，我们会尽快回复您。
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)}>
            继续留言
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-gray-50 py-12">
        <div className="container-custom text-center">
          <h1 className="text-h1 font-display mb-2">联系我们</h1>
          <p className="text-body text-gray-600">
            有任何问题或建议？我们很乐意听取您的意见
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 p-6"
            >
              <h3 className="text-h3 font-medium mb-6">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-body font-medium">邮箱</p>
                    <a
                      href="mailto:service@luxe.com"
                      className="text-body text-gray-600 hover:text-black transition-colors"
                    >
                      service@luxe.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-body font-medium">客服热线</p>
                    <p className="text-body text-gray-600">400-888-8888</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-body font-medium">服务时间</p>
                    <p className="text-body text-gray-600">周一至周日 9:00-21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-body font-medium">公司地址</p>
                    <p className="text-body text-gray-600">
                      上海市静安区南京西路1788号
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-beige-100 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5" />
                <h4 className="text-body font-medium">常见问题</h4>
              </div>
              <p className="text-body text-gray-600 mb-4">
                在联系我们之前，您可以先查看常见问题解答，可能能更快找到您需要的答案。
              </p>
              <Button variant="outline" size="sm">
                查看FAQ
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <h3 className="text-h3 font-medium mb-6">发送邮件</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="姓名"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="邮箱"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                </div>
                <Input
                  label="主题"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  error={errors.subject}
                  required
                />
                <div>
                  <label className="label-text">
                    留言内容 <span className="text-error">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="请输入您的留言..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-small text-error">{errors.message}</p>
                  )}
                </div>
                <Button type="submit" variant="primary" loading={submitting}>
                  <Send className="w-4 h-4 mr-2" />
                  发送邮件
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
