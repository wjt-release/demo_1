import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/common';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '请输入您的姓名';
    if (!formData.email.trim()) newErrors.email = '请输入邮箱地址';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = '请输入有效的邮箱地址';
    if (!formData.subject.trim()) newErrors.subject = '请输入主题';
    if (!formData.message.trim()) newErrors.message = '请输入留言内容';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500"
          >
            <Check size={40} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-serif font-semibold text-neutral-900 mb-2">
            发送成功
          </h1>
          <p className="text-neutral-500 mb-6">
            感谢您的留言，我们会尽快回复您
          </p>
          <Button onClick={() => setIsSubmitted(false)}>继续留言</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-4">
            联系我们
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            如有任何问题或建议，欢迎随时与我们联系。我们的客服团队将在24小时内回复您。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-neutral-100 p-6 md:p-8"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-6">发送邮件</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="姓名"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    error={errors.name}
                  />
                  <Input
                    label="邮箱"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    error={errors.email}
                  />
                </div>
                <Input
                  label="主题"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  error={errors.subject}
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    留言内容
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className={`w-full px-4 py-3 text-sm text-neutral-900 bg-white border rounded-md transition-all duration-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    placeholder="请输入您的留言..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                <Button type="submit">
                  <Send size={16} className="mr-2" />
                  发送邮件
                </Button>
              </form>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-base font-medium text-neutral-900 mb-4">
                  联系方式
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">邮箱</p>
                      <p className="text-sm text-neutral-600">service@elegance.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">客服热线</p>
                      <p className="text-sm text-neutral-600">400-888-8888</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        工作时间: 9:00 - 18:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">公司地址</p>
                      <p className="text-sm text-neutral-600">
                        上海市静安区南京西路1688号
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-base font-medium text-neutral-900 mb-4">
                  常见问题
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      如何查询订单状态？
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      退换货政策说明
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      配送范围和时间
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      会员积分规则
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
