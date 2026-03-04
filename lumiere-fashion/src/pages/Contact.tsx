import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Clock } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button, Input } from '../components/common';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-12 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl lg:text-4xl text-primary-black mb-4">
                联系我们
              </h1>
              <p className="text-primary-gray">
                如有任何问题或建议，欢迎随时与我们联系
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-xl text-primary-black mb-6">发送消息</h2>

                {isSubmitted ? (
                  <div className="text-center py-12 bg-background-light">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-primary-black mb-2">消息已发送</h3>
                    <p className="text-sm text-primary-gray mb-4">
                      感谢您的来信，我们会尽快回复您
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      发送新消息
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="姓名"
                      placeholder="请输入您的姓名"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="邮箱"
                      type="email"
                      placeholder="请输入您的邮箱"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <Input
                      label="主题"
                      placeholder="请输入消息主题"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm text-primary-black mb-2">留言内容</label>
                      <textarea
                        placeholder="请输入您的留言..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        required
                        className="w-full border border-gray-300 px-4 py-3 text-sm resize-none focus:border-primary-black focus:outline-none focus:ring-1 focus:ring-primary-black"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? '发送中...' : '发送消息'}
                    </Button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display text-xl text-primary-black mb-6">联系方式</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-background-light flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-primary-gray" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary-black mb-1">邮箱</h3>
                      <p className="text-sm text-primary-gray">service@lumiere.com</p>
                      <p className="text-xs text-primary-gray mt-1">我们会在24小时内回复</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-background-light flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-primary-gray" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary-black mb-1">客服热线</h3>
                      <p className="text-sm text-primary-gray">400-888-8888</p>
                      <p className="text-xs text-primary-gray mt-1">工作日 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-background-light flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-primary-gray" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary-black mb-1">公司地址</h3>
                      <p className="text-sm text-primary-gray">上海市静安区南京西路1688号</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-background-light flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-primary-gray" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary-black mb-1">营业时间</h3>
                      <p className="text-sm text-primary-gray">周一至周日 10:00-22:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-background-light">
                  <h3 className="text-sm font-medium text-primary-black mb-2">常见问题</h3>
                  <p className="text-sm text-primary-gray">
                    您也可以查看我们的帮助中心，获取常见问题的解答。
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    查看帮助中心
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
